"""Tests for stores views."""

import pytest
from rest_framework import status

from factories import CompanyFactory, StoreFactory


@pytest.mark.django_db
class TestStoreViewSetList:
    """Tests for StoreViewSet list action."""

    def test_list_stores_authenticated(self, authenticated_client, company):
        """Test listing stores as authenticated user."""
        StoreFactory.create_batch(3, company=company)

        response = authenticated_client.get("/api/stores/")

        assert response.status_code == status.HTTP_200_OK
        assert response.data["count"] == 3

    def test_list_stores_company_isolation(self, authenticated_client, company):
        """Test stores from other companies are not visible."""
        StoreFactory.create_batch(2, company=company)
        other_company = CompanyFactory()
        StoreFactory.create_batch(3, company=other_company)

        response = authenticated_client.get("/api/stores/")

        assert response.status_code == status.HTTP_200_OK
        assert response.data["count"] == 2

    def test_list_stores_unauthenticated(self, api_client):
        """Test listing stores requires authentication."""
        response = api_client.get("/api/stores/")

        assert response.status_code == status.HTTP_401_UNAUTHORIZED


@pytest.mark.django_db
class TestStoreViewSetRetrieve:
    """Tests for StoreViewSet retrieve action."""

    def test_retrieve_store(self, authenticated_client, store):
        """Test retrieving a store."""
        response = authenticated_client.get(f"/api/stores/{store.slug}/")

        assert response.status_code == status.HTTP_200_OK
        assert response.data["name"] == store.name
        assert response.data["store_code"] == store.store_code

    def test_retrieve_store_from_other_company(self, authenticated_client):
        """Test retrieving store from another company is forbidden."""
        other_company = CompanyFactory()
        other_store = StoreFactory(company=other_company)

        response = authenticated_client.get(f"/api/stores/{other_store.slug}/")

        assert response.status_code == status.HTTP_404_NOT_FOUND


@pytest.mark.django_db
class TestStoreViewSetCreate:
    """Tests for StoreViewSet create action."""

    def test_create_store_as_admin(self, admin_client):
        """Test creating a store as admin."""
        response = admin_client.post(
            "/api/stores/",
            {
                "name": "New Store",
                "store_code": "NS001",
                "address": "123 Main St",
            },
            format="json",
        )

        assert response.status_code == status.HTTP_201_CREATED
        assert response.data["name"] == "New Store"
        assert response.data["store_code"] == "NS001"

    def test_create_store_as_member(self, authenticated_client):
        """Test creating a store as non-admin is forbidden."""
        response = authenticated_client.post(
            "/api/stores/",
            {
                "name": "New Store",
                "store_code": "NS001",
                "address": "123 Main St",
            },
            format="json",
        )

        assert response.status_code == status.HTTP_403_FORBIDDEN
        assert "only admins" in response.data["error"].lower()

    def test_create_store_duplicate_code(self, admin_client, company):
        """Test creating a store with duplicate store_code fails."""
        StoreFactory(company=company, store_code="DUP001")

        response = admin_client.post(
            "/api/stores/",
            {
                "name": "Duplicate Store",
                "store_code": "DUP001",
                "address": "456 Oak Ave",
            },
            format="json",
        )

        assert response.status_code == status.HTTP_400_BAD_REQUEST


@pytest.mark.django_db
class TestStoreViewSetUpdate:
    """Tests for StoreViewSet update action."""

    def test_update_store_as_admin(self, admin_client, store):
        """Test updating a store as admin."""
        response = admin_client.patch(
            f"/api/stores/{store.slug}/",
            {
                "name": "Updated Store Name",
            },
            format="json",
        )

        assert response.status_code == status.HTTP_200_OK
        store.refresh_from_db()
        assert store.name == "Updated Store Name"

    def test_update_store_as_member(self, authenticated_client, store):
        """Test updating a store as non-admin is forbidden."""
        response = authenticated_client.patch(
            f"/api/stores/{store.slug}/",
            {
                "name": "Updated Store Name",
            },
            format="json",
        )

        assert response.status_code == status.HTTP_403_FORBIDDEN
        assert "only admins" in response.data["error"].lower()

    def test_full_update_store(self, admin_client, store):
        """Test full update of a store."""
        response = admin_client.put(
            f"/api/stores/{store.slug}/",
            {
                "name": "Fully Updated Store",
                "store_code": store.store_code,
                "address": "999 New Address Blvd",
            },
            format="json",
        )

        assert response.status_code == status.HTTP_200_OK
        store.refresh_from_db()
        assert store.name == "Fully Updated Store"
        assert store.address == "999 New Address Blvd"


@pytest.mark.django_db
class TestStoreViewSetDestroy:
    """Tests for StoreViewSet destroy action."""

    def test_delete_store_as_admin(self, admin_client, company, admin_user):
        """Test deleting a store as admin."""
        store_to_delete = StoreFactory(company=company, created_by=admin_user)

        response = admin_client.delete(f"/api/stores/{store_to_delete.slug}/")

        assert response.status_code == status.HTTP_204_NO_CONTENT
        # Note: The store is soft-deleted or hard-deleted depending on implementation
        # For now, just check the response code

    def test_delete_store_as_member(self, authenticated_client, store):
        """Test deleting a store as non-admin is forbidden."""
        response = authenticated_client.delete(f"/api/stores/{store.slug}/")

        assert response.status_code == status.HTTP_403_FORBIDDEN
        assert "only admins" in response.data["error"].lower()

    def test_delete_store_from_other_company(self, admin_client):
        """Test deleting a store from another company is forbidden."""
        other_company = CompanyFactory()
        other_store = StoreFactory(company=other_company)

        response = admin_client.delete(f"/api/stores/{other_store.slug}/")

        assert response.status_code == status.HTTP_404_NOT_FOUND
