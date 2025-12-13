"""User service for business logic."""

from typing import Any

from django.contrib.auth import get_user_model

from accounts.models import Company

User = get_user_model()


def create_user(
    username: str,
    email: str,
    password: str,
    company_name: str,
    first_name: str = "",
    last_name: str = "",
) -> User:
    """Create a new user with company.

    Args:
        username: Username for the user
        email: Email address
        password: Password
        company_name: Name of company to create or associate with
        first_name: First name (optional)
        last_name: Last name (optional)

    Returns:
        Created User instance
    """
    company, _ = Company.objects.get_or_create(name=company_name)

    user = User.objects.create_user(
        username=username,
        email=email,
        password=password,
        first_name=first_name,
        last_name=last_name,
        company=company,
        role="admin",
    )

    return user


def invite_user(
    email: str,
    username: str,
    company: Company,
    role: str = "member",
    first_name: str = "",
    last_name: str = "",
) -> tuple[User, str]:
    """Create an invitation for a new user.

    Args:
        email: Email address for invited user
        username: Username for invited user
        company: Company instance
        role: User role (default: member)
        first_name: First name (optional)
        last_name: Last name (optional)

    Returns:
        Tuple of (User instance, invitation token)

    Raises:
        ValueError: If user already exists
    """
    if User.objects.filter(email=email).exists():
        raise ValueError("User with this email already exists")

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

    return user, token


def update_user(user: User, **kwargs: Any) -> User:
    """Update user fields.

    Args:
        user: User instance to update
        **kwargs: Fields to update

    Returns:
        Updated User instance
    """
    for field, value in kwargs.items():
        if hasattr(user, field):
            setattr(user, field, value)

    user.save()
    return user


def delete_user(user: User) -> None:
    """Delete a user.

    Args:
        user: User instance to delete

    Raises:
        ValueError: If trying to delete admin user
    """
    if user.role == "admin":
        raise ValueError("Cannot delete admin user")

    user.delete()


def validate_invitation_token(token: str) -> tuple[bool, User | None, str | None]:
    """Validate an invitation token.

    Args:
        token: Invitation token to validate

    Returns:
        Tuple of (is_valid, user, error_message)
    """
    try:
        user = User.objects.get(invitation_token=token)

        if not user.is_invitation_valid():
            return False, None, "Invitation token has expired"

        if user.is_active:
            return False, None, "This invitation has already been used"

        return True, user, None

    except User.DoesNotExist:
        return False, None, "Invalid invitation token"
