from django.urls import path
from . import views

urlpatterns = [
    path('stores/', views.list_or_create_stores, name='list-or-create-stores'),
    path('stores/<str:store_slug>/', views.get_or_update_or_delete_store, name='get-or-update-or-delete-store'),
]

