 Implementation Plan: Improve "Add Products" with Gap-Filling

  Current Behavior (Problem)

  - Products are placed starting from the rightmost position in the target row
  - When grid width is exceeded, wraps to a new sub-row starting from x=0
  - Does NOT check for empty spaces/gaps in existing rows
  - This causes unnecessary new rows even when gaps exist

  Desired Behavior (Solution)

  Based on your requirements:

  1. Fill ALL gaps in existing rows (left to right) before extending right
  2. Continue from rightmost position after gaps are filled
  3. Check ALL sub-rows for gaps before creating a new sub-row
  4. Simple placement: If a product doesn't fit in a gap, place it in the next available position

  Algorithm Design

  Step 1: Find All Gaps
  - Scan through all items in the target row and its sub-rows
  - For each y-level (target_row_id and all sub-rows), find empty spaces
  - Build a list of gaps: [{x: start_position, width: gap_width, y: row_level}, ...]
  - Sort gaps by y (row level), then by x (left to right)

  Step 2: Fill Gaps
  - For each product to place:
    - Try to fit it in the first available gap (left to right, top to bottom)
    - If it fits, place it and update the gap list
    - If it doesn't fit in any gap, add it to "remaining products" list

  Step 3: Continue from Rightmost
  - For remaining products that didn't fit in gaps:
    - Find the rightmost position in the lowest sub-row
    - Place products from there
    - Wrap to new sub-row when needed

  Code Changes

  File: planograms/services/grid_service.py

  New Function (around line 365):
  def find_gaps_in_row(row_items, target_row_id, cols):
      """
      Find all gaps in a row and its sub-rows.
      Returns list of {x, width, y} sorted by y, then x.
      """

  Updated Function (add_products_to_layout, line 366):
  - Add gap detection before placing products
  - Try to place in gaps first
  - Then continue with current logic for remaining products

  Logging Strategy

  Add detailed logging to track algorithm execution:

  Log Points:
  1. Initial state: Log target row, number of products to add, current row state
  2. Gap detection: Log all found gaps with positions and widths
  3. Gap filling: Log each product placed in a gap (product ID, gap position, product width)
  4. Remaining products: Log products that didn't fit in gaps
  5. Final placement: Log products placed from rightmost position
  6. Summary: Log total products placed, gaps filled, new sub-rows created

  Log Level: Use logger.info() for main steps, logger.debug() for detailed positions

  Testing Strategy

  File: planograms/tests/test_grid_service.py (or create if doesn't exist)

  Test Cases:

  1. Test: Fill single gap
    - Setup: Row with items at x=0-2 and x=5-7 (gap at x=3-4, width=2)
    - Add: 1 product with width=1
    - Expected: Product placed at x=3
  2. Test: Fill multiple gaps
    - Setup: Row with gaps at x=2-3, x=6-8 (widths: 1, 2)
    - Add: 2 products (width=1 each)
    - Expected: Products at x=2, x=6
  3. Test: Product too wide for gap
    - Setup: Row with gap at x=3-4 (width=1)
    - Add: 1 product with width=2
    - Expected: Product placed from rightmost position
  4. Test: Fill gaps in sub-rows
    - Setup: Row with items at y=0 and y=1, gaps in both
    - Add: Products
    - Expected: Gaps in y=0 filled first, then y=1
  5. Test: No gaps, continue from right
    - Setup: Fully packed row with no gaps
    - Add: Products
    - Expected: Products placed from rightmost position or new sub-row
  6. Test: Empty row
    - Setup: Empty row
    - Add: Products
    - Expected: Products placed from x=0

  Benefits

  - ✅ Fills empty spaces efficiently
  - ✅ Reduces unnecessary new rows
  - ✅ Better visual layout
  - ✅ Respects user's manual edits (fills gaps they created)
  - ✅ Detailed logging for debugging and verification
  - ✅ Comprehensive tests ensure correctness
