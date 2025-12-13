"""URL configuration for displays app."""

from django.urls import include, path
from rest_framework.routers import DefaultRouter

from displays import views

router = DefaultRouter()
router.register(r"displays", views.DisplayViewSet, basename="display")

urlpatterns = [
    path("", include(router.urls)),
]
