"""Views for projects app."""

from typing import Any

from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response

from common.mixins import CompanyFilterMixin, SlugLookupMixin
from common.viewsets import BaseViewSet
from planograms.serializers import PlanogramListSerializer
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

    @extend_schema(
        request=ProjectCreateSerializer,
        responses={201: ProjectSerializer},
        description="Create a new project.",
    )
    def create(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        """Create a new project."""
        serializer = self.get_serializer(
            data=request.data, context={"company": request.user.company}
        )
        serializer.is_valid(raise_exception=True)

        project = serializer.save(company=request.user.company, created_by=request.user)

        output_serializer = ProjectSerializer(project)
        return Response(output_serializer.data, status=status.HTTP_201_CREATED)

    @extend_schema(
        responses={
            200: {
                "type": "object",
                "properties": {
                    "planograms": {
                        "type": "array",
                        "items": {"$ref": "#/components/schemas/PlanogramList"},
                    }
                },
                "required": ["planograms"],
            }
        },
        description="Get all planograms for a specific project.",
    )
    @action(detail=True, methods=["get"], url_path="planograms")
    def planograms(self, request: Request, slug: str = None) -> Response:
        """Get all planograms for a specific project."""
        project = self.get_object()
        planograms = project.planograms.select_related(
            "display", "created_by", "project"
        ).all()
        serializer = PlanogramListSerializer(planograms, many=True)
        return Response({"planograms": serializer.data})
