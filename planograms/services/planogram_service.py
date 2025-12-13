"""Service for planogram business logic."""

import logging
from decimal import Decimal
from typing import Any

from displays.models import Display
from planograms.models import Planogram
from planograms.services.grid_service import compute_grid_geometry, layout_by_score
from planograms.services.product_service import get_products_for_season_and_categories
from planograms.services.validation import parse_planogram_params

logger = logging.getLogger(__name__)


def get_or_compute_layout(planogram: Planogram) -> dict[str, Any] | None:
    """Get saved layout or compute new one.

    Args:
        planogram: Planogram instance

    Returns:
        Layout dictionary or None if computation fails
    """
    if planogram.preserve_layout and planogram.layout:
        try:
            return _convert_saved_layout_to_response(planogram)
        except Exception as e:
            logger.error(f"Error using saved layout: {str(e)}")

    try:
        return _compute_new_layout(planogram)
    except Exception as e:
        logger.error(f"Error computing layout: {str(e)}")
        return None


def _convert_saved_layout_to_response(planogram: Planogram) -> dict[str, Any]:
    """Convert saved layout format to response format."""
    saved_layout = planogram.layout
    rows = []

    for row_id, items in saved_layout.items():
        if not items:
            continue

        row_num = (
            int(row_id)
            if isinstance(row_id, (int, str)) and str(row_id).isdigit()
            else len(rows) + 1
        )

        categories_in_row = set()
        for item in items:
            if isinstance(item, dict) and "meta" in item:
                category = item["meta"].get("category")
                if category:
                    categories_in_row.add(category)

        category_labels = sorted(list(categories_in_row))
        category_label = ", ".join(category_labels) if category_labels else None

        rows.append(
            {
                "id": row_num,
                "category": category_label,
                "name": f"Shelf {row_num}",
                "items": items,
            }
        )

    params = parse_planogram_params(
        planogram.width_in,
        planogram.height_in,
        planogram.shelf_count,
        planogram.season,
        planogram.category_ids,
    )

    grid_geometry = compute_grid_geometry(
        shelf_width_in=params["shelf_width"],
        shelf_height_in=params["shelf_height"],
        row_count=params["row_count"],
    )

    return {"grid": grid_geometry, "rows": rows}


def _compute_new_layout(planogram: Planogram) -> dict[str, Any]:
    """Compute new layout for planogram."""
    params = parse_planogram_params(
        planogram.width_in,
        planogram.height_in,
        planogram.shelf_count,
        planogram.season,
        planogram.category_ids,
    )

    products_by_category = get_products_for_season_and_categories(
        season=params["season"], category_ids=params["category_ids"]
    )

    grid_geometry = compute_grid_geometry(
        shelf_width_in=params["shelf_width"],
        shelf_height_in=params["shelf_height"],
        row_count=params["row_count"],
    )

    return layout_by_score(
        products_by_category=products_by_category, grid=grid_geometry
    )


def auto_select_display(company: Any) -> Display | None:
    """Auto-select display: latest custom display or first standard display.

    Args:
        company: Company instance

    Returns:
        Display instance or None if no display found
    """
    custom_displays = Display.objects.filter(
        company=company, display_category="custom"
    ).order_by("-id")

    if custom_displays.exists():
        return custom_displays.first()

    standard_displays = Display.objects.filter(display_category="standard").order_by(
        "id"
    )

    if standard_displays.exists():
        return standard_displays.first()

    return None


def get_default_depth() -> Decimal:
    """Get default depth value for planogram."""
    return Decimal("24.00")
