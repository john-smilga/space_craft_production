"""Serializers for stores app."""

from typing import Any

from rest_framework import serializers

from stores.models import Store


class StoreSerializer(serializers.ModelSerializer):
    """Output serializer for Store model."""

    slug = serializers.CharField(read_only=True)
    created_by_username = serializers.CharField(
        source="created_by.username", read_only=True
    )
    company_name = serializers.CharField(source="company.name", read_only=True)

    class Meta:
        model = Store
        fields = [
            "id",
            "name",
            "store_code",
            "address",
            "company",
            "company_name",
            "slug",
            "created_by",
            "created_by_username",
            "created_at",
        ]
        read_only_fields = ["id", "slug", "created_by", "created_at", "company"]


class StoreListSerializer(serializers.ModelSerializer):
    """Optimized list output serializer for Store model."""

    slug = serializers.CharField(read_only=True)
    company_name = serializers.CharField(source="company.name", read_only=True)

    class Meta:
        model = Store
        fields = ["id", "name", "store_code", "slug", "company_name", "created_at"]
        read_only_fields = ["id", "slug", "created_at"]


class StoreCreateSerializer(serializers.ModelSerializer):
    """Input serializer for store creation."""

    class Meta:
        model = Store
        fields = ["name", "store_code", "address"]

    def validate_store_code(self, value: str) -> str:
        """Validate store code format."""
        if not value.strip():
            raise serializers.ValidationError("Store code cannot be empty.")
        return value.upper()

    def validate(self, attrs: dict[str, Any]) -> dict[str, Any]:
        """Validate store data."""
        company = self.context.get("company")
        if not company:
            raise serializers.ValidationError("Company is required.")

        store_code = attrs.get("store_code", "").upper()
        if Store.objects.filter(company=company, store_code=store_code).exists():
            raise serializers.ValidationError(
                {"store_code": "A store with this code already exists in your company."}
            )

        return attrs


class StoreUpdateSerializer(serializers.ModelSerializer):
    """Input serializer for store updates."""

    class Meta:
        model = Store
        fields = ["name", "address"]

    def validate_name(self, value: str) -> str:
        """Validate store name."""
        if not value.strip():
            raise serializers.ValidationError("Store name cannot be empty.")
        return value
