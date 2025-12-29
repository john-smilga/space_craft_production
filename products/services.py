"""
Product services for retrieving and combining product data with seasonal metrics.
"""

from typing import Any

from .data.category_hierarchy import CATEGORY_HIERARCHY, get_category_path_by_id
from .data.products import PRODUCTS_BY_CATEGORY
from .data.products_metrics import PRODUCT_BASE_METRICS, PRODUCT_SEASONAL_METRICS


def _flatten_products_by_category(
    category_dict: dict, path_parts: list[str] = None
) -> dict[str, list[dict]]:
    """
    Flatten hierarchical product structure into category paths.
    Returns dict mapping category paths to product lists.
    """
    if path_parts is None:
        path_parts = []

    result = {}

    for key, value in category_dict.items():
        current_path = path_parts + [key]

        if isinstance(value, list):
            # This is a list of products
            category_path = " > ".join(current_path)
            result[category_path] = value
        elif isinstance(value, dict):
            # Recurse into nested structure
            nested = _flatten_products_by_category(value, current_path)
            result.update(nested)

    return result


def get_products_for_categories(
    category_ids: list[int], season: str = "summer"
) -> dict[int, list[dict[str, Any]]]:
    """
    Get products for specified category IDs with seasonal metrics merged.

    Args:
        category_ids: List of category IDs (e.g., [1, 2, 6])
        season: Season to use for metrics (spring, summer, fall, winter)

    Returns:
        Dict mapping category IDs to lists of products with all metrics merged.
    """
    # Flatten the hierarchical structure (still uses > format internally)
    all_products_by_path = _flatten_products_by_category(PRODUCTS_BY_CATEGORY)

    result = {}

    for category_id in category_ids:
        # Get category path from ID
        category_path = get_category_path_by_id(category_id)
        if not category_path:
            continue

        # Convert / separator to > for product lookup (products still use > format)
        product_lookup_path = category_path.replace("/", " > ")
        if product_lookup_path not in all_products_by_path:
            continue

        products = []
        for product in all_products_by_path[product_lookup_path]:
            product_id = product["id"]

            # Get base metrics (constant)
            base_metrics = PRODUCT_BASE_METRICS.get(product_id, {})

            # Get seasonal metrics
            seasonal_metrics = PRODUCT_SEASONAL_METRICS.get(product_id, {}).get(
                season, {}
            )

            # Merge: base product data + base metrics + seasonal metrics
            merged_product = {
                **product,  # id, name, pack_width_in, pack_height_in
                **base_metrics,  # expiration_stability
                **seasonal_metrics,  # margin, sales_velocity, seasonality, overall_score
            }

            products.append(merged_product)

        if products:
            result[category_id] = products

    return result


def get_all_categories() -> list[str]:
    """
    Get all available category paths using / separator.

    Returns:
        List of category paths (e.g., ["fresh/meat/beef", "fresh/seafood"])
    """

    def traverse(node: dict, path_parts: list[str] = None) -> list[str]:
        if path_parts is None:
            path_parts = []

        result = []
        for slug, value in node.items():
            current_path = path_parts + [slug]

            if isinstance(value, int):
                # This is a leaf node - selectable category
                result.append("/".join(current_path))
            elif isinstance(value, dict):
                # Recurse into children
                result.extend(traverse(value, current_path))

        return result

    return traverse(CATEGORY_HIERARCHY)


def get_leaf_categories() -> list[dict[str, Any]]:
    """
    Get all leaf categories (categories that have products directly, not subcategories).
    These are the categories that map to integer IDs in CATEGORY_HIERARCHY.

    Returns:
        List of category objects with id, name, and path.
        Example: [
            {"id": 1, "name": "Beef", "path": "fresh/meat/beef"},
            {"id": 2, "name": "Pork", "path": "fresh/meat/pork"},
            ...
        ]
    """
    from .data.category_hierarchy import CATEGORY_HIERARCHY

    result = []

    def traverse(node: dict, path_parts: list[str] = None):
        if path_parts is None:
            path_parts = []

        for slug, value in node.items():
            current_path = path_parts + [slug]

            if isinstance(value, int):
                # This is a leaf category with an ID
                category_id = value
                name = slug.replace("_", " ").title()
                result.append(
                    {
                        "id": category_id,
                        "name": name,
                        "path": "/".join(current_path),
                    }
                )
            elif isinstance(value, dict):
                # Recurse into nested structure
                traverse(value, current_path)

    traverse(CATEGORY_HIERARCHY)
    # Sort alphabetically by name
    return sorted(result, key=lambda x: x["name"])


def get_top_level_categories() -> list[dict[str, Any]]:
    """
    Get top-level categories (e.g., fresh, frozen).

    Returns:
        List of category objects with slug and name.
    """
    result = []
    for slug in CATEGORY_HIERARCHY.keys():
        name = slug.replace("_", " ").title()
        result.append(
            {
                "slug": slug,
                "name": name,
            }
        )
    return result


def get_subcategories(parent_slug: str) -> list[dict[str, Any]]:
    """
    Get subcategories under a parent category (e.g., meat, seafood, produce under fresh).

    Args:
        parent_slug: Slug of the parent category (e.g., "fresh")

    Returns:
        List of category objects with slug and name for tabs.
    """
    if parent_slug not in CATEGORY_HIERARCHY:
        return []

    parent = CATEGORY_HIERARCHY[parent_slug]
    if not isinstance(parent, dict):
        return []

    result = []
    for slug, value in parent.items():
        name = slug.replace("_", " ").title()
        result.append(
            {
                "slug": slug,
                "name": name,
            }
        )
    return result


def get_selectable_categories(parent_path: list[str]) -> list[dict[str, Any]]:
    """
    Get selectable categories (with IDs) under a specific path.

    Args:
        parent_path: List of slugs representing the path (e.g., ["fresh", "meat"])

    Returns:
        List of category objects with id, slug, and name for checkboxes.
        If the path leads to a direct selectable category (integer), returns that category.
    """
    # Navigate to the specific path
    current = CATEGORY_HIERARCHY
    for slug in parent_path:
        if not isinstance(current, dict) or slug not in current:
            return []
        current = current[slug]

    # If we reached an integer value, this is a direct selectable category (e.g., seafood)
    if isinstance(current, int):
        # Get the last slug from the path as the category name
        category_slug = parent_path[-1] if parent_path else ""
        name = category_slug.replace("_", " ").title()
        return [
            {
                "id": current,
                "slug": category_slug,
                "name": name,
            }
        ]

    # If we reached a non-dict value, return empty
    if not isinstance(current, dict):
        return []

    # Return selectable categories (those with integer IDs)
    result = []
    for slug, value in current.items():
        if isinstance(value, int):
            # This is a selectable category with an ID
            name = slug.replace("_", " ").title()
            result.append(
                {
                    "id": value,
                    "slug": slug,
                    "name": name,
                }
            )
        elif isinstance(value, dict):
            # This has children - recurse to get all selectable categories
            nested_path = parent_path + [slug]
            result.extend(get_selectable_categories(nested_path))

    return result


# Cache for category ID mappings (built once)
_CATEGORY_ID_MAPPING = None
_CATEGORY_ID_TO_NODE = None


def _build_category_id_mapping():
    """Build mapping of category IDs to nodes. Cache the result."""
    global _CATEGORY_ID_MAPPING, _CATEGORY_ID_TO_NODE

    if _CATEGORY_ID_MAPPING is not None:
        return _CATEGORY_ID_MAPPING, _CATEGORY_ID_TO_NODE

    from .data.category_hierarchy import CATEGORY_HIERARCHY

    # Mapping: (path_parts, node_value) -> category_id
    # Also track: category_id -> (path_parts, node_value)
    category_id_to_node = {}
    path_to_id = {}  # Full path tuple -> category_id
    id_counter = 1000  # Start IDs for non-selectable categories at 1000

    def _build_mappings(node, path_parts=None):
        nonlocal id_counter
        if path_parts is None:
            path_parts = []

        for slug, value in node.items():
            current_path = tuple(path_parts + [slug])

            if isinstance(value, int):
                # This is a selectable category with an ID
                category_id = value
                category_id_to_node[category_id] = (list(path_parts), value)
                path_to_id[current_path] = category_id
            elif isinstance(value, dict):
                # This is a non-selectable category - assign it an ID
                category_id = id_counter
                id_counter += 1
                category_id_to_node[category_id] = (list(path_parts), value)
                path_to_id[current_path] = category_id
                # Recurse
                _build_mappings(value, list(current_path))

    _build_mappings(CATEGORY_HIERARCHY)

    _CATEGORY_ID_MAPPING = path_to_id
    _CATEGORY_ID_TO_NODE = category_id_to_node

    return path_to_id, category_id_to_node


def get_children_by_category_id(category_id: int | None = None) -> dict[str, Any]:
    """
    Get children categories by parent category ID.
    If category_id is None, returns top-level categories.

    Args:
        category_id: Parent category ID (None for top-level)

    Returns:
        Dict with:
        - "categories": List of category objects (all have IDs)
        - "has_children": Boolean indicating if any category has children
    """
    from .data.category_hierarchy import CATEGORY_HIERARCHY

    path_to_id, category_id_to_node = _build_category_id_mapping()

    # If no category_id, return top-level
    if category_id is None:
        categories = []
        for slug, value in CATEGORY_HIERARCHY.items():
            path_tuple = (slug,)
            cat_id = path_to_id.get(path_tuple)
            if cat_id:
                name = slug.replace("_", " ").title()
                has_children = isinstance(value, dict)
                categories.append(
                    {
                        "id": cat_id,
                        "slug": slug,
                        "name": name,
                        "has_children": has_children,
                    }
                )
        return {
            "categories": categories,
            "has_children": any(cat["has_children"] for cat in categories),
        }

    # Find the node for this category_id
    if category_id not in category_id_to_node:
        return {
            "categories": [],
            "has_children": False,
        }

    path_parts, node_value = category_id_to_node[category_id]

    # If node_value is an int, this is a leaf - no children
    if isinstance(node_value, int):
        return {
            "categories": [],
            "has_children": False,
        }

    # If node_value is a dict, return its children
    if not isinstance(node_value, dict):
        return {
            "categories": [],
            "has_children": False,
        }

    # Build children list with IDs
    children = []
    for slug, value in node_value.items():
        child_path = tuple(path_parts + [slug])
        child_id = path_to_id.get(child_path)

        if child_id is None:
            # Should not happen if mapping is built correctly
            continue

        name = slug.replace("_", " ").title()
        has_children = isinstance(value, dict)

        children.append(
            {
                "id": child_id,
                "slug": slug,
                "name": name,
                "has_children": has_children,
            }
        )

    return {
        "categories": children,
        "has_children": any(child["has_children"] for child in children),
    }


def get_children_by_path(path: str = "", season: str = "summer") -> dict[str, Any]:
    """
    Get children at a specific path in the category hierarchy.
    Simple approach: return keys of the object at that path.

    Args:
        path: Category path (e.g., "", "fresh", "fresh/meat")
              Empty string returns top-level categories
              "fresh" returns categories under fresh
              "fresh/meat" returns categories under fresh/meat

    Returns:
        {
            "products": false,  # or true if this is a product category
            "items": [
                {"key": "meat", "name": "Meat"}  # if products: false
                # OR
                {"id": 1, "name": "Beef Ribeye Steaks", ...}  # if products: true
            ]
        }
    """
    from .data.category_hierarchy import CATEGORY_HIERARCHY

    # Navigate to the path
    current = CATEGORY_HIERARCHY
    path_parts = [p for p in path.split("/") if p] if path else []

    for slug in path_parts:
        if not isinstance(current, dict) or slug not in current:
            return {
                "products": False,
                "items": [],
            }
        current = current[slug]

    # If we reached an integer, this is a selectable category - return products
    if isinstance(current, int):
        category_id = current
        # Get products for this category
        category_path = "/".join(path_parts)
        products = _get_products_by_path(category_path, season=season)
        return {
            "products": True,
            "items": products,
        }

    # If not a dict, return empty
    if not isinstance(current, dict):
        return {
            "products": False,
            "items": [],
        }

    # Return children as categories
    items = []
    for slug, value in current.items():
        name = slug.replace("_", " ").title()
        items.append(
            {
                "key": slug,
                "name": name,
            }
        )

    return {
        "products": False,
        "items": items,
    }


def _get_products_by_path(
    category_path: str, season: str = "summer"
) -> list[dict[str, Any]]:
    """Get products for a category path from PRODUCTS_BY_CATEGORY with seasonal metrics."""
    from .data.products import PRODUCTS_BY_CATEGORY
    from .data.products_metrics import PRODUCT_BASE_METRICS, PRODUCT_SEASONAL_METRICS

    # Navigate to products
    path_parts = category_path.split("/")
    current = PRODUCTS_BY_CATEGORY

    for part in path_parts:
        if not isinstance(current, dict) or part not in current:
            return []
        current = current[part]

    # If we reached a list, return products with metrics merged
    if isinstance(current, list):
        result = []
        for product in current:
            product_id = product.get("id")
            if not product_id:
                continue

            # Get base metrics
            base_metrics = PRODUCT_BASE_METRICS.get(product_id, {})

            # Get seasonal metrics (structure: PRODUCT_SEASONAL_METRICS[product_id][season])
            seasonal_metrics = PRODUCT_SEASONAL_METRICS.get(product_id, {}).get(
                season, {}
            )

            # Merge all together
            merged = {**product, **base_metrics, **seasonal_metrics}
            result.append(merged)

        return result

    return []


def get_categories_by_path(path: str = "") -> dict[str, Any]:
    """
    Get categories at a specific path level.
    This is a unified function that works for any level in the hierarchy.

    Args:
        path: Category path (e.g., "", "fresh", "fresh/meat")
              Empty string returns top-level categories
              "fresh" returns subcategories of fresh
              "fresh/meat" returns selectable categories under fresh/meat

    Returns:
        Dict with:
        - "categories": List of category objects
        - "has_children": Boolean indicating if categories have children
        - "is_selectable": Boolean indicating if these are selectable (have IDs)
    """
    from .data.category_hierarchy import CATEGORY_HIERARCHY

    # Navigate to the path
    current = CATEGORY_HIERARCHY
    path_parts = [p for p in path.split("/") if p] if path else []

    for slug in path_parts:
        if not isinstance(current, dict) or slug not in current:
            return {
                "categories": [],
                "has_children": False,
                "is_selectable": False,
            }
        current = current[slug]

    # If we reached an integer, this is a leaf selectable category
    if isinstance(current, int):
        return {
            "categories": [],
            "has_children": False,
            "is_selectable": True,
        }

    # If not a dict, return empty
    if not isinstance(current, dict):
        return {
            "categories": [],
            "has_children": False,
            "is_selectable": False,
        }

    # Build categories list
    categories = []
    has_children = False
    is_selectable = False

    for slug, value in current.items():
        name = slug.replace("_", " ").title()

        if isinstance(value, int):
            # This is a selectable category with an ID
            categories.append(
                {
                    "id": value,
                    "slug": slug,
                    "name": name,
                }
            )
            is_selectable = True
        elif isinstance(value, dict):
            # This has children
            categories.append(
                {
                    "slug": slug,
                    "name": name,
                }
            )
            has_children = True

    return {
        "categories": categories,
        "has_children": has_children,
        "is_selectable": is_selectable,
    }


def get_category_names_by_ids(category_ids: list[int]) -> list[dict[str, Any]]:
    """
    Get category names from category IDs.

    Args:
        category_ids: List of category IDs (e.g., [1, 2, 6])

    Returns:
        List of category objects with id, slug, and name.
    """
    from .data.category_hierarchy import get_category_path_by_id

    result = []
    for category_id in category_ids:
        category_path = get_category_path_by_id(category_id)
        if not category_path:
            continue

        # Extract the last part of the path as the category slug
        category_slug = category_path.split("/")[-1]
        name = category_slug.replace("_", " ").title()

        result.append(
            {
                "id": category_id,
                "slug": category_slug,
                "name": name,
            }
        )

    return result


def get_product_by_id(
    product_id: int, season: str = "summer"
) -> dict[str, Any] | None:
    """
    Get a single product by ID with seasonal metrics.

    Args:
        product_id: Product ID
        season: Season to use for metrics

    Returns:
        Product dict with all metrics merged, or None if not found
    """
    # Search through all products
    all_products_by_path = _flatten_products_by_category(PRODUCTS_BY_CATEGORY)

    for products in all_products_by_path.values():
        for product in products:
            if product["id"] == product_id:
                # Get base metrics
                base_metrics = PRODUCT_BASE_METRICS.get(product_id, {})

                # Get seasonal metrics
                seasonal_metrics = PRODUCT_SEASONAL_METRICS.get(product_id, {}).get(
                    season, {}
                )

                # Merge
                return {
                    **product,
                    **base_metrics,
                    **seasonal_metrics,
                }

    return None


def get_products_by_ids(
    product_ids: list[int], season: str = "summer"
) -> dict[int, dict[str, Any]]:
    """
    Get multiple products by IDs with seasonal metrics.

    Args:
        product_ids: List of product IDs
        season: Season to use for metrics

    Returns:
        Dict mapping product_id -> product data with all metrics and category merged
    """
    all_products_by_path = _flatten_products_by_category(PRODUCTS_BY_CATEGORY)

    result = {}
    product_ids_set = set(product_ids)

    for category_path, products in all_products_by_path.items():
        for product in products:
            product_id = product.get("id")
            if product_id in product_ids_set:
                # Get base metrics
                base_metrics = PRODUCT_BASE_METRICS.get(product_id, {})

                # Get seasonal metrics
                seasonal_metrics = PRODUCT_SEASONAL_METRICS.get(product_id, {}).get(
                    season, {}
                )

                # Merge and add category info
                result[product_id] = {
                    **product,
                    **base_metrics,
                    **seasonal_metrics,
                    "category": category_path,
                }

                # Early exit if we found all products
                if len(result) == len(product_ids):
                    return result

    return result
