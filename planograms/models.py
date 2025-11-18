from django.db import models
from django.utils.text import slugify
from django.conf import settings


class Planogram(models.Model):
    """Planogram (POG) - a layout arrangement for a specific display in a project"""
    SEASON_CHOICES = [
        ('spring', 'Spring'),
        ('summer', 'Summer'),
        ('fall', 'Fall'),
        ('winter', 'Winter'),
    ]
    
    name = models.CharField(max_length=255)
    season = models.CharField(max_length=20, choices=SEASON_CHOICES, default='summer')
    project = models.ForeignKey('projects.Project', on_delete=models.CASCADE, related_name='planograms')
    company = models.ForeignKey('accounts.Company', on_delete=models.CASCADE, related_name='planograms')
    display = models.ForeignKey('displays.Display', on_delete=models.SET_NULL, null=True, blank=True, related_name='planograms', help_text="Optional reference to display used for dimensions")
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='created_planograms')
    updated_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='updated_planograms')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # Store dimensions directly (used for layout calculations)
    width_in = models.DecimalField(max_digits=10, decimal_places=2, help_text="Display width in inches")
    height_in = models.DecimalField(max_digits=10, decimal_places=2, help_text="Display height in inches")
    depth_in = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True, help_text="Display depth in inches")
    shelf_count = models.IntegerField(help_text="Number of shelves")
    shelf_spacing = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True, help_text="Shelf spacing in inches")
    
    # Store selected category IDs as JSON array
    # Example: [1, 2, 6] where 1=beef, 2=pork, 6=seafood
    category_ids = models.JSONField(default=list, help_text="List of selected category IDs")
    
    # Store layout data as JSON
    # Format: {row_id: [LayoutItem, ...], ...}
    layout = models.JSONField(default=dict, null=True, blank=True, help_text="Stored layout data from frontend")
    preserve_layout = models.BooleanField(default=False, help_text="If True, use saved layout instead of regenerating")

    class Meta:
        ordering = ['-created_at']

    @property
    def slug(self):
        """Generate a URL-friendly slug from name"""
        return slugify(self.name)

    def __str__(self):
        return f"{self.name} ({self.project.name})"
