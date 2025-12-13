"""Tests for projects views."""

import pytest
from rest_framework import status

from factories import CompanyFactory, ProjectFactory, StoreFactory


@pytest.mark.django_db
class TestProjectViewSet:
    """Tests for ProjectViewSet."""

    def test_list_projects(self, authenticated_client, company, store):
        """Test listing projects."""
        ProjectFactory.create_batch(3, company=company, store=store)

        response = authenticated_client.get("/api/projects/")

        assert response.status_code == status.HTTP_200_OK
        assert response.data["count"] == 3

    def test_list_projects_company_isolation(
        self, authenticated_client, company, store
    ):
        """Test projects from other companies are not visible."""
        ProjectFactory.create_batch(2, company=company, store=store)
        other_company = CompanyFactory()
        other_store = StoreFactory(company=other_company)
        ProjectFactory.create_batch(3, company=other_company, store=other_store)

        response = authenticated_client.get("/api/projects/")

        assert response.status_code == status.HTTP_200_OK
        assert response.data["count"] == 2

    def test_retrieve_project(self, authenticated_client, project):
        """Test retrieving a project."""
        response = authenticated_client.get(f"/api/projects/{project.slug}/")

        assert response.status_code == status.HTTP_200_OK
        assert response.data["name"] == project.name

    def test_create_project(self, authenticated_client, store):
        """Test creating a project."""
        response = authenticated_client.post(
            "/api/projects/",
            {
                "name": "New Project",
                "store": store.id,
            },
            format="json",
        )

        assert response.status_code == status.HTTP_201_CREATED
        assert response.data["name"] == "New Project"

    def test_update_project(self, authenticated_client, project):
        """Test updating a project."""
        response = authenticated_client.patch(
            f"/api/projects/{project.slug}/",
            {
                "name": "Updated Project",
            },
            format="json",
        )

        assert response.status_code == status.HTTP_200_OK
        project.refresh_from_db()
        assert project.name == "Updated Project"

    def test_delete_project(self, authenticated_client, company, store, user):
        """Test deleting a project."""
        project_to_delete = ProjectFactory(
            company=company, store=store, created_by=user
        )

        response = authenticated_client.delete(
            f"/api/projects/{project_to_delete.slug}/"
        )

        assert response.status_code == status.HTTP_204_NO_CONTENT

    def test_unauthenticated_access(self, api_client):
        """Test unauthenticated access is denied."""
        response = api_client.get("/api/projects/")

        assert response.status_code == status.HTTP_401_UNAUTHORIZED
