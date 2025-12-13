from django.conf import settings
from django.db import models
from django.utils.text import slugify


class Display(models.Model):
    """Display catalog - can be standard (available to all companies) or custom (company-specific)

    Standard displays are available to all companies and are managed by superusers.
    Custom displays are created by company users for their specific needs.
    """

    TYPE_CHOICES = [
        ("gondola", "Gondola"),
        ("endcap", "Endcap"),
        ("wall_unit", "Wall Unit"),
        ("refrigerated_case", "Refrigerated Case"),
        ("freezer_case", "Freezer Case"),
        ("island_display", "Island Display"),
        ("checkout_counter", "Checkout Counter"),
        ("shelf", "Shelf"),
        ("rack", "Rack"),
        ("bin", "Bin"),
        ("other", "Other"),
    ]

    DISPLAY_CATEGORY_CHOICES = [
        ("standard", "Standard"),
        ("custom", "Custom"),
    ]

    name = models.CharField(max_length=255)
    type = models.CharField(max_length=50, choices=TYPE_CHOICES)
    width_in = models.DecimalField(max_digits=10, decimal_places=2)
    height_in = models.DecimalField(max_digits=10, decimal_places=2)
    depth_in = models.DecimalField(max_digits=10, decimal_places=2)
    shelf_count = models.IntegerField()
    shelf_spacing = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True
    )
    display_category = models.CharField(
        max_length=20,
        choices=DISPLAY_CATEGORY_CHOICES,
        default="custom",
        help_text="Standard displays are available to all companies, custom displays are company-specific",
    )
    company = models.ForeignKey(
        "accounts.Company",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="displays",
        help_text="Null for standard displays, set for custom displays",
    )
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name="created_displays",
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["company"]),
            models.Index(fields=["display_category"]),
        ]

    def save(self, *args, **kwargs):
        """Automatically set display_category based on company"""
        if self.company is None:
            self.display_category = "standard"
        else:
            self.display_category = "custom"
        super().save(*args, **kwargs)

    @property
    def slug(self):
        """Generate a URL-friendly slug from name"""
        return slugify(self.name)

    def __str__(self):
        return f"{self.name} ({self.type or 'Display'})"
