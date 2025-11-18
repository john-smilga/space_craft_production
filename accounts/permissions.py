from rest_framework import permissions


class IsAdmin(permissions.BasePermission):
    """Permission class to check if user is an admin"""
    
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.role == 'admin'


class IsSuperuser(permissions.BasePermission):
    """Permission class to check if user is a superuser"""
    
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.is_superuser

