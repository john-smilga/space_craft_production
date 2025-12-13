"""App configuration for common app."""

from django.apps import AppConfig


class CommonConfig(AppConfig):
    """Configuration for common app."""

    default_auto_field = "django.db.models.BigAutoField"
    name = "common"
