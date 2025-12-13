"""Views for displays app."""

from typing import Any

from django.db.models import Q, QuerySet
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response

from common.mixins import SlugLookupMixin
from common.viewsets import BaseViewSet
from displays.models import Display
from displays.serializers import (
    DisplayCreateSerializer,
    DisplayListSerializer,
    DisplaySerializer,
    DisplayTypeSerializer,
    DisplayUpdateSerializer,
)


class DisplayViewSet(SlugLookupMixin, BaseViewSet):
    """ViewSet for Display CRUD operations."""

    queryset = Display.objects.select_related("company", "created_by").all()
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self) -> type:
        """Return appropriate serializer based on action."""
        if self.action == "list":
            return DisplayListSerializer
        elif self.action == "create":
            return DisplayCreateSerializer
        elif self.action in ["update", "partial_update"]:
            return DisplayUpdateSerializer
        return DisplaySerializer

    def get_queryset(self) -> QuerySet:
        """Get displays filtered by company (custom only) plus standards."""
        queryset = super().get_queryset()

        if not self.request.user.is_authenticated:
            return queryset.none()

        if hasattr(self.request.user, "company") and self.request.user.company:
            return queryset.filter(
                Q(company=self.request.user.company) | Q(company__isnull=True)
            ).order_by("-created_at")

        return queryset.filter(company__isnull=True).order_by("-created_at")

    def create(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        """Create a new custom display."""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        display = serializer.save(company=request.user.company, created_by=request.user)

        output_serializer = DisplaySerializer(display)
        return Response(output_serializer.data, status=status.HTTP_201_CREATED)

    def destroy(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        """Delete a display (cannot delete standard displays)."""
        instance = self.get_object()

        if instance.display_category == "standard":
            return Response(
                {
                    "error": "Standard displays cannot be deleted via API. Please use the admin panel."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        return super().destroy(request, *args, **kwargs)

    @action(detail=False, methods=["get"], url_path="types")
    def types(self, request: Request) -> Response:
        """Get available display types."""
        types_data = [
            {"value": choice[0], "label": choice[1]} for choice in Display.TYPE_CHOICES
        ]
        serializer = DisplayTypeSerializer(types_data, many=True)
        return Response({"types": serializer.data})

    @action(detail=False, methods=["get"], url_path="standards")
    def standards(self, request: Request) -> Response:
        """Get standard display templates."""
        standards = Display.objects.filter(display_category="standard").order_by(
            "type", "name"
        )
        serializer = DisplaySerializer(standards, many=True)
        return Response({"standards": serializer.data})
