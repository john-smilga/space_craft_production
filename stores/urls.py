"""URL configuration for stores app."""

from django.urls import include, path
from rest_framework.routers import DefaultRouter

from stores import views

router = DefaultRouter()
router.register(r"stores", views.StoreViewSet, basename="store")

urlpatterns = [
    path("", include(router.urls)),
]
