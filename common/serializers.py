"""Base serializers and utilities for the SpaceCraft project."""

from typing import Any

from rest_framework import serializers


class ErrorResponseSerializer(serializers.Serializer):
    """Standard error response format."""

    code = serializers.CharField()
    message = serializers.CharField()
    details = serializers.DictField(required=False)


class PaginationSerializer(serializers.Serializer):
    """Pagination metadata serializer."""

    count = serializers.IntegerField()
    next = serializers.URLField(allow_null=True, required=False)
    previous = serializers.URLField(allow_null=True, required=False)
    results = serializers.ListField()


class SlugField(serializers.SlugField):
    """Custom slug field with validation."""

    def __init__(self, **kwargs: Any) -> None:
        kwargs.setdefault("max_length", 255)
        kwargs.setdefault("allow_blank", False)
        super().__init__(**kwargs)


def validate_positive_integer(value: int) -> int:
    """Validate that an integer is positive."""
    if value <= 0:
        raise serializers.ValidationError("Value must be positive.")
    return value


def validate_non_negative_integer(value: int) -> int:
    """Validate that an integer is non-negative."""
    if value < 0:
        raise serializers.ValidationError("Value must be non-negative.")
    return value


def validate_positive_number(value: float) -> float:
    """Validate that a number is positive."""
    if value <= 0:
        raise serializers.ValidationError("Value must be positive.")
    return value


def validate_json_list(value: Any) -> list[Any]:
    """Validate that a value is a list."""
    if not isinstance(value, list):
        raise serializers.ValidationError("Value must be a list.")
    return value
