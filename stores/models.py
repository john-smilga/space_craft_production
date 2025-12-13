from django.conf import settings
from django.db import models
from django.utils.text import slugify


class Store(models.Model):
    name = models.CharField(max_length=255)
    store_code = models.CharField(max_length=50)
    address = models.TextField()
    company = models.ForeignKey(
        "accounts.Company", on_delete=models.CASCADE, related_name="stores"
    )
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name="created_stores",
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = [["company", "store_code"]]
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["company"]),
            models.Index(fields=["created_at"]),
        ]

    @property
    def slug(self):
        """Generate a URL-friendly slug from store_code"""
        return slugify(self.store_code)

    def __str__(self):
        return f"{self.name} ({self.store_code})"
