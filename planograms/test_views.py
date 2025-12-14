"""Tests for planograms views - API response shapes."""

import pytest
from rest_framework import status

from factories import (
    CompanyFactory,
    DisplayFactory,
    PlanogramFactory,
    ProjectFactory,
    UserFactory,
)


@pytest.mark.django_db
class TestPlanogramCreate:
    """Tests for planogram create endpoint."""

    def test_create_planogram_includes_layout(
        self, authenticated_client, company, user, assert_matches_schema
    ):
        """Test that create returns planogram with layout field."""
        project = ProjectFactory(company=company)
        display = DisplayFactory(company=company)

        response = authenticated_client.post(
            "/api/planograms/",
            {
                "name": "Test Planogram",
                "project": project.id,
                "display": display.id,
                "category_ids": [1, 2],  # Required field
            },
            format="json",
        )

        assert response.status_code == status.HTTP_201_CREATED
        assert_matches_schema(response)  # Validate against OpenAPI schema

        # Verify response shape (now covered by schema, but kept for clarity)
        assert "layout" in response.data  # KEY: layout must be included

        # Verify layout structure
        layout = response.data["layout"]
        assert "grid" in layout
        assert "rows" in layout
        assert "cols" in layout["grid"]
        assert "rows" in layout["grid"]
        assert "cellWidthIn" in layout["grid"]

    def test_create_planogram_without_display_includes_layout(
        self, authenticated_client, company
    ):
        """Test that create without explicit display still returns layout."""
        project = ProjectFactory(company=company)
        # Create a standard display for auto-selection (company=None makes it standard)
        DisplayFactory(company=None, display_category="standard")

        response = authenticated_client.post(
            "/api/planograms/",
            {
                "name": "Test Planogram",
                "project": project.id,
                "category_ids": [1, 2],  # Required field
            },
            format="json",
        )

        assert response.status_code == status.HTTP_201_CREATED
        assert "layout" in response.data


@pytest.mark.django_db
class TestPlanogramRetrieve:
    """Tests for planogram retrieve endpoint."""

    def test_retrieve_planogram_includes_layout(
        self, authenticated_client, company, assert_matches_schema
    ):
        """Test that retrieve returns planogram with layout field."""
        planogram = PlanogramFactory(company=company)

        response = authenticated_client.get(f"/api/planograms/{planogram.slug}/")

        assert response.status_code == status.HTTP_200_OK
        assert_matches_schema(response)  # Validate against OpenAPI schema

        # Verify layout structure (field presence is validated by schema)
        assert "layout" in response.data  # KEY: layout must be included
        layout = response.data["layout"]
        assert "grid" in layout
        assert "rows" in layout


@pytest.mark.django_db
class TestPlanogramUpdate:
    """Tests for planogram update endpoint."""

    def test_update_planogram_includes_layout(self, authenticated_client, company):
        """Test that update returns planogram with layout field."""
        planogram = PlanogramFactory(company=company)

        response = authenticated_client.patch(
            f"/api/planograms/{planogram.slug}/",
            {"name": "Updated Name"},
            format="json",
        )

        assert response.status_code == status.HTTP_200_OK

        # Verify response shape
        assert "id" in response.data
        assert "name" in response.data
        assert response.data["name"] == "Updated Name"
        assert "layout" in response.data  # KEY: layout must be included

        # Verify layout structure
        layout = response.data["layout"]
        assert "grid" in layout
        assert "rows" in layout


@pytest.mark.django_db
class TestPlanogramCreateErrorFormat:
    """Tests for planogram create error responses."""

    def test_create_without_display_when_none_exists(
        self, authenticated_client, company
    ):
        """Test standardized error format when no display is available."""
        from displays.models import Display

        project = ProjectFactory(company=company)

        # Ensure no displays exist for this company or as standard displays
        Display.objects.filter(company=company).delete()
        Display.objects.filter(company__isnull=True).delete()

        response = authenticated_client.post(
            "/api/planograms/",
            {
                "name": "Test Planogram",
                "project": project.id,
                "category_ids": [1, 2],  # Required field
            },
            format="json",
        )

        assert response.status_code == status.HTTP_404_NOT_FOUND

        # Verify standardized error format
        assert "error" in response.data
        assert "code" in response.data["error"]
        assert "message" in response.data["error"]
        assert response.data["error"]["code"] == "not_found"
        assert "display" in response.data["error"]["message"].lower()


@pytest.mark.django_db
class TestPlanogramResponseConsistency:
    """Tests that all CRUD operations return consistent response shapes."""

    def test_create_retrieve_update_have_same_shape(
        self, authenticated_client, company
    ):
        """Test that create, retrieve, and update all return the same shape."""
        project = ProjectFactory(company=company)
        display = DisplayFactory(company=company)

        # Create
        create_response = authenticated_client.post(
            "/api/planograms/",
            {
                "name": "Test Planogram",
                "project": project.id,
                "display": display.id,
                "category_ids": [1, 2],  # Required field
            },
            format="json",
        )
        assert create_response.status_code == status.HTTP_201_CREATED
        create_keys = set(create_response.data.keys())

        # Retrieve
        planogram_slug = create_response.data["slug"]
        retrieve_response = authenticated_client.get(
            f"/api/planograms/{planogram_slug}/"
        )
        assert retrieve_response.status_code == status.HTTP_200_OK
        retrieve_keys = set(retrieve_response.data.keys())

        # Update
        update_response = authenticated_client.patch(
            f"/api/planograms/{planogram_slug}/",
            {"name": "Updated Name"},
            format="json",
        )
        assert update_response.status_code == status.HTTP_200_OK
        update_keys = set(update_response.data.keys())

        # Core keys that should always be present
        core_keys = {
            "id",
            "name",
            "slug",
            "season",
            "project",
            "display",
            "layout",
            "category_ids",
            "categories",
            "width_in",
            "height_in",
            "shelf_count",
            "created_at",
            "updated_at",
        }

        # All three should have at least the core keys
        assert core_keys.issubset(create_keys)
        assert core_keys.issubset(retrieve_keys)
        assert core_keys.issubset(update_keys)

        # All three must include layout (the key assertion for this test)
        assert "layout" in create_keys
        assert "layout" in retrieve_keys
        assert "layout" in update_keys
