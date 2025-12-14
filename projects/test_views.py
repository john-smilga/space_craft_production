"""Tests for projects views."""

import pytest
from rest_framework import status

from factories import CompanyFactory, ProjectFactory, StoreFactory, UserFactory


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

    def test_list_project_planograms(
        self, authenticated_client, project, standard_display, user
    ):
        """Test listing planograms for a specific project."""
        from factories import PlanogramFactory

        # Create planograms for this project
        PlanogramFactory.create_batch(
            3,
            project=project,
            company=project.company,
            display=standard_display,
            created_by=user,
        )

        # Create planograms for another project (should not appear)
        other_project = ProjectFactory(company=project.company, store=project.store)
        PlanogramFactory.create_batch(
            2,
            project=other_project,
            company=project.company,
            display=standard_display,
            created_by=user,
        )

        response = authenticated_client.get(f"/api/projects/{project.slug}/planograms/")

        assert response.status_code == status.HTTP_200_OK
        assert "planograms" in response.data
        assert len(response.data["planograms"]) == 3

    def test_list_project_planograms_empty(self, authenticated_client, project):
        """Test listing planograms when project has none."""
        response = authenticated_client.get(f"/api/projects/{project.slug}/planograms/")

        assert response.status_code == status.HTTP_200_OK
        assert "planograms" in response.data
        assert len(response.data["planograms"]) == 0

    def test_list_project_planograms_company_isolation(
        self, authenticated_client, project, standard_display, user
    ):
        """Test planograms from other companies are not visible."""
        from factories import PlanogramFactory

        # Create planograms for this project
        PlanogramFactory.create_batch(
            2,
            project=project,
            company=project.company,
            display=standard_display,
            created_by=user,
        )

        # Create another company's project with planograms
        other_company = CompanyFactory()
        other_store = StoreFactory(company=other_company)
        other_user = UserFactory(company=other_company)
        other_project = ProjectFactory(
            company=other_company, store=other_store, created_by=other_user
        )
        PlanogramFactory.create_batch(
            3,
            project=other_project,
            company=other_company,
            display=standard_display,
            created_by=other_user,
        )

        # Should only see own project's planograms
        response = authenticated_client.get(f"/api/projects/{project.slug}/planograms/")
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data["planograms"]) == 2

        # Should not be able to access other company's project
        response = authenticated_client.get(
            f"/api/projects/{other_project.slug}/planograms/"
        )
        assert response.status_code == status.HTTP_404_NOT_FOUND
