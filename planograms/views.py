"""Views for planograms app."""

import logging
from decimal import Decimal
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
    AddProductsRequestSerializer,
    AIOverviewResponseSerializer,
    LayoutSerializer,
    PlanogramCreateSerializer,
    PlanogramLayoutSerializer,
    PlanogramListSerializer,
    PlanogramSerializer,
    PlanogramUpdateSerializer,
)
from planograms.services.ai_service import generate_ai_overview
from planograms.services.planogram_service import (
    auto_select_display,
    compute_layout,
    get_default_depth,
    get_saved_layout,
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
        responses={200: PlanogramSerializer},
        description="Retrieve planogram details (no layout).",
    )
    def retrieve(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        """Retrieve planogram details."""
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    @extend_schema(
        request=PlanogramCreateSerializer,
        responses={201: PlanogramSerializer},
        description="Create a new planogram with optional display selection.",
    )
    def create(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        """Create a new planogram."""
        serializer = self.get_serializer(
            data=request.data, context={"company": request.user.company}
        )
        serializer.is_valid(raise_exception=True)

        display = serializer.validated_data.get("display")

        if not display:
            try:
                display = auto_select_display(request.user.company)
            except ValueError as e:
                return Response(
                    {"error": str(e)},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                )

        # Get values from request or fall back to display defaults
        width_in = serializer.validated_data.get("width_in", display.width_in)
        height_in = serializer.validated_data.get("height_in", display.height_in)
        depth_in = serializer.validated_data.get("depth_in", display.depth_in)
        shelf_count = serializer.validated_data.get("shelf_count", display.shelf_count)
        shelf_spacing = serializer.validated_data.get(
            "shelf_spacing", display.shelf_spacing
        )

        # Default season to summer if not provided
        season = serializer.validated_data.get("season", "summer")

        # Default category_ids to first category (Beef) if not provided
        category_ids = serializer.validated_data.get("category_ids")
        if not category_ids or len(category_ids) == 0:
            category_ids = [1]  # Default to Beef category

        if depth_in is None:
            depth_in = get_default_depth()

        if shelf_spacing is None:
            shelf_spacing = display.shelf_spacing if display.shelf_spacing else get_default_depth()

        planogram = serializer.save(
            company=request.user.company,
            created_by=request.user,
            updated_by=request.user,
            display=display,
            width_in=width_in,
            height_in=height_in,
            depth_in=depth_in,
            shelf_count=shelf_count,
            shelf_spacing=shelf_spacing,
            season=season,
            category_ids=category_ids,
        )

        # Generate and save layout immediately after creation
        fresh_layout = compute_layout(planogram)
        if fresh_layout:
            planogram.layout = fresh_layout
            planogram.save(update_fields=["layout"])

        output_serializer = PlanogramSerializer(planogram)
        return Response(output_serializer.data, status=status.HTTP_201_CREATED)

    @extend_schema(
        request=PlanogramUpdateSerializer,
        responses={200: PlanogramSerializer},
        description="Update planogram. Always regenerates and saves layout, overwriting manual changes.",
    )
    def update(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        """Update planogram and regenerate layout."""
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=kwargs.get("partial", False),
            context={"company": request.user.company}
        )
        serializer.is_valid(raise_exception=True)

        # Check if display changed and update dimensions from new display
        new_display = serializer.validated_data.get("display")
        if new_display and new_display != instance.display:
            # Update dimensions from new display (with fallback defaults for safety)
            serializer.validated_data["width_in"] = new_display.width_in
            serializer.validated_data["height_in"] = new_display.height_in
            serializer.validated_data["depth_in"] = new_display.depth_in or Decimal("24.00")
            serializer.validated_data["shelf_count"] = new_display.shelf_count
            serializer.validated_data["shelf_spacing"] = new_display.shelf_spacing or Decimal("12.00")

        planogram = serializer.save(updated_by=request.user)

        # Always regenerate layout after update
        fresh_layout = compute_layout(planogram)
        if fresh_layout:
            # Save regenerated layout to database (overwrites manual changes)
            planogram.layout = fresh_layout
            planogram.save(update_fields=["layout"])

        output_serializer = PlanogramSerializer(planogram)
        return Response(output_serializer.data)

    @extend_schema(
        responses={200: LayoutSerializer},
        description="Get planogram layout.",
    )
    @action(detail=True, methods=["get"], url_path="layout")
    def get_layout(self, request: Request, slug: str = None) -> Response:
        """Get planogram layout."""
        instance = self.get_object()

        # Get saved layout
        layout = get_saved_layout(instance)

        # If no layout exists, this is an error state
        if not layout:
            return Response(
                {"error": "Layout not found. Please regenerate the planogram."},
                status=status.HTTP_404_NOT_FOUND,
            )

        return Response(layout)

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
        instance.updated_by = request.user
        instance.save()

        output_serializer = PlanogramSerializer(instance)
        return Response(output_serializer.data)

    @extend_schema(
        request=AddProductsRequestSerializer,
        responses={200: LayoutSerializer},
        description="Add products to planogram layout at specified row.",
    )
    @action(detail=True, methods=["post"], url_path="layout/add-products")
    def add_products(self, request: Request, slug: str = None) -> Response:
        """Add products to planogram layout."""
        instance = self.get_object()

        # Validate request
        serializer = AddProductsRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        row_id = serializer.validated_data["row_id"]
        products_to_add = serializer.validated_data["products"]

        # Get current layout
        layout = get_saved_layout(instance)
        if not layout:
            return Response(
                {"error": "Layout not found. Please regenerate the planogram."},
                status=status.HTTP_404_NOT_FOUND,
            )

        # Validate row_id is within bounds
        rows = layout.get("rows", [])
        if row_id < 0 or row_id >= len(rows):
            return Response(
                {"error": f"Invalid row_id. Must be between 0 and {len(rows) - 1}."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Extract product IDs
        product_ids = [item["id"] for item in products_to_add]

        # Fetch product data
        from products.services import get_products_by_ids
        product_data = get_products_by_ids(product_ids, season=instance.season)

        # Add products to layout
        from planograms.services.grid_service import add_products_to_layout
        updated_layout = add_products_to_layout(
            layout, row_id, products_to_add, product_data
        )

        # Save updated layout
        instance.layout = updated_layout
        instance.updated_by = request.user
        instance.save(update_fields=["layout", "updated_by"])

        return Response(updated_layout)

    @extend_schema(
        request=None,  # No request body needed
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

            # Try to get saved layout first, otherwise compute fresh
            layout = get_saved_layout(instance)
            if not layout:
                layout = compute_layout(instance)

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
