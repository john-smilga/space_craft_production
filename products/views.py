"""
Product API views.
"""

from drf_spectacular.utils import OpenApiParameter, extend_schema
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .serializers import (
    CategoryChildrenResponseSerializer,
    CategoryIdsRequestSerializer,
    CategoryListResponseSerializer,
    ProductListResponseSerializer,
)
from .services import (
    get_category_names_by_ids,
    get_leaf_categories,
    get_selectable_categories,
    get_subcategories,
    get_top_level_categories,
)


@extend_schema(
    responses={200: CategoryListResponseSerializer},
    description="Get all leaf categories (categories with products directly, not subcategories).",
)
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def list_leaf_categories(request):
    """
    Get all leaf categories (categories with products directly, not subcategories).
    These are the selectable categories for planogram creation.

    Returns:
        {
            "categories": [
                {"id": 1, "name": "Beef", "path": "fresh/meat/beef"},
                {"id": 2, "name": "Pork", "path": "fresh/meat/pork"},
                ...
            ]
        }
    """
    categories = get_leaf_categories()
    return Response({"categories": categories})


@extend_schema(
    responses={200: CategoryListResponseSerializer},
    description="Get top-level categories (e.g., fresh, frozen).",
)
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def list_top_level_categories(request):
    """
    Get top-level categories (e.g., fresh, frozen).

    Returns:
        {
            "categories": [
                {"slug": "fresh", "name": "Fresh"},
            ]
        }
    """
    categories = get_top_level_categories()
    return Response({"categories": categories})


@extend_schema(
    responses={200: CategoryListResponseSerializer},
    description="Get subcategories under a parent category (e.g., meat, seafood, produce under fresh).",
)
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def list_subcategories(request, parent_slug):
    """
    Get subcategories under a parent category (e.g., meat, seafood, produce under fresh).
    These are displayed as tabs.

    Returns:
        {
            "categories": [
                {"slug": "meat", "name": "Meat"},
                {"slug": "seafood", "name": "Seafood"},
                {"slug": "produce", "name": "Produce"},
            ]
        }
    """
    categories = get_subcategories(parent_slug)
    return Response({"categories": categories})


@extend_schema(
    responses={200: CategoryListResponseSerializer},
    description="Get selectable categories (with IDs) under a specific tab.",
)
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def list_selectable_categories(request, parent_slug, tab_slug):
    """
    Get selectable categories (with IDs) under a specific tab.
    These are displayed as checkboxes.

    Args:
        parent_slug: Top-level category (e.g., "fresh")
        tab_slug: Tab category (e.g., "meat", "seafood", "produce")

    Returns:
        {
            "categories": [
                {"id": 1, "slug": "beef", "name": "Beef"},
                {"id": 2, "slug": "pork", "name": "Pork"},
            ]
        }
    """
    parent_path = [parent_slug, tab_slug]
    categories = get_selectable_categories(parent_path)
    return Response({"categories": categories})


@extend_schema(
    request=CategoryIdsRequestSerializer,
    responses={200: CategoryListResponseSerializer},
    description="Get category names from category IDs.",
)
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def get_categories_by_ids(request):
    """
    Get category names from category IDs.

    Request body:
        {
            "category_ids": [1, 2, 6]
        }

    Returns:
        {
            "categories": [
                {"id": 1, "slug": "beef", "name": "Beef"},
                {"id": 2, "slug": "pork", "name": "Pork"},
            ]
        }
    """
    category_ids = request.data.get("category_ids", [])
    if not isinstance(category_ids, list):
        return Response({"error": "category_ids must be a list"}, status=400)

    categories = get_category_names_by_ids(category_ids)
    return Response({"categories": categories})


@extend_schema(
    parameters=[
        OpenApiParameter(
            name="season",
            type=str,
            location=OpenApiParameter.QUERY,
            required=False,
            description="Season for product filtering (default: summer)",
        )
    ],
    responses={200: CategoryListResponseSerializer},
    description="Get children at a specific path in the category hierarchy.",
)
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_children_by_path(request, path=""):
    """
    Get children at a specific path in the category hierarchy.
    Simple unified endpoint - just pass the path.

    URL pattern: /categories/path/<path>/
    Examples:
        GET /categories/path/ -> top-level categories
        GET /categories/path/fresh/ -> categories under fresh
        GET /categories/path/fresh/meat/ -> categories under fresh/meat
        GET /categories/path/fresh/meat/beef/ -> products for beef (since beef is an ID)

    Returns:
        {
            "products": false,  # or true
            "items": [...]  # categories or products
        }
    """
    from .services import get_children_by_path

    # Normalize path (remove leading/trailing slashes)
    normalized_path = path.strip("/")

    # Get season from query params
    season = request.query_params.get("season", "summer")

    result = get_children_by_path(normalized_path, season=season)
    return Response(result)


@extend_schema(
    responses={200: CategoryChildrenResponseSerializer},
    description="Get children categories by parent category ID.",
)
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_children_by_category_id(request, category_id=None):
    """
    Get children categories by parent category ID.
    Simple URL pattern: /categories/<category_id>/children/
    If category_id is not provided, returns top-level categories.

    Examples:
        GET /categories/children/ -> top-level categories
        GET /categories/123/children/ -> children of category 123
        GET /categories/456/children/ -> children of category 456

    Returns:
        {
            "categories": [
                {"id": 1, "slug": "beef", "name": "Beef", "has_children": false},
                {"id": 1000, "slug": "meat", "name": "Meat", "has_children": true}
            ],
            "has_children": true
        }
    """
    import logging

    from .services import get_children_by_category_id

    logger = logging.getLogger(__name__)

    # Parse category_id from URL - handle both None and string cases
    # Django URL routing: when category_id is not in URL, it won't be in kwargs
    # So we check if it's in kwargs or use None
    cat_id = None
    if category_id is not None:
        try:
            cat_id = int(category_id)
        except (ValueError, TypeError):
            logger.error(f"Invalid category_id: {category_id}")
            return Response({"error": "Invalid category_id"}, status=400)

    result = get_children_by_category_id(cat_id)
    return Response(result)


@extend_schema(
    parameters=[
        OpenApiParameter(
            name="season",
            type=str,
            location=OpenApiParameter.QUERY,
            required=False,
            description="Season for metrics (default: summer)",
        )
    ],
    responses={200: ProductListResponseSerializer},
    description="Get products for a specific category ID with seasonal metrics.",
)
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_products_by_category(request, category_id):
    """
    Get products for a specific category ID with seasonal metrics.
    This is used for incremental loading - when a category is selected, return its products.

    Args:
        category_id: Category ID (e.g., 1 for beef)
        season: Optional query parameter for season (default: summer)

    Returns:
        {
            "products": [
                {
                    "id": 1,
                    "name": "Beef Ribeye Steaks",
                    "pack_width_in": 13.0,
                    "pack_height_in": 3.0,
                    "margin": 0.35,
                    "sales_velocity": 0.8,
                    "overall_score": 0.75,
                    ...
                }
            ]
        }
    """
    from .services import get_products_for_categories

    season = request.query_params.get("season", "summer")

    # Get products for this category
    products_by_category = get_products_for_categories(
        [int(category_id)], season=season
    )

    # Extract products for this category ID
    products = products_by_category.get(int(category_id), [])

    return Response({"products": products})


@extend_schema(
    parameters=[
        OpenApiParameter(
            name="category_ids",
            type=str,
            location=OpenApiParameter.QUERY,
            required=True,
            description="Comma-separated list of category IDs (e.g., '1,2,6')",
        ),
        OpenApiParameter(
            name="season",
            type=str,
            location=OpenApiParameter.QUERY,
            required=False,
            description="Season for metrics (default: summer)",
        ),
    ],
    responses={200: ProductListResponseSerializer},
    description="Get all products for multiple category IDs with seasonal metrics.",
)
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_products_by_category_ids(request):
    """
    Get all products for multiple category IDs with seasonal metrics.
    Used for Add/Replace functionality in planograms.

    Query params:
        category_ids: Comma-separated list of category IDs (e.g., "1,2,6")
        season: Season for metrics (default: summer)

    Returns:
        {
            "products": [
                {
                    "id": 1,
                    "name": "Beef Ribeye Steaks",
                    "pack_width_in": 13.0,
                    "pack_height_in": 3.0,
                    "margin": 0.35,
                    "sales_velocity": 0.8,
                    "overall_score": 0.75,
                    "category": "Beef",
                    ...
                }
            ]
        }
    """
    from .services import get_products_for_categories

    category_ids_str = request.query_params.get("category_ids", "")
    season = request.query_params.get("season", "summer")

    if not category_ids_str:
        return Response({"error": "category_ids parameter is required"}, status=400)

    try:
        category_ids = [
            int(id.strip()) for id in category_ids_str.split(",") if id.strip()
        ]
    except ValueError:
        return Response({"error": "Invalid category_ids format"}, status=400)

    if not category_ids:
        return Response({"products": []})

    # Get products for all categories
    products_by_category = get_products_for_categories(category_ids, season=season)

    # Get category info (including slug) for all category IDs
    from .data.category_hierarchy import get_category_color
    from .services import get_category_names_by_ids

    category_info = {cat["id"]: cat for cat in get_category_names_by_ids(category_ids)}

    # Flatten all products into a single list and add category name and color
    all_products = []
    for category_id, products in products_by_category.items():
        cat_info = category_info.get(category_id, {})
        category_name = cat_info.get("name", "Unknown")
        category_slug = cat_info.get("slug", "")
        color = get_category_color(category_slug) if category_slug else "#9ca3af"

        for product in products:
            # Add category name and color to each product
            product_with_category = {
                **product,
                "category": category_name,
                "color": color,
            }
            all_products.append(product_with_category)

    return Response({"products": all_products})
