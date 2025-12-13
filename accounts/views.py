"""Views for accounts app."""

import logging
from typing import Any

from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from accounts.permissions import IsAdmin
from accounts.serializers import (
    LoginSerializer,
    UserInviteSerializer,
    UserSerializer,
    UserUpdateSerializer,
    get_token_for_user,
)
from common.mixins import CompanyFilterMixin, SlugLookupMixin
from common.viewsets import BaseViewSet

User = get_user_model()
logger = logging.getLogger("accounts")


# Auth endpoints (function-based for auth flow)


@api_view(["GET"])
@permission_classes([AllowAny])
def validate_invitation(request: Request) -> Response:
    """Validate an invitation token and return company info."""
    token = request.query_params.get("token")

    if not token:
        return Response(
            {"error": "Token is required"}, status=status.HTTP_400_BAD_REQUEST
        )

    try:
        user = User.objects.get(invitation_token=token)

        if not user.is_invitation_valid():
            return Response(
                {"error": "Invitation token has expired"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if user.is_active:
            return Response(
                {"error": "This invitation has already been used"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        return Response(
            {
                "valid": True,
                "email": user.email,
                "company": (
                    {
                        "id": user.company.id,
                        "name": user.company.name,
                    }
                    if user.company
                    else None
                ),
            }
        )
    except User.DoesNotExist:
        return Response(
            {"error": "Invalid invitation token"}, status=status.HTTP_400_BAD_REQUEST
        )


@api_view(["POST"])
@permission_classes([AllowAny])
def register(request: Request) -> Response:
    """Register a new user using an invitation token."""
    token = request.data.get("token")
    password = request.data.get("password")
    username = request.data.get("username")

    if not token or not password:
        return Response(
            {"error": "Token and password are required"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        user = User.objects.get(invitation_token=token)

        if not user.is_invitation_valid():
            return Response(
                {"error": "Invitation token has expired"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if user.is_active:
            return Response(
                {"error": "This invitation has already been used"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user.set_password(password)
        if username:
            user.username = username
        user.is_active = True
        user.invitation_token = None
        user.invitation_expires_at = None
        user.save()

        refresh = RefreshToken.for_user(user)

        serializer = UserSerializer(user)
        response = Response(serializer.data)
        response.set_cookie(
            settings.SIMPLE_JWT["AUTH_COOKIE"],
            str(refresh.access_token),
            httponly=settings.SIMPLE_JWT["AUTH_COOKIE_HTTP_ONLY"],
            samesite=settings.SIMPLE_JWT["AUTH_COOKIE_SAMESITE"],
            secure=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],
        )
        return response

    except User.DoesNotExist:
        return Response(
            {"error": "Invalid invitation token"}, status=status.HTTP_400_BAD_REQUEST
        )


@api_view(["POST"])
@permission_classes([AllowAny])
def login(request: Request) -> Response:
    """Login existing user."""
    serializer = LoginSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    email = serializer.validated_data.get("email")
    password = serializer.validated_data.get("password")

    try:
        user = User.objects.get(email=email)

        if not user.check_password(password):
            logger.warning(f"Failed login attempt for {email}")
            return Response(
                {"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED
            )

        if not user.is_active:
            return Response(
                {"error": "Account is not active"}, status=status.HTTP_401_UNAUTHORIZED
            )

        refresh = get_token_for_user(user)

        user_serializer = UserSerializer(user)
        response = Response(user_serializer.data)

        response.set_cookie(
            settings.SIMPLE_JWT["AUTH_COOKIE"],
            str(refresh.access_token),
            httponly=settings.SIMPLE_JWT["AUTH_COOKIE_HTTP_ONLY"],
            samesite=settings.SIMPLE_JWT["AUTH_COOKIE_SAMESITE"],
            secure=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],
        )

        return response

    except User.DoesNotExist:
        logger.warning(f"Failed login attempt for {email}")
        return Response(
            {"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED
        )
    except Exception as e:
        logger.error(f"Unexpected error during login: {e}")
        return Response(
            {"error": "An error occurred during login"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def logout(request: Request) -> Response:
    """Logout current user."""
    response = Response({"message": "Logged out"})
    response.delete_cookie("jwt")
    return response


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def me(request: Request) -> Response:
    """Get current user info."""
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


# User management endpoints (ViewSet)


class UserViewSet(CompanyFilterMixin, SlugLookupMixin, BaseViewSet):
    """ViewSet for User management (admin only)."""

    queryset = User.objects.select_related("company").filter(is_active=True)
    permission_classes = [IsAuthenticated, IsAdmin]
    serializer_class = UserSerializer

    def get_serializer_class(self) -> type:
        """Return appropriate serializer based on action."""
        if self.action == "invite":
            return UserInviteSerializer
        elif self.action in ["update", "partial_update"]:
            return UserUpdateSerializer
        return UserSerializer

    def get_queryset(self):
        """Get users filtered by company, excluding current user."""
        queryset = super().get_queryset()
        return queryset.exclude(id=self.request.user.id).order_by("-date_joined")

    def destroy(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        """Delete a user (cannot delete admins or self)."""
        instance = self.get_object()

        if instance.id == request.user.id:
            return Response(
                {"error": "Cannot delete your own account"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if instance.role == "admin":
            return Response(
                {"error": "Cannot delete admin user"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        return super().destroy(request, *args, **kwargs)

    @action(detail=False, methods=["post"], url_path="invite")
    def invite(self, request: Request) -> Response:
        """Create an invitation for a new user."""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data["email"]
        username = serializer.validated_data["username"]
        first_name = serializer.validated_data.get("first_name", "")
        last_name = serializer.validated_data.get("last_name", "")
        role = serializer.validated_data.get("role", "member")

        company = request.user.company

        user = User.objects.create_user(
            username=username,
            email=email,
            first_name=first_name,
            last_name=last_name,
            password=None,
            company=company,
            role=role,
            is_active=False,
        )

        token = user.generate_invitation_token()

        frontend_url = settings.FRONTEND_URL
        invitation_link = f"{frontend_url}/register?token={token}"

        return Response(
            {
                "message": "Invitation created successfully",
                "invitation_token": token,
                "invitation_link": invitation_link,
                "user": UserSerializer(user).data,
            },
            status=status.HTTP_201_CREATED,
        )

    @action(detail=False, methods=["patch"], url_path="me/username")
    def update_username(self, request: Request) -> Response:
        """Update current user's username."""
        new_username = request.data.get("username")

        if not new_username:
            return Response(
                {"error": "Username is required"}, status=status.HTTP_400_BAD_REQUEST
            )

        if (
            User.objects.filter(username=new_username)
            .exclude(id=request.user.id)
            .exists()
        ):
            return Response(
                {"error": "Username already taken"}, status=status.HTTP_400_BAD_REQUEST
            )

        request.user.username = new_username
        request.user.save()

        serializer = UserSerializer(request.user)
        return Response(serializer.data)
