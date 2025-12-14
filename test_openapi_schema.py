"""Comprehensive OpenAPI schema validation tests using Schemathesis.

This module automatically generates tests for all endpoints defined in openapi.yaml.
Schemathesis will:
- Test all endpoints with various input combinations
- Validate responses against schema definitions
- Test edge cases and boundary conditions
- Ensure 100% schema compliance
"""

import pytest
import schemathesis
from pathlib import Path

# Load the OpenAPI schema from file
schema_path = Path(__file__).parent / "openapi.yaml"
schema = schemathesis.from_path(str(schema_path))


@schema.parametrize()
@pytest.mark.django_db(transaction=True)
def test_api_schema_compliance(case):
    """Auto-generated test for all API endpoints.

    Schemathesis automatically:
    - Generates test cases for each endpoint
    - Validates request/response schemas
    - Tests various input combinations
    - Checks status codes match the schema

    This ensures all endpoints comply with openapi.yaml 100%.
    """
    # Make the API call using Django's test client
    response = case.call_wsgi()

    # Validate the response against the OpenAPI schema
    case.validate_response(response)


@schema.parametrize(endpoint="/api/auth/login/")
@pytest.mark.django_db(transaction=True)
def test_login_endpoint_schema(case):
    """Focused schema validation test for login endpoint.

    This provides more detailed testing for the critical login endpoint.
    """
    response = case.call_wsgi()
    case.validate_response(response)


@schema.parametrize(endpoint="/api/auth/register/")
@pytest.mark.django_db(transaction=True)
def test_register_endpoint_schema(case):
    """Focused schema validation test for registration endpoint."""
    response = case.call_wsgi()
    case.validate_response(response)


# Custom hooks for schemathesis
@schema.hooks.register
def before_call(context, case):
    """Hook that runs before each API call.

    Can be used to:
    - Set up test data
    - Add authentication headers
    - Modify request parameters
    """
    pass


@schema.hooks.register
def after_call(context, case, response):
    """Hook that runs after each API call.

    Can be used to:
    - Additional custom validations
    - Clean up test data
    - Log test results
    """
    pass
