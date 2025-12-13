"""Common permission classes for the SpaceCraft project."""

from rest_framework import permissions
from rest_framework.request import Request
from rest_framework.views import APIView


class IsCompanyAdmin(permissions.BasePermission):
    """Permission check if user is admin of their company."""

    def has_permission(self, request: Request, view: APIView) -> bool:
        """Check if user is authenticated and is admin."""
        return (
            request.user
            and request.user.is_authenticated
            and hasattr(request.user, "role")
            and request.user.role == "admin"
        )


class IsCompanyMember(permissions.BasePermission):
    """Permission check if user belongs to a company."""

    def has_permission(self, request: Request, view: APIView) -> bool:
        """Check if user is authenticated and has a company."""
        return (
            request.user
            and request.user.is_authenticated
            and hasattr(request.user, "company")
            and request.user.company is not None
        )


class IsOwnerOrAdmin(permissions.BasePermission):
    """Permission check if user created the resource or is admin."""

    def has_object_permission(self, request: Request, view: APIView, obj: any) -> bool:
        """Check if user is the owner or admin of their company."""
        if not request.user or not request.user.is_authenticated:
            return False

        if hasattr(request.user, "role") and request.user.role == "admin":
            return True

        if hasattr(obj, "created_by"):
            return obj.created_by == request.user

        return False
