"""Serializers for products and categories."""

from rest_framework import serializers


class CategorySerializer(serializers.Serializer):
    """Serializer for category data."""

    id = serializers.IntegerField()
    slug = serializers.CharField()
    name = serializers.CharField()
    path = serializers.CharField(required=False)
    has_children = serializers.BooleanField(required=False)


class CategoryListResponseSerializer(serializers.Serializer):
    """Response serializer for category list endpoints."""

    categories = CategorySerializer(many=True)


class CategoryChildrenResponseSerializer(serializers.Serializer):
    """Response serializer for category children endpoint."""

    categories = CategorySerializer(many=True)
    has_children = serializers.BooleanField()


class ProductSerializer(serializers.Serializer):
    """Serializer for product data with seasonal metrics."""

    id = serializers.IntegerField()
    name = serializers.CharField()
    pack_width_in = serializers.FloatField()
    pack_height_in = serializers.FloatField()
    margin = serializers.FloatField()
    sales_velocity = serializers.FloatField()
    overall_score = serializers.FloatField()
    category = serializers.CharField(required=False)
    color = serializers.CharField(required=False)
    expiration_stability = serializers.FloatField(required=False)
    seasonality = serializers.FloatField(required=False)


class ProductListResponseSerializer(serializers.Serializer):
    """Response serializer for product list endpoints."""

    products = ProductSerializer(many=True)


class CategoryIdsRequestSerializer(serializers.Serializer):
    """Request serializer for category IDs."""

    category_ids = serializers.ListField(
        child=serializers.IntegerField(), required=True
    )
