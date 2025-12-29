"""Serializers for displays app."""

from decimal import Decimal

from rest_framework import serializers

from common.serializers import validate_positive_integer, validate_positive_number
from displays.models import Display


class DisplaySerializer(serializers.ModelSerializer):
    """Output serializer for Display model."""

    slug = serializers.CharField(read_only=True)
    created_by_username = serializers.SerializerMethodField()
    company_name = serializers.SerializerMethodField()

    def get_created_by_username(self, obj):
        """Get username of creator, or empty string if null."""
        return obj.created_by.username if obj.created_by else ""

    def get_company_name(self, obj):
        """Get company name, or empty string if null (standard displays)."""
        return obj.company.name if obj.company else ""

    class Meta:
        model = Display
        fields = [
            "id",
            "name",
            "type",
            "width_in",
            "height_in",
            "depth_in",
            "shelf_count",
            "shelf_spacing",
            "display_category",
            "company",
            "company_name",
            "slug",
            "created_by",
            "created_by_username",
            "created_at",
        ]
        read_only_fields = [
            "id",
            "slug",
            "display_category",
            "created_by",
            "created_at",
            "company",
        ]


class DisplayListSerializer(serializers.ModelSerializer):
    """Optimized list output serializer for Display model."""

    slug = serializers.CharField(read_only=True)

    class Meta:
        model = Display
        fields = [
            "id",
            "name",
            "type",
            "width_in",
            "height_in",
            "depth_in",
            "shelf_count",
            "display_category",
            "slug",
        ]
        read_only_fields = ["id", "slug", "display_category"]


class DisplayCreateSerializer(serializers.ModelSerializer):
    """Input serializer for display creation."""

    class Meta:
        model = Display
        fields = [
            "name",
            "type",
            "width_in",
            "height_in",
            "depth_in",
            "shelf_count",
            "shelf_spacing",
        ]

    def validate_name(self, value: str) -> str:
        """Validate display name."""
        if not value.strip():
            raise serializers.ValidationError("Display name cannot be empty.")
        return value

    def validate_width_in(self, value: Decimal) -> Decimal:
        """Validate width."""
        return Decimal(str(validate_positive_number(float(value))))

    def validate_height_in(self, value: Decimal) -> Decimal:
        """Validate height."""
        return Decimal(str(validate_positive_number(float(value))))

    def validate_depth_in(self, value: Decimal) -> Decimal:
        """Validate depth."""
        return Decimal(str(validate_positive_number(float(value))))

    def validate_shelf_count(self, value: int) -> int:
        """Validate shelf count."""
        return validate_positive_integer(value)

    def validate_shelf_spacing(self, value: Decimal) -> Decimal:
        """Validate shelf spacing."""
        if value is not None:
            return Decimal(str(validate_positive_number(float(value))))
        return value


class DisplayUpdateSerializer(serializers.ModelSerializer):
    """Input serializer for display updates."""

    class Meta:
        model = Display
        fields = [
            "name",
            "type",
            "width_in",
            "height_in",
            "depth_in",
            "shelf_count",
            "shelf_spacing",
        ]

    def validate_name(self, value: str) -> str:
        """Validate display name."""
        if not value.strip():
            raise serializers.ValidationError("Display name cannot be empty.")
        return value

    def validate_width_in(self, value: Decimal) -> Decimal:
        """Validate width."""
        return Decimal(str(validate_positive_number(float(value))))

    def validate_height_in(self, value: Decimal) -> Decimal:
        """Validate height."""
        return Decimal(str(validate_positive_number(float(value))))

    def validate_depth_in(self, value: Decimal) -> Decimal:
        """Validate depth."""
        return Decimal(str(validate_positive_number(float(value))))

    def validate_shelf_count(self, value: int) -> int:
        """Validate shelf count."""
        return validate_positive_integer(value)

    def validate_shelf_spacing(self, value: Decimal) -> Decimal:
        """Validate shelf spacing."""
        if value is not None:
            return Decimal(str(validate_positive_number(float(value))))
        return value


class DisplayTypeSerializer(serializers.Serializer):
    """Serializer for display type choices."""

    value = serializers.CharField()
    label = serializers.CharField()
