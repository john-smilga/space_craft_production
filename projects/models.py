from django.db import models
from django.utils.text import slugify
from django.conf import settings


class Project(models.Model):
    """Project - store-specific collection of POGs"""
    name = models.CharField(max_length=255)
    store = models.ForeignKey('stores.Store', on_delete=models.CASCADE, related_name='projects')
    company = models.ForeignKey('accounts.Company', on_delete=models.CASCADE, related_name='projects')
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='created_projects')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    @property
    def slug(self):
        """Generate a URL-friendly slug from store_code and name"""
        return slugify(f"{self.store.store_code}-{self.name}")

    def __str__(self):
        return f"{self.name} ({self.store.name})"
