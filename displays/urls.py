from django.urls import path
from . import views

urlpatterns = [
    path('displays/types/', views.get_display_types, name='get-display-types'),
    path('displays/standards/', views.get_standard_displays, name='get-standard-displays'),
    path('displays/', views.list_or_create_displays, name='list-or-create-displays'),
    path('displays/<str:display_slug>/', views.get_or_delete_display, name='get-or-delete-display'),
]

