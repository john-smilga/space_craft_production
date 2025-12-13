"""Serializers for projects app."""

from typing import Any

from rest_framework import serializers

from projects.models import Project
from stores.models import Store


class ProjectSerializer(serializers.ModelSerializer):
    """Output serializer for Project model with nested store."""

    slug = serializers.CharField(read_only=True)
    store_name = serializers.CharField(source="store.name", read_only=True)
    store_code = serializers.CharField(source="store.store_code", read_only=True)
    store_slug = serializers.CharField(source="store.slug", read_only=True)
    created_by_username = serializers.CharField(
        source="created_by.username", read_only=True
    )
    company_name = serializers.CharField(source="company.name", read_only=True)

    class Meta:
        model = Project
        fields = [
            "id",
            "name",
            "slug",
            "store",
            "store_name",
            "store_code",
            "store_slug",
            "company",
            "company_name",
            "created_by",
            "created_by_username",
            "created_at",
        ]
        read_only_fields = ["id", "slug", "created_by", "created_at", "company"]


class ProjectListSerializer(serializers.ModelSerializer):
    """Optimized list output serializer for Project model."""

    slug = serializers.CharField(read_only=True)
    store_name = serializers.CharField(source="store.name", read_only=True)
    store_code = serializers.CharField(source="store.store_code", read_only=True)

    class Meta:
        model = Project
        fields = [
            "id",
            "name",
            "slug",
            "store_name",
            "store_code",
            "created_at",
        ]
        read_only_fields = ["id", "slug", "created_at"]


class ProjectCreateSerializer(serializers.ModelSerializer):
    """Input serializer for project creation."""

    store = serializers.PrimaryKeyRelatedField(
        queryset=Store.objects.none()
    )  # Will be set in __init__ based on company

    class Meta:
        model = Project
        fields = ["name", "store"]

    def __init__(self, *args: Any, **kwargs: Any) -> None:
        """Initialize serializer and set store queryset."""
        super().__init__(*args, **kwargs)
        company = self.context.get("company")
        if company:
            self.fields["store"].queryset = Store.objects.filter(company=company)

    def validate_name(self, value: str) -> str:
        """Validate project name."""
        if not value.strip():
            raise serializers.ValidationError("Project name cannot be empty.")
        return value

    def validate(self, attrs: dict[str, Any]) -> dict[str, Any]:
        """Validate project data."""
        company = self.context.get("company")
        if not company:
            raise serializers.ValidationError("Company is required.")

        store = attrs.get("store")
        if store and store.company != company:
            raise serializers.ValidationError(
                {"store": "Store does not belong to your company."}
            )

        return attrs


class ProjectUpdateSerializer(serializers.ModelSerializer):
    """Input serializer for project updates."""

    class Meta:
        model = Project
        fields = ["name"]

    def validate_name(self, value: str) -> str:
        """Validate project name."""
        if not value.strip():
            raise serializers.ValidationError("Project name cannot be empty.")
        return value
