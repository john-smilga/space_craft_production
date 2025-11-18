from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Store


def get_store_data(store):
    """Helper function to get store data"""
    return {
        'id': store.id,
        'name': store.name,
        'store_code': store.store_code,
        'slug': store.slug,
        'address': store.address,
        'company': {
            'id': store.company.id,
            'name': store.company.name,
        },
        'created_at': store.created_at.isoformat() if store.created_at else None,
        'created_by': {
            'id': store.created_by.id,
            'username': store.created_by.username,
        } if store.created_by else None,
    }


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def list_or_create_stores(request):
    """List all stores or create a new store (all users can view, admin can create)"""
    if not request.user.company:
        return Response({'error': 'User is not associated with a company'}, status=400)
    
    if request.method == 'GET':
        stores = Store.objects.filter(company=request.user.company).order_by('-created_at')
        return Response({
            'stores': [get_store_data(store) for store in stores]
        })
    
    elif request.method == 'POST':
        # Only admin can create
        if request.user.role != 'admin':
            return Response({'error': 'Only admins can create stores'}, status=403)
        
        name = request.data.get('name')
        store_code = request.data.get('store_code')
        address = request.data.get('address')
        
        if not name or not store_code or not address:
            return Response({'error': 'Name, store_code, and address are required'}, status=400)
        
        # Check if store_code already exists for this company
        if Store.objects.filter(company=request.user.company, store_code=store_code).exists():
            return Response({'error': 'Store code already exists for this company'}, status=400)
        
        store = Store.objects.create(
            name=name,
            store_code=store_code,
            address=address,
            company=request.user.company,
            created_by=request.user,
        )
        
        return Response({
            'store': get_store_data(store)
        }, status=201)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def get_or_update_or_delete_store(request, store_slug):
    """Get, update, or delete a store by slug (all users can view, admin can update/delete)"""
    if not request.user.company:
        return Response({'error': 'User is not associated with a company'}, status=400)
    
    # Find store by matching slugified store_code
    # Since slug is derived from store_code, we need to check all stores
    # This is acceptable as stores are filtered by company (typically small set)
    stores = Store.objects.filter(company=request.user.company)
    store = None
    for s in stores:
        if s.slug == store_slug:
            store = s
            break
    
    if not store:
        return Response({'error': 'Store not found'}, status=404)
    
    if request.method == 'GET':
        return Response({
            'store': get_store_data(store)
        })
    
    elif request.method == 'PUT':
        # Only admin can update
        if request.user.role != 'admin':
            return Response({'error': 'Only admins can update stores'}, status=403)
        
        name = request.data.get('name')
        store_code = request.data.get('store_code')
        address = request.data.get('address')
        
        if name:
            store.name = name
        if store_code:
            # Check if store_code already exists for another store in this company
            if Store.objects.filter(company=request.user.company, store_code=store_code).exclude(id=store.id).exists():
                return Response({'error': 'Store code already exists for this company'}, status=400)
            store.store_code = store_code
        if address:
            store.address = address
        
        store.save()
        return Response({
            'store': get_store_data(store)
        })
    
    elif request.method == 'DELETE':
        # Only admin can delete
        if request.user.role != 'admin':
            return Response({'error': 'Only admins can delete stores'}, status=403)
        
        store.delete()
        return Response({'message': 'Store deleted successfully'}, status=200)
