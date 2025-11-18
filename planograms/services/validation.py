"""
Validation functions for planogram parameters.
"""
import logging

logger = logging.getLogger(__name__)


def parse_planogram_params(width_in, height_in, shelf_count, season, category_ids):
    """
    Parse and validate planogram parameters from dimensions and request data.
    Returns a dictionary with validated parameters.
    
    Args:
        width_in: Display width in inches
        height_in: Display height in inches
        shelf_count: Number of shelves
        season: Season string from request
        category_ids: List of category IDs from request
        
    Returns:
        dict: Dictionary containing:
            - shelf_width (float)
            - shelf_height (float)
            - row_count (int)
            - season (str)
            - category_ids (list[int])
    """
    # Validate dimensions - these should always be present
    if not width_in:
        raise ValueError("Planogram must have a width_in value")
    if not height_in:
        raise ValueError("Planogram must have a height_in value")
    if not shelf_count:
        raise ValueError("Planogram must have a shelf_count value")
    
    shelf_width = float(width_in)
    shelf_height = float(height_in)
    row_count = int(shelf_count)
    
    # Validate season
    valid_seasons = ['spring', 'summer', 'fall', 'winter']
    if not season:
        raise ValueError(f"Season is required and must be one of: {', '.join(valid_seasons)}")
    if not isinstance(season, str) or season.lower() not in valid_seasons:
        raise ValueError(f"Season must be one of: {', '.join(valid_seasons)}")
    season = season.lower()
    
    # Validate category_ids
    if not isinstance(category_ids, list) or len(category_ids) == 0:
        raise ValueError("category_ids must be a non-empty list")
    
    if not all(isinstance(cid, int) for cid in category_ids):
        raise ValueError("All category_ids must be integers")
    
    params = {
        'shelf_width': shelf_width,
        'shelf_height': shelf_height,
        'row_count': row_count,
        'season': season,
        'category_ids': category_ids,
    }
    
    # Log validated parameters
    logger.info("Planogram parameters (with defaults applied):")
    logger.info(f"  shelf_width: {shelf_width}")
    logger.info(f"  shelf_height: {shelf_height}")
    logger.info(f"  row_count: {row_count}")
    logger.info(f"  season: {season}")
    logger.info(f"  category_ids: {category_ids}")
    
    return params

