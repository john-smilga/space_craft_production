"""Serializers for accounts app."""

from typing import Any

from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError as DjangoValidationError
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken

from accounts.models import Company, User


class CompanySerializer(serializers.ModelSerializer):
    """Serializer for Company model."""

    class Meta:
        model = Company
        fields = ["id", "name", "tax_id", "description", "created_at"]
        read_only_fields = ["id", "created_at"]


class UserSerializer(serializers.ModelSerializer):
    """Output serializer for User model."""

    company = CompanySerializer(read_only=True)
    slug = serializers.CharField(read_only=True)

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "role",
            "company",
            "slug",
            "is_active",
            "date_joined",
        ]
        read_only_fields = ["id", "slug", "date_joined"]


class UserCreateSerializer(serializers.ModelSerializer):
    """Input serializer for user registration."""

    password = serializers.CharField(write_only=True, required=True)
    password_confirm = serializers.CharField(write_only=True, required=True)
    company_name = serializers.CharField(required=True, max_length=255)

    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "password",
            "password_confirm",
            "first_name",
            "last_name",
            "company_name",
        ]

    def validate(self, attrs: dict[str, Any]) -> dict[str, Any]:
        """Validate password match and strength."""
        if attrs["password"] != attrs["password_confirm"]:
            raise serializers.ValidationError(
                {"password_confirm": "Passwords do not match."}
            )

        try:
            validate_password(attrs["password"])
        except DjangoValidationError as e:
            raise serializers.ValidationError({"password": list(e.messages)})

        return attrs

    def create(self, validated_data: dict[str, Any]) -> User:
        """Create user with company."""
        validated_data.pop("password_confirm")
        company_name = validated_data.pop("company_name")
        password = validated_data.pop("password")

        company, _ = Company.objects.get_or_create(name=company_name)

        user = User.objects.create_user(
            **validated_data, company=company, role="admin", password=password
        )
        return user


class UserUpdateSerializer(serializers.ModelSerializer):
    """Input serializer for user updates."""

    class Meta:
        model = User
        fields = ["first_name", "last_name", "email", "role"]

    def validate_role(self, value: str) -> str:
        """Validate role changes."""
        if value not in dict(User.ROLE_CHOICES):
            raise serializers.ValidationError("Invalid role.")
        return value


class UserInviteSerializer(serializers.Serializer):
    """Input serializer for user invitations."""

    email = serializers.EmailField(required=True)
    username = serializers.CharField(required=True, max_length=150)
    first_name = serializers.CharField(required=False, allow_blank=True, max_length=150)
    last_name = serializers.CharField(required=False, allow_blank=True, max_length=150)
    role = serializers.ChoiceField(
        choices=User.ROLE_CHOICES, default="member", required=False
    )

    def validate_email(self, value: str) -> str:
        """Check if email already exists."""
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value

    def validate_username(self, value: str) -> str:
        """Check if username already exists."""
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError(
                "A user with this username already exists."
            )
        return value


class LoginSerializer(serializers.Serializer):
    """Input serializer for login."""

    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True, write_only=True)


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Custom token serializer with additional claims."""

    @classmethod
    def get_token(cls, user: User) -> RefreshToken:
        """Add custom claims to token."""
        token = super().get_token(user)
        token["role"] = user.role
        token["company_id"] = user.company.id if user.company else None
        return token


def get_token_for_user(user: User) -> RefreshToken:
    """Helper to create token with custom claims."""
    refresh = RefreshToken.for_user(user)
    refresh["role"] = user.role
    refresh["company_id"] = user.company.id if user.company else None
    return refresh
