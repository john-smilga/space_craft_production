from django.urls import path
from . import views

urlpatterns = [
    path('projects/', views.list_or_create_projects, name='list-or-create-projects'),
    path('projects/<str:project_slug>/', views.get_or_update_or_delete_project, name='get-or-update-or-delete-project'),
]

