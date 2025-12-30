from django.test import TestCase

from planograms.services.grid_service import (
    add_products_to_layout,
    find_gaps_in_row,
)


class GapFillingTestCase(TestCase):
    """Tests for gap-filling algorithm in grid_service"""

    def setUp(self):
        """Set up common test data"""
        self.grid = {
            "cols": 10,
            "rows": 3,
            "cellWidthIn": 6.0,
        }

        # Sample product data
        self.product_data = {
            101: {
                "id": 101,
                "name": "Product 101",
                "pack_width_in": 6.0,  # 1 cell
                "pack_height_in": 3.0,
                "category": "test/category",
                "overall_score": 0.8,
            },
            102: {
                "id": 102,
                "name": "Product 102",
                "pack_width_in": 12.0,  # 2 cells
                "pack_height_in": 3.0,
                "category": "test/category",
                "overall_score": 0.7,
            },
            103: {
                "id": 103,
                "name": "Product 103",
                "pack_width_in": 6.0,  # 1 cell
                "pack_height_in": 3.0,
                "category": "test/category",
                "overall_score": 0.6,
            },
        }

    def test_fill_single_gap(self):
        """Test: Fill single gap in row"""
        # Setup: Row with items at x=0-2 and x=5-7 (gap at x=3-4, width=2)
        layout = {
            "grid": self.grid,
            "rows": [
                {
                    "id": 1,
                    "category": "Test",
                    "name": "Shelf 1",
                    "items": [
                        {"i": "1-0-a", "x": 0, "y": 0, "w": 3, "h": 1, "meta": {}},
                        {"i": "2-0-b", "x": 5, "y": 0, "w": 3, "h": 1, "meta": {}},
                    ],
                }
            ],
        }

        # Add: 1 product with width=1
        products_to_add = [{"id": 101, "quantity": 1}]

        result = add_products_to_layout(
            layout, 0, products_to_add, self.product_data
        )

        # Expected: Product placed at x=3 (in the gap)
        new_items = [item for item in result["rows"][0]["items"] if item["i"].startswith("101")]
        self.assertEqual(len(new_items), 1)
        self.assertEqual(new_items[0]["x"], 3)
        self.assertEqual(new_items[0]["y"], 0)
        self.assertEqual(new_items[0]["w"], 1)

    def test_fill_multiple_gaps(self):
        """Test: Fill multiple gaps in row"""
        # Setup: Row with gaps at x=2-3 and x=6-7 (widths: 1 each)
        layout = {
            "grid": self.grid,
            "rows": [
                {
                    "id": 1,
                    "category": "Test",
                    "name": "Shelf 1",
                    "items": [
                        {"i": "1-0-a", "x": 0, "y": 0, "w": 2, "h": 1, "meta": {}},
                        {"i": "2-0-b", "x": 3, "y": 0, "w": 3, "h": 1, "meta": {}},
                        {"i": "3-0-c", "x": 7, "y": 0, "w": 2, "h": 1, "meta": {}},
                    ],
                }
            ],
        }

        # Add: 2 products (width=1 each)
        products_to_add = [{"id": 101, "quantity": 2}]

        result = add_products_to_layout(
            layout, 0, products_to_add, self.product_data
        )

        # Expected: Products at x=2 and x=6 (filling both gaps)
        new_items = [item for item in result["rows"][0]["items"] if item["i"].startswith("101")]
        self.assertEqual(len(new_items), 2)
        positions = sorted([item["x"] for item in new_items])
        self.assertEqual(positions, [2, 6])

    def test_product_too_wide_for_gap(self):
        """Test: Product too wide for gap, placed from rightmost"""
        # Setup: Row with gap at x=3-4 (width=1)
        layout = {
            "grid": self.grid,
            "rows": [
                {
                    "id": 1,
                    "category": "Test",
                    "name": "Shelf 1",
                    "items": [
                        {"i": "1-0-a", "x": 0, "y": 0, "w": 3, "h": 1, "meta": {}},
                        {"i": "2-0-b", "x": 4, "y": 0, "w": 3, "h": 1, "meta": {}},
                    ],
                }
            ],
        }

        # Add: 1 product with width=2 (too wide for gap of width=1)
        products_to_add = [{"id": 102, "quantity": 1}]

        result = add_products_to_layout(
            layout, 0, products_to_add, self.product_data
        )

        # Expected: Product placed from rightmost position (x=7), not in gap
        new_items = [item for item in result["rows"][0]["items"] if item["i"].startswith("102")]
        self.assertEqual(len(new_items), 1)
        self.assertEqual(new_items[0]["x"], 7)
        self.assertEqual(new_items[0]["w"], 2)

    def test_fill_gaps_in_sub_rows(self):
        """Test: Fill gaps in sub-rows (y=0 first, then y=1)"""
        # Setup: Row with small gap in y=0 and larger gap in y=1
        layout = {
            "grid": self.grid,
            "rows": [
                {
                    "id": 1,
                    "category": "Test",
                    "name": "Shelf 1",
                    "items": [
                        # y=0: gap at x=2 (width=1 only)
                        {"i": "1-0-a", "x": 0, "y": 0, "w": 2, "h": 1, "meta": {}},
                        {"i": "2-0-b", "x": 3, "y": 0, "w": 7, "h": 1, "meta": {}},
                        # y=1: gap at x=3-4 (width=2)
                        {"i": "3-1-a", "x": 0, "y": 1, "w": 3, "h": 1, "meta": {}},
                        {"i": "4-1-b", "x": 5, "y": 1, "w": 5, "h": 1, "meta": {}},
                    ],
                }
            ],
        }

        # Add: 2 products (width=1 each)
        products_to_add = [{"id": 101, "quantity": 2}]

        result = add_products_to_layout(
            layout, 0, products_to_add, self.product_data
        )

        # Expected: First product at y=0, x=2; second at y=1, x=3
        new_items = sorted(
            [item for item in result["rows"][0]["items"] if item["i"].startswith("101")],
            key=lambda item: (item["y"], item["x"]),
        )
        self.assertEqual(len(new_items), 2)
        self.assertEqual(new_items[0]["y"], 0)
        self.assertEqual(new_items[0]["x"], 2)
        self.assertEqual(new_items[1]["y"], 1)
        self.assertEqual(new_items[1]["x"], 3)

    def test_no_gaps_continue_from_right(self):
        """Test: No gaps, products placed from rightmost"""
        # Setup: Fully packed row with no gaps
        layout = {
            "grid": self.grid,
            "rows": [
                {
                    "id": 1,
                    "category": "Test",
                    "name": "Shelf 1",
                    "items": [
                        {"i": "1-0-a", "x": 0, "y": 0, "w": 5, "h": 1, "meta": {}},
                        {"i": "2-0-b", "x": 5, "y": 0, "w": 5, "h": 1, "meta": {}},
                    ],
                }
            ],
        }

        # Add: 2 products
        products_to_add = [{"id": 101, "quantity": 2}]

        result = add_products_to_layout(
            layout, 0, products_to_add, self.product_data
        )

        # Expected: Products placed in new sub-row (y=1) starting from x=0
        new_items = [item for item in result["rows"][0]["items"] if item["i"].startswith("101")]
        self.assertEqual(len(new_items), 2)
        self.assertTrue(all(item["y"] == 1 for item in new_items))

    def test_empty_row(self):
        """Test: Empty row, products placed from x=0"""
        # Setup: Empty row
        layout = {
            "grid": self.grid,
            "rows": [
                {
                    "id": 1,
                    "category": "Test",
                    "name": "Shelf 1",
                    "items": [],
                }
            ],
        }

        # Add: 2 products
        products_to_add = [{"id": 101, "quantity": 2}]

        result = add_products_to_layout(
            layout, 0, products_to_add, self.product_data
        )

        # Expected: Products placed from x=0
        new_items = sorted(
            [item for item in result["rows"][0]["items"] if item["i"].startswith("101")],
            key=lambda item: item["x"],
        )
        self.assertEqual(len(new_items), 2)
        self.assertEqual(new_items[0]["x"], 0)
        self.assertEqual(new_items[0]["y"], 0)
        self.assertEqual(new_items[1]["x"], 1)
        self.assertEqual(new_items[1]["y"], 0)

    def test_find_gaps_in_row(self):
        """Test: find_gaps_in_row correctly identifies gaps"""
        # Setup: Row with multiple gaps
        row_items = [
            {"i": "1", "x": 0, "y": 0, "w": 2, "h": 1, "meta": {}},
            {"i": "2", "x": 4, "y": 0, "w": 2, "h": 1, "meta": {}},
            {"i": "3", "x": 2, "y": 1, "w": 3, "h": 1, "meta": {}},
        ]

        gaps = find_gaps_in_row(row_items, target_row_id=0, cols=10)

        # Expected gaps:
        # y=0: x=2-3 (width=2), x=6-9 (width=4)
        # y=1: x=0-1 (width=2), x=5-9 (width=5)
        self.assertEqual(len(gaps), 4)

        # Check y=0 gaps
        y0_gaps = [g for g in gaps if g["y"] == 0]
        self.assertEqual(len(y0_gaps), 2)
        self.assertEqual(y0_gaps[0], {"x": 2, "width": 2, "y": 0})
        self.assertEqual(y0_gaps[1], {"x": 6, "width": 4, "y": 0})

        # Check y=1 gaps
        y1_gaps = [g for g in gaps if g["y"] == 1]
        self.assertEqual(len(y1_gaps), 2)
        self.assertEqual(y1_gaps[0], {"x": 0, "width": 2, "y": 1})
        self.assertEqual(y1_gaps[1], {"x": 5, "width": 5, "y": 1})
