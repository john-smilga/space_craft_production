from django.urls import path
from . import views

urlpatterns = [
    path('auth/register/', views.register, name='register'),
    path('auth/login/', views.login, name='login'),
    path('auth/logout/', views.logout, name='logout'),
    path('auth/validate-invitation/', views.validate_invitation, name='validate-invitation'),
    path('users/me/', views.me, name='me'),
    path('users/invite/', views.invite_user, name='invite-user'),
    path('users/', views.list_users, name='list-users'),
    path('users/<str:user_slug>/', views.get_or_delete_user, name='get-or-delete-user'),
    path('users/me/username/', views.update_username, name='update-username'),
]
