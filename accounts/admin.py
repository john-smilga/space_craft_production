from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, Company


@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ['name', 'tax_id', 'created_at']
    search_fields = ['name', 'tax_id']
    fields = ['name', 'tax_id', 'description', 'created_at']
    readonly_fields = ['created_at']


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ['username', 'email', 'get_role_display', 'company', 'is_active', 'invitation_token']
    list_filter = ['role', 'company', 'is_active']
    search_fields = ['username', 'email']
    
    def get_role_display(self, obj):
        """Display role, or 'Super Admin' for superusers"""
        if obj.is_superuser:
            return 'Super Admin'
        return obj.get_role_display()
    get_role_display.short_description = 'Role'
    
    
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Additional Info', {'fields': ('company', 'role', 'invitation_token', 'invitation_expires_at')}),
    )
    
    add_fieldsets = BaseUserAdmin.add_fieldsets + (
        ('Additional Info', {'fields': ('company', 'role', 'email')}),
    )
