from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Project
from stores.models import Store


def get_project_data(project):
    """Helper function to get project data"""
    # Handle case where store might be deleted (shouldn't happen with CASCADE, but safety check)
    store_data = None
    if project.store:
        store_data = {
            'id': project.store.id,
            'name': project.store.name,
            'store_code': project.store.store_code,
            'slug': project.store.slug,
        }
    
    return {
        'id': project.id,
        'name': project.name,
        'slug': project.slug,
        'store': store_data,
        'company': {
            'id': project.company.id,
            'name': project.company.name,
        } if project.company else None,
        'created_at': project.created_at.isoformat() if project.created_at else None,
        'created_by': {
            'id': project.created_by.id,
            'username': project.created_by.username,
        } if project.created_by else None,
    }


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def list_or_create_projects(request):
    """List all projects or create a new project (all authenticated users can view and create)"""
    if not request.user.company:
        return Response({'error': 'User is not associated with a company'}, status=400)
    
    if request.method == 'GET':
        projects = Project.objects.filter(company=request.user.company).order_by('-created_at')
        return Response({
            'projects': [get_project_data(project) for project in projects]
        })
    
    elif request.method == 'POST':
        name = request.data.get('name')
        store_slug = request.data.get('store_slug')
        
        if not name or not store_slug:
            return Response({'error': 'Name and store_slug are required'}, status=400)
        
        # Find store by slug
        stores = Store.objects.filter(company=request.user.company)
        store = None
        for s in stores:
            if s.slug == store_slug:
                store = s
                break
        
        if not store:
            return Response({'error': 'Store not found or you do not have access to it'}, status=404)
        
        project = Project.objects.create(
            name=name,
            store=store,
            company=request.user.company,
            created_by=request.user,
        )
        
        return Response({
            'project': get_project_data(project)
        }, status=201)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def get_or_update_or_delete_project(request, project_slug):
    """Get, update, or delete a project by slug (all authenticated users can view, update, and delete)"""
    if not request.user.company:
        return Response({'error': 'User is not associated with a company'}, status=400)
    
    # Find project by matching slug (format: store_code-project_name)
    # The slug now includes store_code, so we can directly match
    projects = Project.objects.filter(company=request.user.company)
    project = None
    for p in projects:
        if p.slug == project_slug:
            project = p
            break
    
    if not project:
        return Response({'error': 'Project not found'}, status=404)
    
    if request.method == 'GET':
        return Response({
            'project': get_project_data(project)
        })
    
    elif request.method == 'PUT':
        name = request.data.get('name')
        store_slug = request.data.get('store_slug')
        
        if name:
            project.name = name
        
        if store_slug:
            # Find store by slug
            stores = Store.objects.filter(company=request.user.company)
            store = None
            for s in stores:
                if s.slug == store_slug:
                    store = s
                    break
            
            if not store:
                return Response({'error': 'Store not found or you do not have access to it'}, status=404)
            
            project.store = store
        
        project.save()
        return Response({
            'project': get_project_data(project)
        })
    
    elif request.method == 'DELETE':
        project.delete()
        return Response({'message': 'Project deleted successfully'}, status=200)
