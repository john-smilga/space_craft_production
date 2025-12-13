"""URL configuration for planograms app."""

from django.urls import include, path
from rest_framework.routers import DefaultRouter

from planograms import views

router = DefaultRouter()
router.register(r"planograms", views.PlanogramViewSet, basename="planogram")

urlpatterns = [
    path("", include(router.urls)),
]
