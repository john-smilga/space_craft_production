"""Views for stores app."""

import logging
from typing import Any

from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response

from common.mixins import CompanyFilterMixin, SlugLookupMixin
from common.viewsets import BaseViewSet
from stores.models import Store
from stores.serializers import (
    StoreCreateSerializer,
    StoreListSerializer,
    StoreSerializer,
    StoreUpdateSerializer,
)

logger = logging.getLogger("stores")


class StoreViewSet(CompanyFilterMixin, SlugLookupMixin, BaseViewSet):
    """ViewSet for Store CRUD operations."""

    queryset = Store.objects.select_related("company", "created_by").all()
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self) -> type:
        """Return appropriate serializer based on action."""
        if self.action == "list":
            return StoreListSerializer
        elif self.action == "create":
            return StoreCreateSerializer
        elif self.action in ["update", "partial_update"]:
            return StoreUpdateSerializer
        return StoreSerializer

    def get_queryset(self):
        """Get stores filtered by company with optimizations."""
        queryset = super().get_queryset()
        return queryset.order_by("-created_at")

    @extend_schema(
        request=StoreCreateSerializer,
        responses={201: StoreSerializer},
        description="Create a new store (admin only).",
    )
    def create(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        """Create a new store (admin only)."""
        if request.user.role != "admin":
            return Response(
                {"error": "Only admins can create stores"},
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = self.get_serializer(
            data=request.data, context={"company": request.user.company}
        )
        serializer.is_valid(raise_exception=True)

        store = serializer.save(company=request.user.company, created_by=request.user)

        output_serializer = StoreSerializer(store)
        return Response(output_serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        """Update a store (admin only)."""
        if request.user.role != "admin":
            return Response(
                {"error": "Only admins can update stores"},
                status=status.HTTP_403_FORBIDDEN,
            )

        return super().update(request, *args, **kwargs)

    def partial_update(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        """Partially update a store (admin only)."""
        if request.user.role != "admin":
            return Response(
                {"error": "Only admins can update stores"},
                status=status.HTTP_403_FORBIDDEN,
            )

        return super().partial_update(request, *args, **kwargs)

    def destroy(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        """Delete a store (admin only)."""
        if request.user.role != "admin":
            return Response(
                {"error": "Only admins can delete stores"},
                status=status.HTTP_403_FORBIDDEN,
            )

        return super().destroy(request, *args, **kwargs)
