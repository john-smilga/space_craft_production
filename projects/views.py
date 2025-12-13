"""Views for projects app."""

from typing import Any

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response

from common.mixins import CompanyFilterMixin, SlugLookupMixin
from common.viewsets import BaseViewSet
from projects.models import Project
from projects.serializers import (
    ProjectCreateSerializer,
    ProjectListSerializer,
    ProjectSerializer,
    ProjectUpdateSerializer,
)


class ProjectViewSet(CompanyFilterMixin, SlugLookupMixin, BaseViewSet):
    """ViewSet for Project CRUD operations."""

    queryset = Project.objects.select_related("store", "company", "created_by").all()
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self) -> type:
        """Return appropriate serializer based on action."""
        if self.action == "list":
            return ProjectListSerializer
        elif self.action == "create":
            return ProjectCreateSerializer
        elif self.action in ["update", "partial_update"]:
            return ProjectUpdateSerializer
        return ProjectSerializer

    def get_queryset(self):
        """Get projects filtered by company with optimizations."""
        queryset = super().get_queryset()
        return queryset.order_by("-created_at")

    def create(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        """Create a new project."""
        serializer = self.get_serializer(
            data=request.data, context={"company": request.user.company}
        )
        serializer.is_valid(raise_exception=True)

        project = serializer.save(company=request.user.company, created_by=request.user)

        output_serializer = ProjectSerializer(project)
        return Response(output_serializer.data, status=status.HTTP_201_CREATED)
