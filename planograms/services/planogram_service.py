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


def get_saved_layout(planogram: Planogram) -> dict[str, Any] | None:
    """Get saved layout from database.

    Args:
        planogram: Planogram instance

    Returns:
        Layout dictionary or None if no layout exists or conversion fails
    """
    if not planogram.layout:
        return None

    try:
        return _convert_saved_layout_to_response(planogram)
    except Exception as e:
        logger.error(f"Error converting saved layout: {str(e)}")
        return None


def compute_layout(planogram: Planogram) -> dict[str, Any] | None:
    """Compute fresh layout for planogram.

    Args:
        planogram: Planogram instance

    Returns:
        Layout dictionary or None if computation fails
    """
    try:
        return _compute_new_layout(planogram)
    except Exception as e:
        logger.error(f"Error computing layout: {str(e)}")
        return None


def _convert_saved_layout_to_response(planogram: Planogram) -> dict[str, Any]:
    """Convert saved layout format to response format."""
    saved_layout = planogram.layout

    # If saved layout already has the correct structure (grid + rows), ensure grid has all fields
    if isinstance(saved_layout, dict) and "grid" in saved_layout and "rows" in saved_layout:
        grid = saved_layout.get("grid", {})

        # Ensure grid has normalizedWidthIn and normalizedHeightIn
        if "normalizedWidthIn" not in grid or "normalizedHeightIn" not in grid:
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

            # Merge the computed fields into the existing grid
            grid["normalizedWidthIn"] = grid_geometry["normalizedWidthIn"]
            grid["normalizedHeightIn"] = grid_geometry["normalizedHeightIn"]

        return {"grid": grid, "rows": saved_layout["rows"]}

    # Otherwise, convert old format (dict of row_id -> items) to new format
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


def auto_select_display(company: Any) -> Display:
    """Auto-select display: latest custom display or first standard display.

    Args:
        company: Company instance

    Returns:
        Display instance

    Raises:
        ValueError: If no display is available for auto-selection
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

    raise ValueError(
        "No displays available for auto-selection. Please create at least one display."
    )


def get_default_depth() -> Decimal:
    """Get default depth value for planogram."""
    return Decimal("24.00")
