"""
Category hierarchy definitions.
Maps flat categories from old approach to hierarchical structure.
"""

# Category hierarchy mapping (for reference and navigation)
CATEGORY_HIERARCHY = {
    # Meat categories
    "beef": {"path": "fresh > meat > beef", "level": 2},
    "pork": {"path": "fresh > meat > pork", "level": 2},
    "poultry": {"path": "fresh > meat > poultry", "level": 2},
    "lamb": {"path": "fresh > meat > lamb", "level": 2},
    "sausage": {"path": "fresh > meat > sausage", "level": 2},
    # Seafood
    "seafood": {"path": "fresh > seafood", "level": 1},
    # Produce (new)
    "fruits": {"path": "fresh > produce > fruits", "level": 2},
    "vegetables": {"path": "fresh > produce > vegetables", "level": 2},
}


# Helper to get category path
def get_category_path(category_slug):
    """Get full category path for a category slug."""
    return CATEGORY_HIERARCHY.get(category_slug, {}).get("path", category_slug)
