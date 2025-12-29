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

    def test_create_planogram_no_layout_in_response(
        self, authenticated_client, company, user, assert_matches_schema
    ):
        """Test that create returns planogram without layout field."""
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

        # Verify layout is NOT in response (fetch separately via GET /layout/)
        assert "layout" not in response.data
        assert "id" in response.data
        assert "name" in response.data

    def test_create_planogram_without_display_no_layout_in_response(
        self, authenticated_client, company
    ):
        """Test that create without explicit display does not return layout."""
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
        assert "layout" not in response.data


@pytest.mark.django_db
class TestPlanogramRetrieve:
    """Tests for planogram retrieve endpoint."""

    def test_retrieve_planogram_no_layout_in_response(
        self, authenticated_client, company, assert_matches_schema
    ):
        """Test that retrieve returns planogram without layout field."""
        planogram = PlanogramFactory(company=company)

        response = authenticated_client.get(f"/api/planograms/{planogram.slug}/")

        assert response.status_code == status.HTTP_200_OK
        assert_matches_schema(response)  # Validate against OpenAPI schema

        # Verify layout is NOT in response (fetch separately via GET /layout/)
        assert "layout" not in response.data
        assert "id" in response.data
        assert "name" in response.data


@pytest.mark.django_db
class TestPlanogramUpdate:
    """Tests for planogram update endpoint."""

    def test_update_planogram_no_layout_in_response(self, authenticated_client, company):
        """Test that update returns planogram without layout field."""
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
        assert "layout" not in response.data  # Layout NOT in response


@pytest.mark.django_db
class TestPlanogramCreateErrorFormat:
    """Tests for planogram create error responses."""

    def test_create_without_display_when_none_exists(
        self, authenticated_client, company
    ):
        """Test error when no display is available for auto-selection."""
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

        # auto_select_display now raises ValueError (HTTP 500)
        assert response.status_code == status.HTTP_500_INTERNAL_SERVER_ERROR


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

        # Core keys that should always be present (no layout)
        core_keys = {
            "id",
            "name",
            "slug",
            "season",
            "project",
            "display",
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

        # Layout should NOT be in responses (fetch separately)
        assert "layout" not in create_keys
        assert "layout" not in retrieve_keys
        assert "layout" not in update_keys
