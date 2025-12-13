"""URL configuration for accounts app."""

from django.urls import include, path
from rest_framework.routers import DefaultRouter

from accounts import views

router = DefaultRouter()
router.register(r"users", views.UserViewSet, basename="user")

urlpatterns = [
    # Auth endpoints (function-based)
    path("auth/register/", views.register, name="register"),
    path("auth/login/", views.login, name="login"),
    path("auth/logout/", views.logout, name="logout"),
    path(
        "auth/validate-invitation/",
        views.validate_invitation,
        name="validate-invitation",
    ),
    path("users/me/", views.me, name="me"),
    # User management endpoints (ViewSet)
    path("", include(router.urls)),
]
