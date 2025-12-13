import secrets
from datetime import timedelta

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone
from django.utils.text import slugify


class Company(models.Model):
    name = models.CharField(max_length=255, unique=True)
    tax_id = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class User(AbstractUser):
    ROLE_CHOICES = [
        ("admin", "Admin"),
        ("member", "Member"),
    ]

    company = models.ForeignKey(
        Company, on_delete=models.CASCADE, related_name="users", null=True, blank=True
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default="member")
    invitation_token = models.CharField(
        max_length=64, unique=True, null=True, blank=True
    )
    invitation_expires_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        indexes = [
            models.Index(fields=["company"]),
            models.Index(fields=["email"]),
        ]

    def generate_invitation_token(self):
        """Generate a unique invitation token"""
        token = secrets.token_urlsafe(32)
        self.invitation_token = token
        self.invitation_expires_at = timezone.now() + timedelta(
            days=7
        )  # Token expires in 7 days
        self.save()
        return token

    def is_invitation_valid(self):
        """Check if invitation token is valid and not expired"""
        if not self.invitation_token or not self.invitation_expires_at:
            return False
        return timezone.now() < self.invitation_expires_at

    @property
    def slug(self):
        """Generate a URL-friendly slug from username"""
        return slugify(self.username)

    def __str__(self):
        return f"{self.username} ({self.role})"
