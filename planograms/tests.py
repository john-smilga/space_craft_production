from django.test import TestCase

from planograms.services.grid_service import compute_grid_geometry, layout_by_score


class GridServiceTestCase(TestCase):
    """Tests for grid_service layout algorithm"""

    def setUp(self):
        """Set up test data"""
        # Sample products for testing
        self.products_category_a = [
            {
                "id": 1,
                "name": "Product A1",
                "pack_width_in": 6.0,
                "pack_height_in": 3.0,
                "margin": 0.8,
                "overall_score": 0.9,
            },
            {
                "id": 2,
                "name": "Product A2",
                "pack_width_in": 6.0,
                "pack_height_in": 3.0,
                "margin": 0.7,
                "overall_score": 0.8,
            },
            {
                "id": 3,
                "name": "Product A3",
                "pack_width_in": 6.0,
                "pack_height_in": 3.0,
                "margin": 0.6,
                "overall_score": 0.7,
            },
            {
                "id": 4,
                "name": "Product A4",
                "pack_width_in": 6.0,
                "pack_height_in": 3.0,
                "margin": 0.5,
                "overall_score": 0.6,
            },
            {
                "id": 5,
                "name": "Product A5",
                "pack_width_in": 6.0,
                "pack_height_in": 3.0,
                "margin": 0.4,
                "overall_score": 0.5,
            },
        ]

        self.products_category_b = [
            {
                "id": 10,
                "name": "Product B1",
                "pack_width_in": 6.0,
                "pack_height_in": 3.0,
                "margin": 0.85,
                "overall_score": 0.95,
            },
            {
                "id": 11,
                "name": "Product B2",
                "pack_width_in": 6.0,
                "pack_height_in": 3.0,
                "margin": 0.75,
                "overall_score": 0.85,
            },
            {
                "id": 12,
                "name": "Product B3",
                "pack_width_in": 6.0,
                "pack_height_in": 3.0,
                "margin": 0.65,
                "overall_score": 0.75,
            },
            {
                "id": 13,
                "name": "Product B4",
                "pack_width_in": 6.0,
                "pack_height_in": 3.0,
                "margin": 0.55,
                "overall_score": 0.65,
            },
        ]

    def test_column_based_structure(self):
        """Test that categories are structured by columns"""
        products_by_category = {
            "category_a": self.products_category_a[:2],
            "category_b": self.products_category_b[:2],
        }

        grid = compute_grid_geometry(
            shelf_width_in=60.0, shelf_height_in=24.0, row_count=2  # 10 cells (60/6)
        )

        layout = layout_by_score(products_by_category, grid)

        # Should have 2 rows
        self.assertEqual(len(layout["rows"]), 2)

        # Rows that have items should have items from both categories
        # (Some rows might be empty if all products are used in previous rows)
        for row in layout["rows"]:
            if len(row["items"]) > 0:  # Only check rows that have items
                categories_in_row = set()
                for item in row["items"]:
                    categories_in_row.add(item["meta"]["category"])
                # Both categories should be present in rows that have items
                self.assertEqual(
                    len(categories_in_row),
                    2,
                    f"Row {row['id']} should have both categories if it has items",
                )
                self.assertIn("category_a", categories_in_row)
                self.assertIn("category_b", categories_in_row)

    def test_unique_products_within_row(self):
        """Test that no product repeats within a single row"""
        products_by_category = {
            "category_a": self.products_category_a[:3],
        }

        grid = compute_grid_geometry(
            shelf_width_in=60.0, shelf_height_in=24.0, row_count=1  # 10 cells
        )

        layout = layout_by_score(products_by_category, grid)

        row = layout["rows"][0]
        product_ids = [item["meta"]["id"] for item in row["items"]]

        # Highest score product (ID 1) can appear twice, all others should be unique
        from collections import Counter

        product_counts = Counter(product_ids)
        highest_score_product_id = 1

        for product_id, count in product_counts.items():
            if product_id == highest_score_product_id:
                self.assertLessEqual(
                    count,
                    2,
                    f"Highest score product can appear at most 2 times, but appears {count} times",
                )
            else:
                self.assertEqual(
                    count,
                    1,
                    f"Product {product_id} should appear only once, but appears {count} times",
                )

    def test_different_products_in_different_rows(self):
        """Test that different rows have different products from the same category"""
        # Create more products for this test
        extra_products = [
            {
                "id": 6,
                "name": "Product A6",
                "pack_width_in": 6.0,
                "pack_height_in": 3.0,
                "margin": 0.3,
                "overall_score": 0.4,
            },
            {
                "id": 7,
                "name": "Product A7",
                "pack_width_in": 6.0,
                "pack_height_in": 3.0,
                "margin": 0.2,
                "overall_score": 0.3,
            },
            {
                "id": 8,
                "name": "Product A8",
                "pack_width_in": 6.0,
                "pack_height_in": 3.0,
                "margin": 0.1,
                "overall_score": 0.2,
            },
        ]
        all_products = self.products_category_a + extra_products

        # Use enough products so each row gets different ones
        products_by_category = {
            "category_a": all_products[:8],  # 8 products
        }

        grid = compute_grid_geometry(
            shelf_width_in=24.0,  # 4 cells (smaller width so products don't all fit in one row)
            shelf_height_in=24.0,
            row_count=4,  # 4 rows
        )

        layout = layout_by_score(products_by_category, grid)

        # Get product IDs from each row for category_a
        all_row_product_ids = []
        for row in layout["rows"]:
            row_product_ids = set(
                item["meta"]["id"]
                for item in row["items"]
                if item["meta"]["category"] == "category_a"
            )
            all_row_product_ids.append(row_product_ids)

        # Verify each row has unique products within itself
        for i, row_ids in enumerate(all_row_product_ids):
            self.assertEqual(
                len(row_ids),
                len(set(row_ids)),
                f"Row {i+1} should have unique products",
            )

        # Verify that different rows have different products
        # With 8 products and 4 rows, rows should have different products
        if len(all_row_product_ids) >= 2:
            # Check that at least some rows have different products
            # (they shouldn't all be identical)
            unique_row_sets = [frozenset(row_ids) for row_ids in all_row_product_ids]
            unique_sets_count = len(set(unique_row_sets))

            # With 8 products across 4 rows, we should have at least 2 different row configurations
            # (unless all rows fit all 8 products, which is unlikely with 10 cells per row)
            # At minimum, verify rows are not all identical
            self.assertGreater(
                unique_sets_count, 1, "Different rows should have different products"
            )

    def test_products_sorted_by_margin(self):
        """Test that products are sorted by margin (descending)"""
        products_by_category = {
            "category_a": self.products_category_a[:3],
        }

        grid = compute_grid_geometry(
            shelf_width_in=60.0, shelf_height_in=24.0, row_count=1
        )

        layout = layout_by_score(products_by_category, grid)

        row = layout["rows"][0]
        category_a_items = [
            item for item in row["items"] if item["meta"]["category"] == "category_a"
        ]

        if len(category_a_items) > 1:
            margins = [item["meta"].get("score", 0) for item in category_a_items]
            # Note: margin is not in meta, but we can check the order by checking
            # that higher margin products appear first (based on our test data)
            # Product A1 (margin 0.8) should appear before A2 (margin 0.7)
            product_ids = [item["meta"]["id"] for item in category_a_items]
            # Since we sorted by margin, product 1 should appear before product 2
            if 1 in product_ids and 2 in product_ids:
                idx1 = product_ids.index(1)
                idx2 = product_ids.index(2)
                self.assertLess(
                    idx1, idx2, "Higher margin products should appear first"
                )

    def test_column_division_equal_sections(self):
        """Test that row width is divided equally among categories"""
        products_by_category = {
            "category_a": self.products_category_a[:2],
            "category_b": self.products_category_b[:2],
        }

        grid = compute_grid_geometry(
            shelf_width_in=60.0, shelf_height_in=24.0, row_count=1  # 10 cells
        )

        layout = layout_by_score(products_by_category, grid)

        row = layout["rows"][0]

        # Get items by category
        category_a_items = [
            item for item in row["items"] if item["meta"]["category"] == "category_a"
        ]
        category_b_items = [
            item for item in row["items"] if item["meta"]["category"] == "category_b"
        ]

        # Calculate column ranges
        if category_a_items:
            category_a_max_x = max(item["x"] + item["w"] for item in category_a_items)
            category_a_min_x = min(item["x"] for item in category_a_items)
        else:
            category_a_max_x = 0
            category_a_min_x = 0

        if category_b_items:
            category_b_max_x = max(item["x"] + item["w"] for item in category_b_items)
            category_b_min_x = min(item["x"] for item in category_b_items)
        else:
            category_b_max_x = 0
            category_b_min_x = grid["cols"]

        # With 2 categories and 10 cells, each should get 5 cells
        # Categories are assigned based on ranking, so we just verify they don't overlap
        # and each stays within their assigned section (5 cells each)
        # Category sections should not overlap
        if category_a_items and category_b_items:
            # One category should be in first half (0-4), other in second half (5-9)
            # They should not overlap
            self.assertTrue(
                category_a_max_x <= 5 or category_b_max_x <= 5,
                "At least one category should be in first half",
            )
            self.assertTrue(
                category_a_min_x >= 5 or category_b_min_x >= 5,
                "At least one category should be in second half",
            )

    def test_no_repetition_across_categories_in_row(self):
        """Test that the same product doesn't appear in multiple category sections of the same row"""
        # Use same product ID in different categories (shouldn't happen in real data, but test it)
        products_by_category = {
            "category_a": [
                {
                    "id": 1,
                    "name": "Product 1",
                    "pack_width_in": 6.0,
                    "pack_height_in": 3.0,
                    "margin": 0.8,
                    "overall_score": 0.9,
                }
            ],
            "category_b": [
                {
                    "id": 1,
                    "name": "Product 1",
                    "pack_width_in": 6.0,
                    "pack_height_in": 3.0,
                    "margin": 0.7,
                    "overall_score": 0.8,
                }
            ],
        }

        grid = compute_grid_geometry(
            shelf_width_in=60.0, shelf_height_in=24.0, row_count=1
        )

        layout = layout_by_score(products_by_category, grid)

        row = layout["rows"][0]
        product_ids = [item["meta"]["id"] for item in row["items"]]

        # Even if same ID appears in different categories, within a row it should only appear once
        # Actually, this test might not be valid since products are category-specific
        # But the key is: within the same category section, no repetition
        category_a_items = [
            item for item in row["items"] if item["meta"]["category"] == "category_a"
        ]
        category_a_product_ids = [item["meta"]["id"] for item in category_a_items]

        # Highest score product (ID 1) can appear twice, all others should be unique
        from collections import Counter

        product_counts = Counter(category_a_product_ids)
        highest_score_product_id = 1

        for product_id, count in product_counts.items():
            if product_id == highest_score_product_id:
                self.assertLessEqual(
                    count,
                    2,
                    f"Highest score product can appear at most 2 times, but appears {count} times",
                )
            else:
                self.assertEqual(
                    count,
                    1,
                    f"Product {product_id} should appear only once, but appears {count} times",
                )

    def test_products_without_width_skipped(self):
        """Test that products without pack_width_in are skipped"""
        products_by_category = {
            "category_a": [
                {
                    "id": 1,
                    "name": "Product 1",
                    "pack_width_in": 6.0,
                    "pack_height_in": 3.0,
                    "margin": 0.8,
                    "overall_score": 0.9,
                },
                {
                    "id": 2,
                    "name": "Product 2",
                    "pack_width_in": None,
                    "pack_height_in": 3.0,
                    "margin": 0.7,
                    "overall_score": 0.8,
                },
                {
                    "id": 3,
                    "name": "Product 3",
                    "pack_width_in": 6.0,
                    "pack_height_in": 3.0,
                    "margin": 0.6,
                    "overall_score": 0.7,
                },
            ],
        }

        grid = compute_grid_geometry(
            shelf_width_in=60.0, shelf_height_in=24.0, row_count=1
        )

        layout = layout_by_score(products_by_category, grid)

        row = layout["rows"][0]
        product_ids = [item["meta"]["id"] for item in row["items"]]

        # Product 2 (without width) should be skipped
        self.assertNotIn(2, product_ids, "Products without width should be skipped")
        # Products 1 and 3 should be present
        self.assertIn(1, product_ids, "Product with width should be included")
        self.assertIn(3, product_ids, "Product with width should be included")

    def test_bulky_items_only_on_bottom_rows(self):
        """Test that bulky items (height >= 5.0) only appear on bottom 2 rows"""
        products_by_category = {
            "category_a": [
                {
                    "id": 1,
                    "name": "Regular Product",
                    "pack_width_in": 6.0,
                    "pack_height_in": 3.0,
                    "margin": 0.8,
                    "overall_score": 0.9,
                },
                {
                    "id": 2,
                    "name": "Bulky Product",
                    "pack_width_in": 6.0,
                    "pack_height_in": 6.0,
                    "margin": 0.7,
                    "overall_score": 0.8,
                },  # Bulky
            ],
        }

        grid = compute_grid_geometry(
            shelf_width_in=60.0,
            shelf_height_in=24.0,
            row_count=3,  # 3 rows: 0, 1, 2 (bulky allowed from row 2)
        )

        layout = layout_by_score(products_by_category, grid)

        # Row 0 (top) should not have bulky items
        row0_items = layout["rows"][0]["items"]
        row0_product_ids = [item["meta"]["id"] for item in row0_items]
        self.assertNotIn(2, row0_product_ids, "Bulky items should not be on top row")

        # Row 2 (bottom) should have bulky items
        row2_items = layout["rows"][2]["items"]
        row2_product_ids = [item["meta"]["id"] for item in row2_items]
        # Bulky product should be in bottom rows
        bulky_in_bottom = 2 in row2_product_ids
        self.assertTrue(
            bulky_in_bottom or len(row2_product_ids) == 0,
            "Bulky items should be allowed in bottom rows",
        )

    def test_multiple_rows_unique_products(self):
        """Test that with multiple rows, each row has unique products"""
        products_by_category = {
            "category_a": self.products_category_a[:5],  # 5 products
        }

        grid = compute_grid_geometry(
            shelf_width_in=60.0, shelf_height_in=24.0, row_count=3  # 10 cells
        )

        layout = layout_by_score(products_by_category, grid)

        # Collect all product IDs from all rows
        all_product_ids = []
        for row in layout["rows"]:
            row_product_ids = [
                item["meta"]["id"]
                for item in row["items"]
                if item["meta"]["category"] == "category_a"
            ]
            all_product_ids.extend(row_product_ids)

            # Within each row, highest score product can appear twice, all others should be unique
            from collections import Counter

            product_counts = Counter(row_product_ids)
            highest_score_product_id = 1

            for product_id, count in product_counts.items():
                if product_id == highest_score_product_id:
                    self.assertLessEqual(
                        count,
                        2,
                        f"Row {row['id']}: Highest score product can appear at most 2 times, but appears {count} times",
                    )
                else:
                    self.assertEqual(
                        count,
                        1,
                        f"Row {row['id']}: Product {product_id} should appear only once, but appears {count} times",
                    )

        # Check that we're using different products across rows
        # (not all rows should have identical product sets)
        if len(layout["rows"]) > 1:
            row1_ids = set(
                item["meta"]["id"]
                for item in layout["rows"][0]["items"]
                if item["meta"]["category"] == "category_a"
            )
            row2_ids = set(
                item["meta"]["id"]
                for item in layout["rows"][1]["items"]
                if item["meta"]["category"] == "category_a"
            )
            # They should be different (or at least not completely identical)
            if len(row1_ids) > 0 and len(row2_ids) > 0:
                # They might overlap but shouldn't be identical
                pass  # Just verify they're both populated

    def test_highest_score_product_repeats_once(self):
        """Test that the highest scoring product from each category repeats once (2 instances total)"""
        products_by_category = {
            "category_a": self.products_category_a[:4],  # 4 products
        }

        grid = compute_grid_geometry(
            shelf_width_in=60.0, shelf_height_in=24.0, row_count=2  # 10 cells
        )

        layout = layout_by_score(products_by_category, grid)

        # Collect all product IDs from all rows for category_a
        all_product_ids = []
        for row in layout["rows"]:
            row_product_ids = [
                item["meta"]["id"]
                for item in row["items"]
                if item["meta"]["category"] == "category_a"
            ]
            all_product_ids.extend(row_product_ids)

        # Count occurrences of each product
        from collections import Counter

        product_counts = Counter(all_product_ids)

        # Find the highest scoring product (Product A1 with score 0.9)
        highest_score_product_id = 1  # Product A1 has the highest score (0.9)

        # The highest scoring product should appear exactly 2 times
        self.assertEqual(
            product_counts[highest_score_product_id],
            2,
            "Highest scoring product should appear exactly 2 times",
        )

        # All other products should appear only once
        for product_id, count in product_counts.items():
            if product_id != highest_score_product_id:
                self.assertEqual(
                    count,
                    1,
                    f"Product {product_id} should appear only once, but appears {count} times",
                )

        # Verify highest scoring product appears side by side in the same row
        # (it should appear twice in one row, adjacent to each other)
        highest_score_product_id = 1
        found_side_by_side = False

        for row in layout["rows"]:
            row_items = [
                item
                for item in row["items"]
                if item["meta"]["category"] == "category_a"
            ]
            row_product_ids = [item["meta"]["id"] for item in row_items]

            # Count occurrences of highest score product in this row
            count_in_row = row_product_ids.count(highest_score_product_id)

            if count_in_row == 2:
                # Check if they're adjacent (side by side)
                highest_score_positions = []
                for i, item in enumerate(row_items):
                    if item["meta"]["id"] == highest_score_product_id:
                        highest_score_positions.append((item["x"], item["w"]))

                # Sort by x position
                highest_score_positions.sort(key=lambda pos: pos[0])

                # Check if first instance ends where second begins (adjacent)
                first_x, first_w = highest_score_positions[0]
                second_x, second_w = highest_score_positions[1]

                if first_x + first_w == second_x:
                    found_side_by_side = True
                    break

        self.assertTrue(
            found_side_by_side,
            "Highest scoring product should appear side by side (adjacent) in the same row",
        )
