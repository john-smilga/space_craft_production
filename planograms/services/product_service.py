"""
Product-related service functions for planogram layout.
Converts category IDs to category names and gets products.
"""
from products.services import get_products_for_categories
from products.data.category_hierarchy import get_category_path_by_id
import logging

logger = logging.getLogger(__name__)


def get_products_for_season_and_categories(season, category_ids):
    """
    Get products filtered by season and category IDs.
    Converts category IDs to category names and returns products grouped by category name.
    
    Args:
        season (str): Season name (spring, summer, fall, winter)
        category_ids (list[int]): List of category IDs (e.g., [1, 2, 6])
        
    Returns:
        dict: Dictionary with category names (slug) as keys and lists of product dictionaries as values
    """
    # Get products by category ID (returns dict mapping category_id -> products)
    products_by_category_id = get_products_for_categories(category_ids, season=season)
    
    # Convert to category name (slug) based mapping
    products_by_category = {}
    
    for category_id, products in products_by_category_id.items():
        # Get category path from ID (e.g., "fresh/meat/beef")
        category_path = get_category_path_by_id(category_id)
        if not category_path:
            logger.warning(f"Category ID {category_id} not found in hierarchy")
            continue
        
        # Extract the last part of the path as the category slug (e.g., "beef" from "fresh/meat/beef")
        category_slug = category_path.split('/')[-1]
        
        # Add products to the category
        products_by_category[category_slug] = products
    
    logger.info(f"Retrieved products for {len(products_by_category)} categories")
    for cat, items in products_by_category.items():
        logger.info(f"  {cat}: {len(items)} items")
    
    return products_by_category

