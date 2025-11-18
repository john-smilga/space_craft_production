from django.urls import path
from . import views

urlpatterns = [
    path('planograms/', views.list_or_create_planograms, name='list-or-create-planograms'),
    path('planograms/<str:planogram_slug>/', views.get_or_update_or_delete_planogram, name='get-or-update-or-delete-planogram'),
    path('planograms/<str:planogram_slug>/ai-overview/', views.get_ai_overview, name='get-ai-overview'),
    path('projects/<str:project_slug>/planograms/', views.get_planograms_by_project, name='get-planograms-by-project'),
]

