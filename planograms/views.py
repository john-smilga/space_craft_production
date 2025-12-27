"""Views for planograms app."""

import logging
from typing import Any

from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response

from common.exceptions import NotFoundError
from common.mixins import CompanyFilterMixin, SlugLookupMixin
from common.viewsets import BaseViewSet
from planograms.models import Planogram
from planograms.serializers import (
    AIOverviewResponseSerializer,
    PlanogramCreateSerializer,
    PlanogramDetailSerializer,
    PlanogramLayoutSerializer,
    PlanogramListSerializer,
    PlanogramSerializer,
    PlanogramUpdateSerializer,
)
from planograms.services.ai_service import generate_ai_overview
from planograms.services.planogram_service import (
    auto_select_display,
    get_default_depth,
    get_or_compute_layout,
)

logger = logging.getLogger(__name__)


class PlanogramViewSet(CompanyFilterMixin, SlugLookupMixin, BaseViewSet):
    """ViewSet for Planogram CRUD operations."""

    queryset = Planogram.objects.select_related(
        "project", "display", "company", "created_by", "updated_by"
    ).all()
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self) -> type:
        """Return appropriate serializer based on action."""
        if self.action == "list":
            return PlanogramListSerializer
        elif self.action == "create":
            return PlanogramCreateSerializer
        elif self.action in ["update", "partial_update"]:
            return PlanogramUpdateSerializer
        elif self.action == "save_layout":
            return PlanogramLayoutSerializer
        return PlanogramSerializer

    def get_queryset(self):
        """Get planograms filtered by company with optimizations."""
        queryset = super().get_queryset()
        return queryset.order_by("-created_at")

    @extend_schema(
        responses={200: PlanogramDetailSerializer},
        description="Retrieve planogram with layout.",
    )
    def retrieve(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        """Retrieve planogram with layout."""
        instance = self.get_object()

        serializer = self.get_serializer(instance)
        planogram_data = serializer.data

        layout = get_or_compute_layout(instance)

        return Response({**planogram_data, "layout": layout})

    @extend_schema(
        request=PlanogramCreateSerializer,
        responses={201: PlanogramSerializer},
        description="Create a new planogram with optional display selection and auto-generated layout.",
    )
    def create(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        """Create a new planogram."""
        serializer = self.get_serializer(
            data=request.data, context={"company": request.user.company}
        )
        serializer.is_valid(raise_exception=True)

        display = serializer.validated_data.get("display")

        if not display:
            display = auto_select_display(request.user.company)
            if not display:
                raise NotFoundError(
                    "No display found. Please ensure at least one standard display exists."
                )

        width_in = serializer.validated_data.get("width_in", display.width_in)
        height_in = serializer.validated_data.get("height_in", display.height_in)
        depth_in = serializer.validated_data.get("depth_in", display.depth_in)
        shelf_count = serializer.validated_data.get("shelf_count", display.shelf_count)
        shelf_spacing = serializer.validated_data.get(
            "shelf_spacing", display.shelf_spacing
        )

        if depth_in is None:
            depth_in = get_default_depth()

        planogram = serializer.save(
            company=request.user.company,
            created_by=request.user,
            display=display,
            width_in=width_in,
            height_in=height_in,
            depth_in=depth_in,
            shelf_count=shelf_count,
            shelf_spacing=shelf_spacing,
        )

        output_serializer = PlanogramSerializer(planogram)
        planogram_data = output_serializer.data
        layout = get_or_compute_layout(planogram)

        return Response({**planogram_data, "layout": layout}, status=status.HTTP_201_CREATED)

    @extend_schema(
        request=PlanogramUpdateSerializer,
        responses={200: PlanogramSerializer},
        description="Update planogram.",
    )
    def update(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        """Update planogram."""
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=kwargs.get("partial", False),
            context={"company": request.user.company}
        )
        serializer.is_valid(raise_exception=True)

        # Check if display changed and update dimensions from new display
        new_display = serializer.validated_data.get("display")
        if new_display and new_display != instance.display:
            # Update dimensions from new display
            serializer.validated_data["width_in"] = new_display.width_in
            serializer.validated_data["height_in"] = new_display.height_in
            serializer.validated_data["depth_in"] = new_display.depth_in
            serializer.validated_data["shelf_count"] = new_display.shelf_count
            serializer.validated_data["shelf_spacing"] = new_display.shelf_spacing

        planogram = serializer.save(updated_by=request.user)

        output_serializer = PlanogramSerializer(planogram)
        planogram_data = output_serializer.data
        layout = get_or_compute_layout(planogram)

        return Response({**planogram_data, "layout": layout})

    @extend_schema(
        request=PlanogramLayoutSerializer,
        responses={200: PlanogramSerializer},
        description="Save planogram layout and return updated planogram data.",
    )
    @action(detail=True, methods=["post"], url_path="layout")
    def save_layout(self, request: Request, slug: str = None) -> Response:
        """Save planogram layout."""
        instance = self.get_object()

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        instance.layout = serializer.validated_data["layout"]
        instance.preserve_layout = serializer.validated_data.get(
            "preserve_layout", True
        )
        instance.updated_by = request.user
        instance.save()

        output_serializer = PlanogramSerializer(instance)
        return Response(output_serializer.data)

    @extend_schema(
        responses={200: AIOverviewResponseSerializer},
        description="Generate AI-powered overview of the planogram layout.",
    )
    @action(detail=True, methods=["post"], url_path="ai-overview")
    def ai_overview(self, request: Request, slug: str = None) -> Response:
        """Generate AI overview for planogram."""
        instance = self.get_object()

        try:
            serializer = PlanogramSerializer(instance)
            planogram_data = serializer.data
            planogram_data["season_display"] = instance.get_season_display()

            layout = get_or_compute_layout(instance)

            if not layout:
                return Response(
                    {"error": "Failed to compute layout"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                )

            overview = generate_ai_overview(planogram_data, layout)

            return Response({"overview": overview})

        except ValueError as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
        except Exception as e:
            logger.error(f"Error generating AI overview: {str(e)}")
            return Response(
                {"error": "There was an error. Please try later."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
