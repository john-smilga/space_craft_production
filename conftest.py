"""Root conftest for pytest configuration."""

import pytest
from rest_framework.test import APIClient

from factories import (
    AdminUserFactory,
    CompanyFactory,
    DisplayFactory,
    PlanogramFactory,
    ProjectFactory,
    StandardDisplayFactory,
    StoreFactory,
    UserFactory,
)


@pytest.fixture
def api_client():
    """Create an API client for testing."""
    return APIClient()


# Model factories as fixtures
@pytest.fixture
def company(db):
    """Create a company for testing."""
    return CompanyFactory()


@pytest.fixture
def user(db, company):
    """Create a regular user for testing."""
    return UserFactory(company=company)


@pytest.fixture
def admin_user(db, company):
    """Create an admin user for testing."""
    return AdminUserFactory(company=company)


@pytest.fixture
def store(db, company, user):
    """Create a store for testing."""
    return StoreFactory(company=company, created_by=user)


@pytest.fixture
def display(db, company, user):
    """Create a custom display for testing."""
    return DisplayFactory(company=company, created_by=user)


@pytest.fixture
def standard_display(db, admin_user):
    """Create a standard display for testing."""
    return StandardDisplayFactory(created_by=admin_user)


@pytest.fixture
def project(db, store, user):
    """Create a project for testing."""
    return ProjectFactory(store=store, company=store.company, created_by=user)


@pytest.fixture
def planogram(db, project, standard_display, user):
    """Create a planogram for testing."""
    return PlanogramFactory(
        project=project,
        company=project.company,
        display=standard_display,
        created_by=user,
        updated_by=user,
    )


# Authenticated clients
@pytest.fixture
def authenticated_client(api_client, user):
    """Create an authenticated API client."""
    api_client.force_authenticate(user=user)
    return api_client


@pytest.fixture
def admin_client(api_client, admin_user):
    """Create an authenticated API client with admin user."""
    api_client.force_authenticate(user=admin_user)
    return api_client


# OpenAPI Schema Validation
@pytest.fixture(scope="session")
def openapi_spec():
    """Load OpenAPI schema once per test session."""
    from openapi_core import Spec
    import yaml
    from pathlib import Path

    schema_path = Path(__file__).parent / "openapi.yaml"
    with open(schema_path) as f:
        spec_dict = yaml.safe_load(f)
    return Spec.from_dict(spec_dict)


@pytest.fixture
def assert_matches_schema(openapi_spec):
    """Validate API responses against OpenAPI schema.

    Usage in tests:
        response = client.post("/api/auth/login/", {...})
        assert_matches_schema(response)
    """
    from openapi_core import validate_response
    from openapi_core.contrib.django import (
        DjangoOpenAPIRequest,
        DjangoOpenAPIResponse,
    )

    def _validate(response):
        """Validate a Django REST Framework response against the schema."""
        openapi_request = DjangoOpenAPIRequest(response.wsgi_request)
        openapi_response = DjangoOpenAPIResponse(response)

        # Validate using openapi-core 0.19.x API
        # The function validates and raises exceptions if validation fails
        result = validate_response(openapi_request, openapi_response, spec=openapi_spec)

        # Check if result has errors (API may vary by version)
        if result is not None and hasattr(result, 'raise_for_errors'):
            result.raise_for_errors()
        elif result is not None and hasattr(result, 'errors') and result.errors:
            raise Exception(f"Schema validation failed: {result.errors}")
        # If result is None, validation passed (no errors)

    return _validate
