"""Tests for displays views."""

import pytest
from rest_framework import status

from factories import CompanyFactory, DisplayFactory, StandardDisplayFactory


@pytest.mark.django_db
class TestDisplayViewSetList:
    """Tests for DisplayViewSet list action."""

    def test_list_displays_includes_custom_and_standard(
        self, authenticated_client, company, user
    ):
        """Test listing displays includes both company custom and standard displays."""
        # Count existing standard displays from migrations
        from displays.models import Display

        existing_standards = Display.objects.filter(display_category="standard").count()

        # Company's custom displays
        DisplayFactory.create_batch(2, company=company, created_by=user)
        # Standard displays (available to all)
        StandardDisplayFactory.create_batch(3)

        response = authenticated_client.get("/api/displays/")

        assert response.status_code == status.HTTP_200_OK
        assert (
            response.data["count"] == 2 + 3 + existing_standards
        )  # 2 custom + 3 new standard + existing

    def test_list_displays_excludes_other_company_custom(
        self, authenticated_client, company, user
    ):
        """Test displays from other companies are not visible."""
        from displays.models import Display

        existing_standards = Display.objects.filter(display_category="standard").count()

        # Own company custom displays
        DisplayFactory.create_batch(2, company=company, created_by=user)
        # Other company custom displays
        other_company = CompanyFactory()
        DisplayFactory.create_batch(3, company=other_company)
        # Standard displays
        StandardDisplayFactory.create_batch(2)

        response = authenticated_client.get("/api/displays/")

        assert response.status_code == status.HTTP_200_OK
        assert (
            response.data["count"] == 2 + 2 + existing_standards
        )  # 2 own + 2 new standard + existing, not 3 from other

    def test_list_displays_unauthenticated(self, api_client):
        """Test listing displays requires authentication."""
        response = api_client.get("/api/displays/")

        assert response.status_code == status.HTTP_401_UNAUTHORIZED


@pytest.mark.django_db
class TestDisplayViewSetRetrieve:
    """Tests for DisplayViewSet retrieve action."""

    def test_retrieve_custom_display(self, authenticated_client, display):
        """Test retrieving a custom display."""
        response = authenticated_client.get(f"/api/displays/{display.slug}/")

        assert response.status_code == status.HTTP_200_OK
        assert response.data["name"] == display.name
        assert response.data["display_category"] == "custom"

    def test_retrieve_standard_display(self, authenticated_client, standard_display):
        """Test retrieving a standard display."""
        response = authenticated_client.get(f"/api/displays/{standard_display.slug}/")

        assert response.status_code == status.HTTP_200_OK
        assert response.data["name"] == standard_display.name
        assert response.data["display_category"] == "standard"


@pytest.mark.django_db
class TestDisplayViewSetCreate:
    """Tests for DisplayViewSet create action."""

    def test_create_display(self, authenticated_client):
        """Test creating a custom display."""
        response = authenticated_client.post(
            "/api/displays/",
            {
                "name": "New Display",
                "type": "gondola",
                "width_in": 48.0,
                "height_in": 72.0,
                "depth_in": 18.0,
                "shelf_count": 5,
                "shelf_spacing": 12.0,
            },
            format="json",
        )

        assert response.status_code == status.HTTP_201_CREATED
        assert response.data["name"] == "New Display"
        assert response.data["display_category"] == "custom"

    def test_create_display_minimal_fields(self, authenticated_client):
        """Test creating a display with minimal required fields."""
        response = authenticated_client.post(
            "/api/displays/",
            {
                "name": "Minimal Display",
                "type": "endcap",
                "width_in": 36.0,
                "height_in": 60.0,
                "depth_in": 12.0,
                "shelf_count": 3,
            },
            format="json",
        )

        assert response.status_code == status.HTTP_201_CREATED
        assert response.data["name"] == "Minimal Display"


@pytest.mark.django_db
class TestDisplayViewSetUpdate:
    """Tests for DisplayViewSet update action."""

    def test_update_custom_display(self, authenticated_client, display):
        """Test updating a custom display."""
        response = authenticated_client.patch(
            f"/api/displays/{display.slug}/",
            {
                "name": "Updated Display Name",
            },
            format="json",
        )

        assert response.status_code == status.HTTP_200_OK
        display.refresh_from_db()
        assert display.name == "Updated Display Name"

    def test_full_update_display(self, authenticated_client, display):
        """Test full update of a display."""
        response = authenticated_client.put(
            f"/api/displays/{display.slug}/",
            {
                "name": "Fully Updated",
                "type": "freezer_case",
                "width_in": 96.0,
                "height_in": 84.0,
                "depth_in": 24.0,
                "shelf_count": 6,
                "shelf_spacing": 14.0,
            },
            format="json",
        )

        assert response.status_code == status.HTTP_200_OK
        display.refresh_from_db()
        assert display.name == "Fully Updated"
        assert display.type == "freezer_case"


@pytest.mark.django_db
class TestDisplayViewSetDestroy:
    """Tests for DisplayViewSet destroy action."""

    def test_delete_custom_display(self, authenticated_client, company, user):
        """Test deleting a custom display."""
        display_to_delete = DisplayFactory(company=company, created_by=user)

        response = authenticated_client.delete(
            f"/api/displays/{display_to_delete.slug}/"
        )

        assert response.status_code == status.HTTP_204_NO_CONTENT

    def test_delete_standard_display_forbidden(
        self, authenticated_client, standard_display
    ):
        """Test deleting a standard display is forbidden."""
        response = authenticated_client.delete(
            f"/api/displays/{standard_display.slug}/"
        )

        assert response.status_code == status.HTTP_403_FORBIDDEN
        assert "standard displays cannot be deleted" in response.data["error"].lower()


@pytest.mark.django_db
class TestDisplayViewSetTypes:
    """Tests for DisplayViewSet types action."""

    def test_get_display_types(self, authenticated_client):
        """Test getting available display types."""
        response = authenticated_client.get("/api/displays/types/")

        assert response.status_code == status.HTTP_200_OK
        assert isinstance(response.data, list)
        assert len(response.data) > 0

        # Check structure
        first_type = response.data[0]
        assert "value" in first_type
        assert "label" in first_type


@pytest.mark.django_db
class TestDisplayViewSetStandards:
    """Tests for DisplayViewSet standards action."""

    def test_get_standard_displays(self, authenticated_client):
        """Test getting standard display templates."""
        from displays.models import Display

        existing_standards = Display.objects.filter(display_category="standard").count()

        StandardDisplayFactory.create_batch(3)

        response = authenticated_client.get("/api/displays/standards/")

        assert response.status_code == status.HTTP_200_OK
        assert isinstance(response.data, list)
        assert len(response.data) == 3 + existing_standards

    def test_standards_only_includes_standard_category(
        self, authenticated_client, company, user
    ):
        """Test standards endpoint only returns standard displays, not custom."""
        from displays.models import Display

        existing_standards = Display.objects.filter(display_category="standard").count()

        StandardDisplayFactory.create_batch(2)
        DisplayFactory.create_batch(3, company=company, created_by=user)

        response = authenticated_client.get("/api/displays/standards/")

        assert response.status_code == status.HTTP_200_OK
        assert (
            len(response.data) == 2 + existing_standards
        )  # Only standard + existing, not custom
