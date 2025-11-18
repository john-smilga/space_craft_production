from django.contrib import admin
from .models import Display


@admin.register(Display)
class DisplayAdmin(admin.ModelAdmin):
    list_display = ['name', 'type', 'display_category', 'company', 'created_at']
    list_filter = ['type', 'display_category', 'company', 'created_at']
    search_fields = ['name', 'type', 'company__name']
    readonly_fields = ['display_category', 'created_at']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'type', 'display_category', 'company')
        }),
        ('Dimensions', {
            'fields': ('width_in', 'height_in', 'depth_in')
        }),
        ('Shelf Configuration', {
            'fields': ('shelf_count', 'shelf_spacing')
        }),
        ('Metadata', {
            'fields': ('created_by', 'created_at'),
            'classes': ('collapse',)
        }),
    )
    
    def get_queryset(self, request):
        """Show all displays (company and standard) in admin"""
        return super().get_queryset(request)
