"""
URL configuration for products app.
"""

from django.urls import path

from . import views

urlpatterns = [
    # New unified endpoint - simple path-based approach (MUST come first to avoid conflicts)
    path("categories/path/", views.get_children_by_path, name="get-children-by-path"),
    path(
        "categories/path/<path:path>/",
        views.get_children_by_path,
        name="get-children-by-path-with-path",
    ),
    # Leaf categories endpoint (for planogram creation)
    path("categories/leaf/", views.list_leaf_categories, name="list-leaf-categories"),
    # Old endpoints (kept for backward compatibility)
    path(
        "categories/", views.list_top_level_categories, name="list-top-level-categories"
    ),
    path(
        "categories/by-ids/", views.get_categories_by_ids, name="get-categories-by-ids"
    ),
    path(
        "categories/<str:parent_slug>/",
        views.list_subcategories,
        name="list-subcategories",
    ),
    path(
        "categories/<str:parent_slug>/<str:tab_slug>/",
        views.list_selectable_categories,
        name="list-selectable-categories",
    ),
    # Old unified endpoint (kept for backward compatibility)
    path(
        "categories/children/",
        views.get_children_by_category_id,
        name="get-children-top-level",
    ),
    path(
        "categories/<int:category_id>/children/",
        views.get_children_by_category_id,
        name="get-children-by-category-id",
    ),
    # Products
    path(
        "category/<int:category_id>/products/",
        views.get_products_by_category,
        name="get-products-by-category",
    ),
    path(
        "products/by-categories/",
        views.get_products_by_category_ids,
        name="get-products-by-category-ids",
    ),
]
