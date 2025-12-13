"""Mixins for views and viewsets."""

from typing import Any

from django.db.models import QuerySet
from django.http import Http404
from rest_framework.request import Request


class CompanyFilterMixin:
    """Mixin to filter queryset by user's company."""

    def get_queryset(self) -> QuerySet:
        """Filter queryset by company."""
        queryset = super().get_queryset()  # type: ignore
        request: Request = self.request  # type: ignore

        if not request.user.is_authenticated:
            return queryset.none()

        if hasattr(request.user, "company") and request.user.company:
            return queryset.filter(company=request.user.company)

        return queryset.none()


class SlugLookupMixin:
    """Mixin to handle slug-based lookups.

    Note: This uses O(n) iteration since slugs are computed properties (@property).
    For better performance, consider storing slugs as database fields with indexes.

    See: TODO.md "Future Improvements" section for migration to database-backed slugs.
    """

    lookup_field = "slug"

    def get_object(self) -> Any:
        """Get object by slug using iteration.

        Since slug is a computed property (not a database field), we cannot use
        Django's .filter() method. Instead, we iterate through the queryset to
        find the matching object.

        Performance: O(n) where n is the queryset size.
        """
        queryset = self.filter_queryset(self.get_queryset())  # type: ignore
        lookup_url_kwarg = self.lookup_url_kwarg or self.lookup_field  # type: ignore
        slug_value = self.kwargs[lookup_url_kwarg]  # type: ignore

        # Iterate through queryset since slug is a property, not a database field
        for obj in queryset:
            if obj.slug == slug_value:
                self.check_object_permissions(self.request, obj)  # type: ignore
                return obj

        # No matching object found
        model_name = queryset.model.__name__
        raise Http404(f"No {model_name} found with slug '{slug_value}'")
