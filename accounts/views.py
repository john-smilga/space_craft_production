"""Views for accounts app."""

import logging
from typing import Any

from django.conf import settings
from django.contrib.auth import get_user_model
from drf_spectacular.utils import OpenApiParameter, extend_schema
from rest_framework import status
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from accounts.permissions import IsAdmin
from accounts.serializers import (
    LoginSerializer,
    LogoutResponseSerializer,
    RegisterRequestSerializer,
    UserInviteResponseSerializer,
    UserInviteSerializer,
    UserSerializer,
    UserUpdateSerializer,
    ValidateInvitationResponseSerializer,
    get_token_for_user,
)
from common.exceptions import UnauthorizedError, ValidationError
from common.mixins import CompanyFilterMixin, SlugLookupMixin
from common.viewsets import BaseViewSet

User = get_user_model()
logger = logging.getLogger("accounts")


# Auth endpoints (function-based for auth flow)


@extend_schema(
    parameters=[
        OpenApiParameter(
            name="token",
            type=str,
            location=OpenApiParameter.QUERY,
            required=True,
            description="Invitation token to validate",
        )
    ],
    responses={200: ValidateInvitationResponseSerializer},
    description="Validate an invitation token and return company info.",
)
@api_view(["GET"])
@permission_classes([AllowAny])
def validate_invitation(request: Request) -> Response:
    """Validate an invitation token and return company info."""
    token = request.query_params.get("token")

    if not token:
        raise ValidationError("Token is required")

    try:
        user = User.objects.get(invitation_token=token)

        if not user.is_invitation_valid():
            raise ValidationError("Invitation token has expired")

        if user.is_active:
            raise ValidationError("This invitation has already been used")

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
        raise ValidationError("Invalid invitation token")


@extend_schema(
    request=RegisterRequestSerializer,
    responses={200: UserSerializer},
    description="Register a new user using an invitation token.",
)
@api_view(["POST"])
@permission_classes([AllowAny])
def register(request: Request) -> Response:
    """Register a new user using an invitation token."""
    token = request.data.get("token")
    password = request.data.get("password")
    username = request.data.get("username")

    if not token or not password:
        raise ValidationError("Token and password are required")

    try:
        user = User.objects.get(invitation_token=token)

        if not user.is_invitation_valid():
            raise ValidationError("Invitation token has expired")

        if user.is_active:
            raise ValidationError("This invitation has already been used")

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
        raise ValidationError("Invalid invitation token")


@extend_schema(
    request=LoginSerializer,
    responses={200: UserSerializer},
    description="Login existing user.",
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
    except User.DoesNotExist:
        logger.warning(f"Failed login attempt for {email}")
        raise UnauthorizedError("Invalid credentials")

    if not user.check_password(password):
        logger.warning(f"Failed login attempt for {email}")
        raise UnauthorizedError("Invalid credentials")

    if not user.is_active:
        raise UnauthorizedError("Account is not active")

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


@extend_schema(
    responses={200: LogoutResponseSerializer},
    description="Logout current user.",
)
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def logout(request: Request) -> Response:
    """Logout current user."""
    response = Response({"message": "Logged out"})
    response.delete_cookie("jwt")
    return response


@extend_schema(
    responses={200: UserSerializer},
    description="Get current user info.",
)
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
            raise ValidationError("Cannot delete your own account")

        if instance.role == "admin":
            raise ValidationError("Cannot delete admin user")

        return super().destroy(request, *args, **kwargs)

    @extend_schema(
        request=UserInviteSerializer,
        responses={201: UserInviteResponseSerializer},
        description="Create an invitation for a new user and return invitation details.",
    )
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

    @extend_schema(
        responses={200: UserSerializer},
        description="Update current user's username.",
    )
    @action(detail=False, methods=["patch"], url_path="me/username")
    def update_username(self, request: Request) -> Response:
        """Update current user's username."""
        new_username = request.data.get("username")

        if not new_username:
            raise ValidationError("Username is required")

        if (
            User.objects.filter(username=new_username)
            .exclude(id=request.user.id)
            .exists()
        ):
            raise ValidationError("Username already taken")

        request.user.username = new_username
        request.user.save()

        serializer = UserSerializer(request.user)
        return Response(serializer.data)
