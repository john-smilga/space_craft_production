"""Base viewsets and utilities for the SpaceCraft project."""

from rest_framework import viewsets


class BaseViewSet(viewsets.ModelViewSet):
    """Base viewset with common functionality."""

    def get_serializer_context(self) -> dict:
        """Add company to serializer context."""
        context = super().get_serializer_context()
        if hasattr(self.request, "user") and self.request.user.is_authenticated:
            context["company"] = self.request.user.company
            context["user"] = self.request.user
        return context
