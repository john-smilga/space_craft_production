"""Custom exception handling for the SpaceCraft project."""

from typing import Any

from rest_framework import status
from rest_framework.exceptions import APIException
from rest_framework.response import Response
from rest_framework.views import exception_handler as drf_exception_handler


def custom_exception_handler(
    exc: Exception, context: dict[str, Any]
) -> Response | None:
    """Custom exception handler for consistent error responses.

    Format: { "error": { "code": "...", "message": "...", "details": {...} } }
    """
    response = drf_exception_handler(exc, context)

    if response is not None:
        error_data = {
            "error": {
                "code": getattr(exc, "default_code", "error"),
                "message": str(exc),
            }
        }

        if isinstance(response.data, dict):
            if "detail" in response.data:
                error_data["error"]["message"] = response.data["detail"]
            elif response.data:
                error_data["error"]["details"] = response.data

        response.data = error_data

    return response


class ValidationError(APIException):
    """Custom validation error."""

    status_code = status.HTTP_400_BAD_REQUEST
    default_detail = "Validation error"
    default_code = "validation_error"


class NotFoundError(APIException):
    """Custom not found error."""

    status_code = status.HTTP_404_NOT_FOUND
    default_detail = "Resource not found"
    default_code = "not_found"


class PermissionDeniedError(APIException):
    """Custom permission denied error."""

    status_code = status.HTTP_403_FORBIDDEN
    default_detail = "Permission denied"
    default_code = "permission_denied"


class UnauthorizedError(APIException):
    """Custom unauthorized error."""

    status_code = status.HTTP_401_UNAUTHORIZED
    default_detail = "Unauthorized"
    default_code = "unauthorized"
