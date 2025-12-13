"""Tests for accounts views."""

from datetime import timedelta

import pytest
from django.contrib.auth import get_user_model
from django.utils import timezone
from rest_framework import status

from factories import AdminUserFactory, CompanyFactory, UserFactory

User = get_user_model()


@pytest.mark.django_db
class TestValidateInvitation:
    """Tests for validate_invitation endpoint."""

    def test_validate_valid_invitation(self, api_client):
        """Test validating a valid invitation token."""
        company = CompanyFactory()
        user = UserFactory(company=company, is_active=False)
        token = user.generate_invitation_token()

        response = api_client.get("/api/auth/validate-invitation/", {"token": token})

        assert response.status_code == status.HTTP_200_OK
        assert response.data["valid"] is True
        assert response.data["email"] == user.email
        assert response.data["company"]["name"] == company.name

    def test_validate_expired_invitation(self, api_client):
        """Test validating an expired invitation token."""
        user = UserFactory(is_active=False)
        user.generate_invitation_token()
        user.invitation_expires_at = timezone.now() - timedelta(days=1)
        user.save()

        response = api_client.get(
            "/api/auth/validate-invitation/", {"token": user.invitation_token}
        )

        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert "expired" in response.data["error"].lower()

    def test_validate_already_used_invitation(self, api_client):
        """Test validating an invitation that's already been used."""
        user = UserFactory(is_active=True)
        token = user.generate_invitation_token()

        response = api_client.get("/api/auth/validate-invitation/", {"token": token})

        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert "already been used" in response.data["error"].lower()

    def test_validate_invalid_token(self, api_client):
        """Test validating an invalid token."""
        response = api_client.get(
            "/api/auth/validate-invitation/", {"token": "invalid-token"}
        )

        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert "invalid" in response.data["error"].lower()

    def test_validate_missing_token(self, api_client):
        """Test validating without providing a token."""
        response = api_client.get("/api/auth/validate-invitation/")

        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert "required" in response.data["error"].lower()


@pytest.mark.django_db
class TestRegister:
    """Tests for register endpoint."""

    def test_register_with_valid_token(self, api_client):
        """Test registering a user with a valid invitation token."""
        company = CompanyFactory()
        user = UserFactory(company=company, is_active=False)
        token = user.generate_invitation_token()

        response = api_client.post(
            "/api/auth/register/",
            {
                "token": token,
                "password": "newpassword123",
                "username": "newusername",
            },
            format="json",
        )

        assert response.status_code == status.HTTP_200_OK
        assert "username" in response.data
        assert response.data["username"] == "newusername"
        assert "jwt" in response.cookies

        user.refresh_from_db()
        assert user.is_active is True
        assert user.invitation_token is None
        assert user.check_password("newpassword123")

    def test_register_without_username(self, api_client):
        """Test registering without providing username (keeps original)."""
        user = UserFactory(is_active=False, username="originaluser")
        token = user.generate_invitation_token()

        response = api_client.post(
            "/api/auth/register/",
            {
                "token": token,
                "password": "newpassword123",
            },
            format="json",
        )

        assert response.status_code == status.HTTP_200_OK
        user.refresh_from_db()
        assert user.username == "originaluser"

    def test_register_with_expired_token(self, api_client):
        """Test registering with an expired token."""
        user = UserFactory(is_active=False)
        user.generate_invitation_token()
        user.invitation_expires_at = timezone.now() - timedelta(days=1)
        user.save()

        response = api_client.post(
            "/api/auth/register/",
            {
                "token": user.invitation_token,
                "password": "newpassword123",
            },
            format="json",
        )

        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert "expired" in response.data["error"].lower()

    def test_register_missing_password(self, api_client):
        """Test registering without password."""
        user = UserFactory(is_active=False)
        token = user.generate_invitation_token()

        response = api_client.post(
            "/api/auth/register/", {"token": token}, format="json"
        )

        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert "required" in response.data["error"].lower()


@pytest.mark.django_db
class TestLogin:
    """Tests for login endpoint."""

    def test_login_with_valid_credentials(self, api_client):
        """Test logging in with valid credentials."""
        user = UserFactory()
        user.set_password("password123")
        user.save()

        response = api_client.post(
            "/api/auth/login/",
            {
                "email": user.email,
                "password": "password123",
            },
            format="json",
        )

        assert response.status_code == status.HTTP_200_OK
        assert "email" in response.data
        assert response.data["email"] == user.email
        assert "jwt" in response.cookies

    def test_login_with_invalid_password(self, api_client):
        """Test logging in with invalid password."""
        user = UserFactory()
        user.set_password("password123")
        user.save()

        response = api_client.post(
            "/api/auth/login/",
            {
                "email": user.email,
                "password": "wrongpassword",
            },
            format="json",
        )

        assert response.status_code == status.HTTP_401_UNAUTHORIZED
        assert "invalid credentials" in response.data["error"].lower()

    def test_login_with_nonexistent_email(self, api_client):
        """Test logging in with non-existent email."""
        response = api_client.post(
            "/api/auth/login/",
            {
                "email": "nonexistent@example.com",
                "password": "password123",
            },
            format="json",
        )

        assert response.status_code == status.HTTP_401_UNAUTHORIZED
        assert "invalid credentials" in response.data["error"].lower()

    def test_login_inactive_user(self, api_client):
        """Test logging in with inactive account."""
        user = UserFactory(is_active=False)
        user.set_password("password123")
        user.save()

        response = api_client.post(
            "/api/auth/login/",
            {
                "email": user.email,
                "password": "password123",
            },
            format="json",
        )

        assert response.status_code == status.HTTP_401_UNAUTHORIZED
        assert "not active" in response.data["error"].lower()


@pytest.mark.django_db
class TestLogout:
    """Tests for logout endpoint."""

    def test_logout_authenticated_user(self, authenticated_client):
        """Test logging out an authenticated user."""
        response = authenticated_client.post("/api/auth/logout/")

        assert response.status_code == status.HTTP_200_OK
        assert "message" in response.data

    def test_logout_unauthenticated_user(self, api_client):
        """Test logout requires authentication."""
        response = api_client.post("/api/auth/logout/")

        assert response.status_code == status.HTTP_401_UNAUTHORIZED


@pytest.mark.django_db
class TestMe:
    """Tests for me endpoint."""

    def test_me_authenticated_user(self, authenticated_client, user):
        """Test getting current user info when authenticated."""
        response = authenticated_client.get("/api/users/me/")

        assert response.status_code == status.HTTP_200_OK
        assert response.data["email"] == user.email
        assert response.data["username"] == user.username

    def test_me_unauthenticated_user(self, api_client):
        """Test me endpoint requires authentication."""
        response = api_client.get("/api/users/me/")

        assert response.status_code == status.HTTP_401_UNAUTHORIZED


@pytest.mark.django_db
class TestUserViewSetList:
    """Tests for UserViewSet list action."""

    def test_list_users_as_admin(self, admin_client, company):
        """Test listing users as admin."""
        UserFactory.create_batch(3, company=company)

        response = admin_client.get("/api/users/")

        assert response.status_code == status.HTTP_200_OK
        assert response.data["count"] == 3

    def test_list_users_company_isolation(self, admin_client, company):
        """Test users from other companies are not visible."""
        UserFactory.create_batch(2, company=company)
        other_company = CompanyFactory()
        UserFactory.create_batch(3, company=other_company)

        response = admin_client.get("/api/users/")

        assert response.status_code == status.HTTP_200_OK
        assert response.data["count"] == 2

    def test_list_users_as_member(self, authenticated_client):
        """Test listing users as non-admin is forbidden."""
        response = authenticated_client.get("/api/users/")

        assert response.status_code == status.HTTP_403_FORBIDDEN

    def test_list_users_unauthenticated(self, api_client):
        """Test listing users requires authentication."""
        response = api_client.get("/api/users/")

        assert response.status_code == status.HTTP_401_UNAUTHORIZED


@pytest.mark.django_db
class TestUserViewSetRetrieve:
    """Tests for UserViewSet retrieve action."""

    def test_retrieve_user_as_admin(self, admin_client, company):
        """Test retrieving a user as admin."""
        user = UserFactory(company=company)

        response = admin_client.get(f"/api/users/{user.slug}/")

        assert response.status_code == status.HTTP_200_OK
        assert response.data["email"] == user.email

    def test_retrieve_user_from_other_company(self, admin_client):
        """Test retrieving user from another company is forbidden."""
        other_company = CompanyFactory()
        other_user = UserFactory(company=other_company)

        response = admin_client.get(f"/api/users/{other_user.slug}/")

        assert response.status_code == status.HTTP_404_NOT_FOUND


@pytest.mark.django_db
class TestUserViewSetUpdate:
    """Tests for UserViewSet update action."""

    def test_update_user_as_admin(self, admin_client, company):
        """Test updating a user as admin."""
        user = UserFactory(company=company, role="member")

        response = admin_client.patch(
            f"/api/users/{user.slug}/", {"role": "admin"}, format="json"
        )

        assert response.status_code == status.HTTP_200_OK
        user.refresh_from_db()
        assert user.role == "admin"

    def test_update_user_as_member(self, authenticated_client, company):
        """Test updating user as non-admin is forbidden."""
        other_user = UserFactory(company=company)

        response = authenticated_client.patch(
            f"/api/users/{other_user.slug}/", {"role": "admin"}, format="json"
        )

        assert response.status_code == status.HTTP_403_FORBIDDEN


@pytest.mark.django_db
class TestUserViewSetDestroy:
    """Tests for UserViewSet destroy action."""

    def test_delete_user_as_admin(self, admin_client, company):
        """Test deleting a user as admin."""
        user = UserFactory(company=company, role="member")

        response = admin_client.delete(f"/api/users/{user.slug}/")

        assert response.status_code == status.HTTP_204_NO_CONTENT
        assert not User.objects.filter(id=user.id, is_active=True).exists()

    def test_delete_admin_user(self, admin_client, company):
        """Test cannot delete admin users."""
        admin = AdminUserFactory(company=company)

        response = admin_client.delete(f"/api/users/{admin.slug}/")

        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert "cannot delete admin" in response.data["error"].lower()

    def test_delete_self(self, admin_client, admin_user):
        """Test cannot delete own account (returns 404 because current user excluded from queryset)."""
        response = admin_client.delete(f"/api/users/{admin_user.slug}/")

        # Returns 404 because get_queryset excludes current user
        assert response.status_code == status.HTTP_404_NOT_FOUND


@pytest.mark.django_db
class TestUserViewSetInvite:
    """Tests for UserViewSet invite action."""

    def test_invite_user_as_admin(self, admin_client):
        """Test creating an invitation as admin."""
        response = admin_client.post(
            "/api/users/invite/",
            {
                "email": "newuser@example.com",
                "username": "newuser",
                "first_name": "New",
                "last_name": "User",
                "role": "member",
            },
            format="json",
        )

        assert response.status_code == status.HTTP_201_CREATED
        assert "invitation_token" in response.data
        assert "invitation_link" in response.data

        user = User.objects.get(email="newuser@example.com")
        assert user.is_active is False
        assert user.invitation_token is not None

    def test_invite_user_as_member(self, authenticated_client):
        """Test creating invitation as non-admin is forbidden."""
        response = authenticated_client.post(
            "/api/users/invite/",
            {
                "email": "newuser@example.com",
                "username": "newuser",
            },
            format="json",
        )

        assert response.status_code == status.HTTP_403_FORBIDDEN


@pytest.mark.django_db
class TestUserViewSetUpdateUsername:
    """Tests for UserViewSet update_username action."""

    def test_update_own_username(self, admin_client, admin_user):
        """Test updating own username (requires admin permission)."""
        response = admin_client.patch(
            "/api/users/me/username/", {"username": "newusername"}, format="json"
        )

        assert response.status_code == status.HTTP_200_OK
        assert response.data["username"] == "newusername"
        admin_user.refresh_from_db()
        assert admin_user.username == "newusername"

    def test_update_username_already_taken(self, admin_client, admin_user, company):
        """Test updating username to one that's already taken."""
        existing_user = UserFactory(company=company, username="takenname")

        response = admin_client.patch(
            "/api/users/me/username/", {"username": "takenname"}, format="json"
        )

        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert "already taken" in response.data["error"].lower()

    def test_update_username_missing(self, admin_client):
        """Test updating username without providing new username."""
        response = admin_client.patch("/api/users/me/username/", {}, format="json")

        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert "required" in response.data["error"].lower()
