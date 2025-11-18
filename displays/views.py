from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Display


def get_display_data(display):
    """Helper function to get display data"""
    data = {
        'id': display.id,
        'name': display.name,
        'type': display.type,
        'type_display': display.get_type_display(),
        'width_in': float(display.width_in),
        'height_in': float(display.height_in),
        'depth_in': float(display.depth_in) if display.depth_in else None,
        'shelf_count': display.shelf_count,
        'shelf_spacing': float(display.shelf_spacing) if display.shelf_spacing else None,
        'slug': display.slug,
        'display_category': display.display_category,
        'company': {
            'id': display.company.id,
            'name': display.company.name,
        } if display.company else None,
        'created_at': display.created_at.isoformat() if display.created_at else None,
        'created_by': {
            'id': display.created_by.id,
            'username': display.created_by.username,
        } if display.created_by else None,
    }
    
    return data


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_display_types(request):
    """Get available display types (choices from model)"""
    return Response({
        'types': [{'value': choice[0], 'label': choice[1]} for choice in Display.TYPE_CHOICES]
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_standard_displays(request):
    """Get standard display templates (displays with display_category='standard', available to all companies)"""
    standards = Display.objects.filter(display_category='standard').order_by('type', 'name')
    return Response({
        'standards': [get_display_data(standard) for standard in standards]
    })


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def list_or_create_displays(request):
    """List all displays or create a new display (all authenticated users can view and create)"""
    if not request.user.company:
        return Response({'error': 'User is not associated with a company'}, status=400)
    
    if request.method == 'GET':
        displays = Display.objects.filter(company=request.user.company).order_by('-created_at')
        return Response({
            'displays': [get_display_data(display) for display in displays]
        })
    
    elif request.method == 'POST':
        name = request.data.get('name')
        display_type = request.data.get('type')
        width_in = request.data.get('width_in')
        height_in = request.data.get('height_in')
        depth_in = request.data.get('depth_in')
        shelf_count = request.data.get('shelf_count')
        shelf_spacing = request.data.get('shelf_spacing')
        
        if not name or not display_type or width_in is None or height_in is None or depth_in is None or shelf_count is None:
            return Response({'error': 'Name, type, width_in, height_in, depth_in, and shelf_count are required'}, status=400)
        
        # Validate type is a valid choice
        valid_types = [choice[0] for choice in Display.TYPE_CHOICES]
        if display_type not in valid_types:
            return Response({'error': f'Invalid type. Must be one of: {", ".join(valid_types)}'}, status=400)
        
        display = Display.objects.create(
            name=name,
            type=display_type,
            width_in=width_in,
            height_in=height_in,
            depth_in=depth_in,
            shelf_count=shelf_count,
            shelf_spacing=shelf_spacing,
            company=request.user.company,
            created_by=request.user,
        )
        
        return Response({
            'display': get_display_data(display)
        }, status=201)


@api_view(['GET', 'DELETE'])
@permission_classes([IsAuthenticated])
def get_or_delete_display(request, display_slug):
    """Get or delete a display by slug (all authenticated users can view and delete)"""
    if not request.user.company:
        return Response({'error': 'User is not associated with a company'}, status=400)
    
    # Find display by matching slugified name
    displays = Display.objects.filter(company=request.user.company)
    display = None
    for d in displays:
        if d.slug == display_slug:
            display = d
            break
    
    if not display:
        return Response({'error': 'Display not found'}, status=404)
    
    if request.method == 'GET':
        return Response({
            'display': get_display_data(display)
        })
    
    elif request.method == 'DELETE':
        # Standard displays cannot be deleted via API, only via admin
        if display.display_category == 'standard':
            return Response({'error': 'Standard displays cannot be deleted via API. Please use the admin panel.'}, status=403)
        
        display.delete()
        return Response({'message': 'Display deleted successfully'}, status=200)
