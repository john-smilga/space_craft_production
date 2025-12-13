"""
Grid geometry computation service functions.
"""

import logging
import math
from typing import Any

from products.data.category_hierarchy import get_category_color

logger = logging.getLogger(__name__)

CELL_WIDTH_IN = 6.0


def compute_grid_geometry(
    shelf_width_in: float,
    shelf_height_in: float,
    row_count: int,
    cell_width_in: float = CELL_WIDTH_IN,
) -> dict[str, float]:
    """
    Compute normalized grid geometry for the shelf.

    Args:
        shelf_width_in:  total shelf width in inches (e.g. 120)
        shelf_height_in: total shelf height in inches (used for metadata)
        row_count:       number of horizontal rows to display
        cell_width_in:   fixed cell width in inches (default 6)

    Returns:
        dict with cols, rows, cellWidthIn
    """
    width_in = min(max(shelf_width_in, 24), 240)
    height_in = min(max(shelf_height_in, 24), 96)
    rows_cnt = max(1, min(row_count, 10))

    cols = max(1, math.floor(width_in / cell_width_in))

    return {
        "cols": cols,
        "rows": rows_cnt,
        "cellWidthIn": cell_width_in,
        "normalizedWidthIn": width_in,
        "normalizedHeightIn": height_in,
    }


# ---------- helpers for ranking / normalization ----------


def _rank_categories(
    products_by_category: dict[str, list[dict[str, Any]]], method: str = "avg"
) -> list[tuple[str, float]]:
    ranked = []
    for cat, items in products_by_category.items():
        if not items:
            continue
        if method == "sum":
            score = sum(p.get("overall_score", 0.0) for p in items)
        else:
            score = sum(p.get("overall_score", 0.0) for p in items) / len(items)
        ranked.append((cat, score))
    ranked.sort(key=lambda t: t[1], reverse=True)
    return ranked


def _category_label(cat: str) -> str:
    # Title-case, but preserve common acronyms if you add later
    if not cat:
        return "Unknown"
    return cat.capitalize() if cat.islower() else cat


def _is_bulky(p: dict[str, Any]) -> bool:
    """Check if product is bulky (should go on bottom shelves)."""
    height = p.get("pack_height_in", 0.0)
    return height >= 5.0


# ---------- MAIN: layout using hardcoded pack_width_in ----------


def layout_by_score(
    products_by_category: dict[str, list[dict[str, Any]]],
    grid: dict[str, Any],
    *,
    rank_method: str = "avg",
    continuation: bool = False,
) -> dict[str, Any]:
    """
    Build an RGL-ready layout using EACH PRODUCT'S pack_width_in (required).

    NEW BEHAVIOR:
    - Categories are structured by columns: each row is divided into equal sections
      based on the number of categories, and each section is filled with products
      from its assigned category.
    - Product selection strategy:
      - Only unique products are placed within each row (no repetition within a row)
      - Each row gets different products from the same category
      - Products are sorted by margin (descending), then by score
      - Products are tracked per-row to ensure uniqueness within each row
    - Products WITHOUT `pack_width_in` are skipped.
    """
    # Use values from grid dict (already computed by compute_grid_geometry)
    cols = int(grid["cols"])
    rows_cnt = int(grid["rows"])
    cell_w = float(grid["cellWidthIn"])

    logger.info("=== layout_by_score CALLED ===")
    logger.info(f"Grid: cols={cols}, rows={rows_cnt}, cellWidthIn={cell_w}")
    logger.info(f"Categories received: {len(products_by_category)}")
    logger.info(f"Continuation mode: {continuation}")

    def width_cells_for(p: dict[str, Any]) -> int:
        w_in = p.get("pack_width_in", None)
        if w_in is None:
            return 0
        try:
            w_in = float(w_in)
            if w_in <= 0:
                return 0
            # Option 2: Items 0-6" = 1 cell, 6-12" = 1 cell, 12+ = floor-based
            if w_in < 12:
                return 1
            # For 12+ inches, use floor division (12" = 2 cells, 18" = 3 cells, etc.)
            return max(2, math.floor(w_in / cell_w))
        except Exception:
            return 0

    # Get ranked categories
    ranked = _rank_categories(products_by_category, method=rank_method)
    ranked_cats = [c for c, _ in ranked]
    num_categories = len(ranked_cats)

    # Log request details
    logger.info("=== LAYOUT REQUEST ===")
    logger.info(f"Rows requested: {rows_cnt}")
    logger.info(f"Categories provided: {num_categories}")
    logger.info(f"Category names: {list(products_by_category.keys())}")
    logger.info(f"Ranked categories: {ranked_cats}")
    logger.info(
        f"Items per category: {[(cat, len(items)) for cat, items in products_by_category.items()]}"
    )

    if num_categories == 0:
        # No categories - return empty rows
        rows_payload = []
        for r in range(rows_cnt):
            rows_payload.append(
                {"id": r + 1, "category": None, "name": f"Shelf {r + 1}", "items": []}
            )
        return {
            "grid": {"cols": cols, "rows": rows_cnt, "cellWidthIn": cell_w},
            "rows": rows_payload,
        }

    # Calculate column boundaries for each category
    # Divide the row width equally among categories
    cols_per_category = cols // num_categories
    remainder = cols % num_categories

    category_column_ranges = []
    start_col = 0
    for i, cat in enumerate(ranked_cats):
        # Distribute remainder to first categories
        category_cols = cols_per_category + (1 if i < remainder else 0)
        end_col = start_col + category_cols
        category_column_ranges.append(
            {
                "category": cat,
                "start_col": start_col,
                "end_col": end_col,
                "cols": category_cols,
            }
        )
        logger.info(
            f"Category '{cat}' assigned columns {start_col} to {end_col-1} ({category_cols} cols)"
        )
        start_col = end_col

    # Determine which rows allow bulky items (bottom 2 rows)
    BULKY_ALLOWED_FROM_ROW = 2

    # Prepare products for each category (sorted by score)
    all_items_by_category = {}
    for cat in ranked_cats:
        items = sorted(
            products_by_category.get(cat, []),
            key=lambda p: p.get("overall_score", 0.0),
            reverse=True,
        )
        all_items_by_category[cat] = items

    # Build rows with column-based category structure
    rows_payload = []

    # Track which products have been used across ALL rows (global tracking)
    used_product_ids_global = set()

    # Identify the highest scoring product per category for repetition (can appear 2 times)
    highest_score_products_per_category = {}
    for cat in ranked_cats:
        category_items = all_items_by_category[cat]
        if category_items:
            # Sort by score (descending) to find highest
            sorted_by_score = sorted(
                category_items, key=lambda p: p.get("overall_score", 0.0), reverse=True
            )
            highest_score_products_per_category[cat] = sorted_by_score[0].get("id")
            logger.info(
                f"Category '{cat}' highest score product ID: {highest_score_products_per_category[cat]}"
            )

    # Track how many times highest score products have been used globally
    highest_score_product_counts = {
        cat: 0 for cat in highest_score_products_per_category.keys()
    }

    for r in range(rows_cnt):
        allow_bulky = r >= BULKY_ALLOWED_FROM_ROW
        row_items = []

        # Track which products have been used in THIS row only (for uniqueness within row)
        used_product_ids_in_row = set()

        logger.info(f"Filling row {r+1}, allow_bulky={allow_bulky}")

        # Fill each category's column section
        for cat_range in category_column_ranges:
            cat = cat_range["category"]
            section_start = cat_range["start_col"]
            section_end = cat_range["end_col"]

            cursor_x = section_start
            category_items = all_items_by_category[cat]

            # Get the highest score product ID for this category
            highest_score_product_id = highest_score_products_per_category.get(cat)

            # Track if highest score product has been placed in this row (for side-by-side placement)
            highest_score_placed_in_row = False
            highest_score_first_x = None

            # Fill section with unique products (unique within this row AND globally)
            # But allow highest score product to appear once more (2 times total, side by side)
            placed_this_iteration = True
            while placed_this_iteration and cursor_x < section_end:
                placed_this_iteration = False

                # Recalculate available products each iteration
                available_products = []
                for p in category_items:
                    product_id = p.get("id")

                    # For highest score product: allow if used globally less than 2 times
                    # AND allow it to appear twice in the same row (for side-by-side placement)
                    if product_id == highest_score_product_id:
                        if highest_score_product_counts[cat] < 2:
                            # Check if already placed in this row
                            if highest_score_placed_in_row:
                                # Allow second placement only if we can place it right after the first
                                # (this will be handled by the placement logic below)
                                available_products.append(p)
                            else:
                                # First placement in this row
                                available_products.append(p)
                    else:
                        # For other products: skip if used in this row
                        if product_id in used_product_ids_in_row:
                            continue
                        # Only if not used globally
                        if product_id not in used_product_ids_global:
                            available_products.append(p)

                # Special handling: if highest score product was just placed, prioritize placing it again immediately
                if (
                    highest_score_placed_in_row
                    and highest_score_product_id
                    and highest_score_product_counts[cat] < 2
                ):
                    # Find the highest score product in available_products
                    highest_score_product = next(
                        (
                            p
                            for p in available_products
                            if p.get("id") == highest_score_product_id
                        ),
                        None,
                    )
                    if highest_score_product:
                        # Remove it from the list
                        available_products.remove(highest_score_product)
                        # Sort other products first
                        available_products.sort(
                            key=lambda p: (
                                p.get("margin", 0.0),
                                p.get("overall_score", 0.0),
                            ),
                            reverse=True,
                        )
                        # Put highest score product at the very front to ensure it's placed next
                        available_products.insert(0, highest_score_product)
                else:
                    # Sort available products by margin (descending), then by score
                    available_products.sort(
                        key=lambda p: (
                            p.get("margin", 0.0),
                            p.get("overall_score", 0.0),
                        ),
                        reverse=True,
                    )

                # If no available products, stop trying
                if not available_products:
                    break

                for p in available_products:
                    # Skip bulky items on top shelves
                    if _is_bulky(p) and not allow_bulky:
                        continue

                    w_cells = width_cells_for(p)
                    if w_cells <= 0:
                        continue

                    # Check if product fits in remaining section space
                    if cursor_x + w_cells <= section_end:
                        product_id = p.get("id")
                        row_items.append(
                            {
                                "i": f"{product_id}-{r}-{cat}-{cursor_x}",
                                "x": cursor_x,
                                "y": r,
                                "w": w_cells,
                                "h": 1,
                                "meta": {
                                    "id": product_id,
                                    "name": p.get("name"),
                                    "category": cat,
                                    "color": get_category_color(cat),
                                    "score": p.get("overall_score", 0.0),
                                    "pack_width_in": p.get("pack_width_in"),
                                    "pack_height_in": p.get("pack_height_in"),
                                },
                            }
                        )
                        cursor_x += w_cells

                        # Track globally
                        if product_id == highest_score_product_id:
                            highest_score_product_counts[cat] += 1
                            # Track first placement in this row for side-by-side logic
                            if not highest_score_placed_in_row:
                                highest_score_placed_in_row = True
                                highest_score_first_x = (
                                    cursor_x - w_cells
                                )  # Store the x position where it was placed
                            # Only add to global set after 2 uses
                            if highest_score_product_counts[cat] >= 2:
                                used_product_ids_global.add(product_id)
                        else:
                            used_product_ids_in_row.add(product_id)
                            used_product_ids_global.add(product_id)

                        placed_this_iteration = True
                        break  # Restart from beginning to find next fitting item

        # Determine category label for this row (all categories present)
        category_labels = sorted([_category_label(cat) for cat in ranked_cats])
        category_label = ", ".join(category_labels) if category_labels else None

        row = {
            "id": r + 1,
            "category": category_label,
            "name": f"Shelf {r + 1}",
            "items": row_items,
        }

        logger.info(f"Row {r+1} result: {len(row_items)} items placed")
        rows_payload.append(row)

    # Final verification logging
    logger.info("=== FINAL VERIFICATION ===")
    logger.info(f"Requested rows: {rows_cnt}, Categories: {num_categories}")
    logger.info(f"Rows returned: {len(rows_payload)}")
    total_items_placed = sum(len(row.get("items", [])) for row in rows_payload)
    logger.info(f"Total items placed: {total_items_placed}")

    return {
        "grid": {"cols": cols, "rows": rows_cnt, "cellWidthIn": cell_w},
        "rows": rows_payload,
    }
