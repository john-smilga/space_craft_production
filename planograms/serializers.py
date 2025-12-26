"""Serializers for planograms app."""

from decimal import Decimal
from typing import Any

from rest_framework import serializers

from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import extend_schema_field, extend_schema_serializer, inline_serializer

from common.serializers import validate_positive_integer, validate_positive_number
from displays.models import Display
from planograms.models import Planogram
from products.serializers import CategorySerializer
from products.services import get_category_names_by_ids
from projects.models import Project


@extend_schema_field(field=serializers.ListField(child=serializers.IntegerField()))
class CategoryIdsField(serializers.Field):
    """Custom field for validating category IDs as JSON list."""

    def to_representation(self, value: Any) -> list[int]:
        """Convert database value to list."""
        if isinstance(value, list):
            return value
        return []

    def to_internal_value(self, data: Any) -> list[int]:
        """Validate and convert input to list of integers."""
        if not isinstance(data, list):
            raise serializers.ValidationError("Category IDs must be a list.")

        if not data:
            raise serializers.ValidationError("At least one category must be selected.")

        try:
            category_ids = [int(item) for item in data]
        except (ValueError, TypeError):
            raise serializers.ValidationError(
                "All category IDs must be valid integers."
            )

        if any(cid <= 0 for cid in category_ids):
            raise serializers.ValidationError("Category IDs must be positive integers.")

        return category_ids


class PlanogramSerializer(serializers.ModelSerializer):
    """Output serializer for Planogram model."""

    slug = serializers.CharField(read_only=True)
    project_name = serializers.CharField(source="project.name", read_only=True)
    project_slug = serializers.CharField(source="project.slug", read_only=True)
    display_name = serializers.CharField(source="display.name", read_only=True)
    created_by_username = serializers.CharField(
        source="created_by.username", read_only=True
    )
    updated_by_username = serializers.SerializerMethodField()
    company_name = serializers.CharField(source="company.name", read_only=True)
    categories = extend_schema_field(
        CategorySerializer(many=True)
    )(serializers.SerializerMethodField())

    def get_updated_by_username(self, obj: Planogram) -> str:
        """Get username of user who last updated, or empty string if never updated."""
        return obj.updated_by.username if obj.updated_by else ""

    def get_categories(self, obj: Planogram) -> list[dict[str, Any]]:
        """Derive category names from category_ids."""
        if not obj.category_ids:
            return []
        return get_category_names_by_ids(obj.category_ids)

    class Meta:
        model = Planogram
        fields = [
            "id",
            "name",
            "slug",
            "season",
            "project",
            "project_name",
            "project_slug",
            "display",
            "display_name",
            "company",
            "company_name",
            "width_in",
            "height_in",
            "depth_in",
            "shelf_count",
            "shelf_spacing",
            "category_ids",
            "categories",
            "layout",
            "preserve_layout",
            "created_by",
            "created_by_username",
            "updated_by",
            "updated_by_username",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "slug",
            "created_by",
            "updated_by",
            "created_at",
            "updated_at",
            "company",
        ]



class PlanogramListSerializer(serializers.ModelSerializer):
    """Optimized list output serializer for Planogram model."""

    slug = serializers.CharField(read_only=True)
    project_name = serializers.CharField(source="project.name", read_only=True)
    project_slug = serializers.CharField(source="project.slug", read_only=True)
    display_name = serializers.CharField(source="display.name", read_only=True)
    categories = extend_schema_field(
        CategorySerializer(many=True)
    )(serializers.SerializerMethodField())

    def get_categories(self, obj: Planogram) -> list[dict[str, Any]]:
        """Derive category names from category_ids."""
        if not obj.category_ids:
            return []
        return get_category_names_by_ids(obj.category_ids)

    class Meta:
        model = Planogram
        fields = [
            "id",
            "name",
            "slug",
            "season",
            "project_name",
            "project_slug",
            "display_name",
            "shelf_count",
            "category_ids",
            "categories",
            "preserve_layout",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "slug", "created_at", "updated_at"]


class PlanogramCreateSerializer(serializers.ModelSerializer):
    """Input serializer for planogram creation with validation."""

    category_ids = CategoryIdsField()
    project = serializers.PrimaryKeyRelatedField(queryset=Project.objects.none())
    display = serializers.PrimaryKeyRelatedField(
        queryset=Display.objects.none(), required=False, allow_null=True
    )
    # Make dimension fields optional - view will use display defaults
    width_in = serializers.DecimalField(
        max_digits=10, decimal_places=2, required=False, allow_null=True
    )
    height_in = serializers.DecimalField(
        max_digits=10, decimal_places=2, required=False, allow_null=True
    )
    shelf_count = serializers.IntegerField(required=False, allow_null=True)

    class Meta:
        model = Planogram
        fields = [
            "name",
            "season",
            "project",
            "display",
            "width_in",
            "height_in",
            "depth_in",
            "shelf_count",
            "shelf_spacing",
            "category_ids",
        ]

    def __init__(self, *args: Any, **kwargs: Any) -> None:
        """Initialize serializer and set querysets."""
        from django.db.models import Q

        super().__init__(*args, **kwargs)
        company = self.context.get("company")
        if company:
            self.fields["project"].queryset = Project.objects.filter(company=company)
            self.fields["display"].queryset = Display.objects.filter(
                Q(company=company) | Q(company__isnull=True)
            )

    def validate_name(self, value: str) -> str:
        """Validate planogram name."""
        if not value.strip():
            raise serializers.ValidationError("Planogram name cannot be empty.")
        return value

    def validate_width_in(self, value: Decimal) -> Decimal:
        """Validate width."""
        return Decimal(str(validate_positive_number(float(value))))

    def validate_height_in(self, value: Decimal) -> Decimal:
        """Validate height."""
        return Decimal(str(validate_positive_number(float(value))))

    def validate_depth_in(self, value: Decimal) -> Decimal:
        """Validate depth."""
        if value is not None:
            return Decimal(str(validate_positive_number(float(value))))
        return value

    def validate_shelf_count(self, value: int) -> int:
        """Validate shelf count."""
        return validate_positive_integer(value)

    def validate_shelf_spacing(self, value: Decimal) -> Decimal:
        """Validate shelf spacing."""
        if value is not None:
            return Decimal(str(validate_positive_number(float(value))))
        return value

    def validate(self, attrs: dict[str, Any]) -> dict[str, Any]:
        """Validate planogram data."""
        company = self.context.get("company")
        if not company:
            raise serializers.ValidationError("Company is required.")

        project = attrs.get("project")
        if project and project.company != company:
            raise serializers.ValidationError(
                {"project": "Project does not belong to your company."}
            )

        display = attrs.get("display")
        if display and display.company and display.company != company:
            raise serializers.ValidationError(
                {"display": "Display does not belong to your company."}
            )

        return attrs


class PlanogramUpdateSerializer(serializers.ModelSerializer):
    """Input serializer for planogram updates."""

    category_ids = CategoryIdsField(required=False)
    display = serializers.PrimaryKeyRelatedField(
        queryset=Display.objects.none(), required=False, allow_null=True
    )

    class Meta:
        model = Planogram
        fields = [
            "name",
            "season",
            "display",
            "width_in",
            "height_in",
            "depth_in",
            "shelf_count",
            "shelf_spacing",
            "category_ids",
            "preserve_layout",
        ]

    def __init__(self, *args: Any, **kwargs: Any) -> None:
        """Initialize serializer and set querysets."""
        from django.db.models import Q

        super().__init__(*args, **kwargs)
        company = self.context.get("company")
        if company:
            self.fields["display"].queryset = Display.objects.filter(
                Q(company=company) | Q(company__isnull=True)
            )

    def validate_name(self, value: str) -> str:
        """Validate planogram name."""
        if not value.strip():
            raise serializers.ValidationError("Planogram name cannot be empty.")
        return value

    def validate_width_in(self, value: Decimal) -> Decimal:
        """Validate width."""
        return Decimal(str(validate_positive_number(float(value))))

    def validate_height_in(self, value: Decimal) -> Decimal:
        """Validate height."""
        return Decimal(str(validate_positive_number(float(value))))

    def validate_depth_in(self, value: Decimal) -> Decimal:
        """Validate depth."""
        if value is not None:
            return Decimal(str(validate_positive_number(float(value))))
        return value

    def validate_shelf_count(self, value: int) -> int:
        """Validate shelf count."""
        return validate_positive_integer(value)

    def validate_shelf_spacing(self, value: Decimal) -> Decimal:
        """Validate shelf spacing."""
        if value is not None:
            return Decimal(str(validate_positive_number(float(value))))
        return value

    def validate(self, attrs: dict[str, Any]) -> dict[str, Any]:
        """Validate planogram update data."""
        company = self.context.get("company")

        display = attrs.get("display")
        if display and display.company and company and display.company != company:
            raise serializers.ValidationError(
                {"display": "Display does not belong to your company."}
            )

        return attrs


class PlanogramLayoutSerializer(serializers.Serializer):
    """Input serializer for layout save."""

    layout = serializers.JSONField(required=True)
    preserve_layout = serializers.BooleanField(default=True)

    def validate_layout(self, value: Any) -> dict[str, Any]:
        """Validate layout structure."""
        if not isinstance(value, dict):
            raise serializers.ValidationError("Layout must be a JSON object.")
        return value


class AIOverviewResponseSerializer(serializers.Serializer):
    """Output serializer for AI overview response."""

    overview = serializers.CharField()
