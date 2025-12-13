"""
Explicit category hierarchy definition with IDs.
This is the source of truth for category structure, independent of products.
Selectable categories (leaf nodes) have IDs assigned.
"""

# Category IDs start from 1
CATEGORY_HIERARCHY = {
    "fresh": {
        "meat": {
            "beef": 1,
            "pork": 2,
            "poultry": 3,
            "lamb": 4,
            "sausage": 5,
        },
        "seafood": {
            "fresh_fish": 6,
            "shellfish": 17,
        },
        "produce": {
            "fruits": {
                "berries": 7,
                "citrus": 8,
                "tropical": 9,
            },
            "vegetables": {
                "leafy_greens": 10,
                "root_vegetables": 11,
                "nightshades": 12,
                "cruciferous": 13,
                "alliums": 14,
                "cucurbits": 15,
                "herbs": 16,
            },
        },
    },
    "frozen": {
        "meals": {
            "entrees": 18,
            "sides": 19,
        },
        "desserts": {
            "ice_cream": 20,
            "frozen_fruit": 21,
        },
    },
}

# Reverse mapping: category_id -> full path (for product lookup)
CATEGORY_ID_TO_PATH = {}


def _build_id_to_path_mapping(node, path_parts=None):
    """Build reverse mapping from category ID to path."""
    if path_parts is None:
        path_parts = []

    for slug, value in node.items():
        current_path = path_parts + [slug]

        if isinstance(value, int):
            # This is a selectable category with an ID
            full_path = "/".join(current_path)
            CATEGORY_ID_TO_PATH[value] = full_path
        elif isinstance(value, dict):
            # Recurse into nested structure
            _build_id_to_path_mapping(value, current_path)


# Initialize the reverse mapping
_build_id_to_path_mapping(CATEGORY_HIERARCHY)


def get_category_path_by_id(category_id: int) -> str:
    """Get full category path from category ID."""
    return CATEGORY_ID_TO_PATH.get(category_id, "")


# Category color mapping for visualization
# When adding new categories, add their color here
CATEGORY_COLORS = {
    # Meat categories
    "beef": "#dc2626",  # Red
    "pork": "#ea580c",  # Orange
    "poultry": "#ca8a04",  # Amber
    "lamb": "#9333ea",  # Purple
    "sausage": "#991b1b",  # Dark Red
    # Seafood categories
    "fresh_fish": "#2563eb",  # Blue
    "shellfish": "#0891b2",  # Cyan
    # Fruit categories
    "berries": "#991b1b",  # Dark Red
    "citrus": "#ea580c",  # Orange
    "tropical": "#65a30d",  # Lime
    # Vegetable categories
    "leafy_greens": "#059669",  # Emerald
    "root_vegetables": "#0d9488",  # Teal
    "nightshades": "#1e40af",  # Dark Blue
    "cruciferous": "#065f46",  # Dark Green
    "alliums": "#155e75",  # Dark Cyan
    "cucurbits": "#16a34a",  # Green
    "herbs": "#65a30d",  # Lime
    # Frozen meal categories
    "entrees": "#dc2626",  # Red
    "sides": "#ea580c",  # Orange
    # Frozen dessert categories
    "ice_cream": "#0891b2",  # Cyan
    "frozen_fruit": "#65a30d",  # Lime
}

# Default color for categories without a defined color
DEFAULT_CATEGORY_COLOR = "#9ca3af"  # Gray


def get_category_color(category_slug: str) -> str:
    """
    Get color for a category slug.

    Args:
        category_slug: Category slug (e.g., "beef", "pork", "fresh_fish")

    Returns:
        Hex color code. Returns default gray if category not found.

    Note:
        When adding new categories, add their color to CATEGORY_COLORS above.
    """
    return CATEGORY_COLORS.get(category_slug, DEFAULT_CATEGORY_COLOR)
