import logging
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Planogram

logger = logging.getLogger(__name__)


def get_planogram_data(planogram):
    """Helper function to get planogram data"""
    # Get category names from IDs
    from products.services import get_category_names_by_ids
    category_names = get_category_names_by_ids(planogram.category_ids) if planogram.category_ids else []
    
    return {
        'id': planogram.id,
        'name': planogram.name,
        'season': planogram.season,
        'season_display': planogram.get_season_display(),
        'category_ids': planogram.category_ids,
        'categories': category_names,  # Add category names
        'slug': planogram.slug,
        'shelf_count': planogram.shelf_count,  # Add shelf_count at top level
        'project': {
            'id': planogram.project.id,
            'name': planogram.project.name,
            'slug': planogram.project.slug,
        },
        'display': {
            'id': planogram.display.id if planogram.display else None,
            'name': planogram.display.name if planogram.display else None,
            'type': planogram.display.type if planogram.display else None,
            'slug': planogram.display.slug if planogram.display else None,
            'width_in': float(planogram.width_in) if planogram.width_in else None,
            'height_in': float(planogram.height_in) if planogram.height_in else None,
            'depth_in': float(planogram.depth_in) if planogram.depth_in else None,
            'shelf_count': planogram.shelf_count,
        },
        'company': {
            'id': planogram.company.id,
            'name': planogram.company.name,
        },
        'created_at': planogram.created_at.isoformat() if planogram.created_at else None,
        'updated_at': planogram.updated_at.isoformat() if planogram.updated_at else None,
        'created_by': {
            'id': planogram.created_by.id,
            'username': planogram.created_by.username,
        } if planogram.created_by else None,
        'updated_by': {
            'id': planogram.updated_by.id,
            'username': planogram.updated_by.username,
        } if planogram.updated_by else None,
    }


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def list_or_create_planograms(request):
    """List all planograms or create a new planogram (all authenticated users can view and create)"""
    if not request.user.company:
        return Response({'error': 'User is not associated with a company'}, status=400)
    
    if request.method == 'GET':
        planograms = Planogram.objects.filter(company=request.user.company).order_by('-created_at')
        return Response({
            'planograms': [get_planogram_data(planogram) for planogram in planograms]
        })
    
    elif request.method == 'POST':
        # Log the incoming request
        logger.info("=" * 80)
        logger.info("CREATE PLANOGRAM REQUEST RECEIVED")
        logger.info("=" * 80)
        logger.info(f"User: {request.user.username} (Company: {request.user.company.name})")
        logger.info(f"Request Method: {request.method}")
        logger.info(f"Request Data: {request.data}")
        logger.info(f"Request Headers: {dict(request.headers)}")
        logger.info("=" * 80)
        
        name = request.data.get('name')
        project_slug = request.data.get('project_slug')
        display_id = request.data.get('display_id')  # Optional - will auto-select if not provided
        season = request.data.get('season', 'summer')  # Default to summer
        category_ids = request.data.get('category_ids', [1])  # Default to beef (category ID 1)
        
        if not name or not project_slug:
            return Response({'error': 'Name and project_slug are required'}, status=400)
        
        # Find project by slug
        from projects.models import Project
        projects = Project.objects.filter(company=request.user.company)
        project = None
        for p in projects:
            if p.slug == project_slug:
                project = p
                break
        
        if not project:
            return Response({'error': 'Project not found or you do not have access to it'}, status=404)
        
        # Get dimensions from display (just for reference, not stored as FK)
        from displays.models import Display
        display = None
        width_in = None
        height_in = None
        depth_in = None
        shelf_count = None
        shelf_spacing = None
        
        # If display_id is provided, use it
        if display_id:
            try:
                display = Display.objects.get(id=display_id)
                # Ensure user has access (either company display or standard)
                if display.company and display.company != request.user.company:
                    return Response({'error': 'Display not found or you do not have access to it'}, status=404)
                width_in = display.width_in
                height_in = display.height_in
                depth_in = display.depth_in
                shelf_count = display.shelf_count
                shelf_spacing = display.shelf_spacing
            except Display.DoesNotExist:
                return Response({'error': 'Display not found'}, status=404)
        else:
            # Auto-select: latest custom display first, or first standard display
            custom_displays = Display.objects.filter(company=request.user.company, display_category='custom').order_by('-id')
            if custom_displays.exists():
                display = custom_displays.first()
            else:
                standard_displays = Display.objects.filter(display_category='standard').order_by('id')
                if standard_displays.exists():
                    display = standard_displays.first()
            
            if display:
                width_in = display.width_in
                height_in = display.height_in
                depth_in = display.depth_in
                shelf_count = display.shelf_count
                shelf_spacing = display.shelf_spacing
        
        if not width_in or not height_in or not shelf_count:
            return Response({'error': 'No display found. Please ensure at least one standard display exists.'}, status=404)
        
        # Default depth_in to 24 if not set
        if depth_in is None:
            from decimal import Decimal
            depth_in = Decimal('24.00')
        
        # Validate season
        valid_seasons = [choice[0] for choice in Planogram.SEASON_CHOICES]
        if season not in valid_seasons:
            return Response({'error': f'Invalid season. Must be one of: {", ".join(valid_seasons)}'}, status=400)
        
        # Validate category_ids (must be a list of integers, can be empty)
        if not isinstance(category_ids, list):
            return Response({'error': 'category_ids must be a list'}, status=400)
        
        # Validate all items are integers (if any)
        if category_ids and not all(isinstance(cid, int) for cid in category_ids):
            return Response({'error': 'All category_ids must be integers'}, status=400)
        
        # Create the planogram with dimensions stored directly
        planogram = Planogram.objects.create(
            name=name,
            project=project,
            company=request.user.company,
            display=display,  # Optional reference
            width_in=width_in,
            height_in=height_in,
            depth_in=depth_in,
            shelf_count=shelf_count,
            shelf_spacing=shelf_spacing,
            season=season,
            category_ids=category_ids,
            created_by=request.user,
        )
        
        display_name = display.name if display else 'Standard Display'
        logger.info(f"Created planogram: id={planogram.id}, name={name}, project={project.name}, display={display_name}, season={season}, category_ids={category_ids}")
        
        # Return only planogram data - layout will be computed when viewing the detail page
        return Response({
            'planogram': get_planogram_data(planogram)
        }, status=201)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_planograms_by_project(request, project_slug):
    """Get all planograms for a specific project"""
    if not request.user.company:
        return Response({'error': 'User is not associated with a company'}, status=400)
    
    # Find project by slug
    from projects.models import Project
    projects = Project.objects.filter(company=request.user.company)
    project = None
    for p in projects:
        if p.slug == project_slug:
            project = p
            break
    
    if not project:
        return Response({'error': 'Project not found'}, status=404)
    
    # Get all planograms for this project
    planograms = Planogram.objects.filter(project=project, company=request.user.company).order_by('-created_at')
    return Response({
        'planograms': [get_planogram_data(planogram) for planogram in planograms]
    })


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def get_or_update_or_delete_planogram(request, planogram_slug):
    """Get, update, or delete a planogram by slug (all authenticated users can view, update, and delete)"""
    if not request.user.company:
        return Response({'error': 'User is not associated with a company'}, status=400)
    
    # Find planogram by matching slugified name
    planograms = Planogram.objects.filter(company=request.user.company)
    planogram = None
    for p in planograms:
        if p.slug == planogram_slug:
            planogram = p
            break
    
    if not planogram:
        return Response({'error': 'Planogram not found'}, status=404)
    
    if request.method == 'GET':
        # Check if we should preserve the saved layout
        if planogram.preserve_layout and planogram.layout:
            # Use saved layout instead of regenerating
            # Convert saved layout format to response format
            try:
                # The saved layout is in format: {row_id: [LayoutItem, ...], ...}
                # We need to convert it to the grid response format
                saved_layout = planogram.layout
                
                # Build rows from saved layout
                rows = []
                for row_id, items in saved_layout.items():
                    if not items:
                        continue
                    
                    # Get row number from row_id (assuming row_id is the row number)
                    row_num = int(row_id) if isinstance(row_id, (int, str)) and str(row_id).isdigit() else len(rows) + 1
                    
                    # Extract categories from items
                    categories_in_row = set()
                    for item in items:
                        if isinstance(item, dict) and 'meta' in item:
                            category = item['meta'].get('category')
                            if category:
                                categories_in_row.add(category)
                    
                    category_labels = sorted(list(categories_in_row))
                    category_label = ", ".join(category_labels) if category_labels else None
                    
                    rows.append({
                        "id": row_num,
                        "category": category_label,
                        "name": f"Shelf {row_num}",
                        "items": items
                    })
                
                # Build grid geometry from planogram dimensions
                from planograms.services.grid_service import compute_grid_geometry
                from planograms.services.validation import parse_planogram_params
                params = parse_planogram_params(planogram.width_in, planogram.height_in, planogram.shelf_count, planogram.season, planogram.category_ids)
                grid_geometry = compute_grid_geometry(
                    shelf_width_in=params['shelf_width'],
                    shelf_height_in=params['shelf_height'],
                    row_count=params['row_count'],
                )
                
                layout = {
                    "grid": grid_geometry,
                    "rows": rows
                }
                
                return Response({
                    'planogram': get_planogram_data(planogram),
                    'layout': layout
                })
            except Exception as e:
                logger.error(f"Error using saved layout for planogram {planogram.id}: {str(e)}")
                # Fall through to regeneration
        
        # Recompute layout for the planogram
        try:
            from planograms.services.validation import parse_planogram_params
            params = parse_planogram_params(planogram.width_in, planogram.height_in, planogram.shelf_count, planogram.season, planogram.category_ids)
            
            from planograms.services.product_service import get_products_for_season_and_categories
            products_by_category = get_products_for_season_and_categories(
                season=params['season'],
                category_ids=params['category_ids']
            )
            
            from planograms.services.grid_service import compute_grid_geometry
            grid_geometry = compute_grid_geometry(
                shelf_width_in=params['shelf_width'],
                shelf_height_in=params['shelf_height'],
                row_count=params['row_count'],
            )
            
            from planograms.services.grid_service import layout_by_score
            layout = layout_by_score(
                products_by_category=products_by_category,
                grid=grid_geometry
            )
            
            return Response({
                'planogram': get_planogram_data(planogram),
                'layout': layout
            })
        except Exception as e:
            logger.error(f"Error computing layout for planogram {planogram.id}: {str(e)}")
            return Response({
                'planogram': get_planogram_data(planogram),
                'layout': None
            })
    
    elif request.method == 'PUT':
        # Update planogram fields
        # Layout is computed on-demand in GET requests - no need to store or invalidate anything
        
        name = request.data.get('name')
        project_slug = request.data.get('project_slug')
        display_slug = request.data.get('display_slug')
        season = request.data.get('season')
        category_ids = request.data.get('category_ids')
        requested_shelf_count = request.data.get('shelf_count')
        layout = request.data.get('layout')  # Layout data from frontend
        preserve_layout = request.data.get('preserve_layout')  # Flag to preserve layout
        
        if name:
            planogram.name = name
        
        if project_slug:
            from projects.models import Project
            projects = Project.objects.filter(company=request.user.company)
            project = None
            for p in projects:
                if p.slug == project_slug:
                    project = p
                    break
            
            if not project:
                return Response({'error': 'Project not found or you do not have access to it'}, status=404)
            
            planogram.project = project
        
        display_id = request.data.get('display_id')
        if display_id:
            from displays.models import Display
            try:
                display = Display.objects.get(id=display_id)
                # Ensure user has access (either company display or standard)
                if display.company and display.company != request.user.company:
                    return Response({'error': 'Display not found or you do not have access to it'}, status=404)
                
                # Update planogram with display values
                planogram.display = display  # Optional reference
                planogram.width_in = display.width_in
                planogram.height_in = display.height_in
                planogram.depth_in = display.depth_in if display.depth_in is not None else planogram.depth_in
                # Only set shelf_count from display if it wasn't explicitly provided in the request
                if requested_shelf_count is None:
                    planogram.shelf_count = display.shelf_count
                planogram.shelf_spacing = display.shelf_spacing
            except Display.DoesNotExist:
                return Response({'error': 'Display not found'}, status=404)
        
        if season:
            valid_seasons = [choice[0] for choice in Planogram.SEASON_CHOICES]
            if season not in valid_seasons:
                return Response({'error': f'Invalid season. Must be one of: {", ".join(valid_seasons)}'}, status=400)
            planogram.season = season
        
        if category_ids is not None:
            # Validate category_ids
            if not isinstance(category_ids, list):
                return Response({'error': 'category_ids must be a list'}, status=400)
            
            if len(category_ids) == 0:
                return Response({'error': 'At least one category must be selected'}, status=400)
            
            if not all(isinstance(cid, int) for cid in category_ids):
                return Response({'error': 'All category_ids must be integers'}, status=400)
            
            planogram.category_ids = category_ids
        
        if requested_shelf_count is not None:
            try:
                shelf_count_int = int(requested_shelf_count)
                if shelf_count_int < 1:
                    return Response({'error': 'Shelf count must be at least 1'}, status=400)
                planogram.shelf_count = shelf_count_int
            except (ValueError, TypeError):
                return Response({'error': 'shelf_count must be a valid integer'}, status=400)
        
        # Save layout data if provided
        if layout is not None:
            if not isinstance(layout, dict):
                return Response({'error': 'layout must be a dictionary'}, status=400)
            # Store layout as JSON in the planogram model
            # Django's JSONField handles the conversion automatically
            planogram.layout = layout
            # Set preserve_layout flag when layout is saved
            planogram.preserve_layout = True
        
        # Handle preserve_layout flag separately (in case it's set without layout)
        if preserve_layout is not None:
            planogram.preserve_layout = bool(preserve_layout)
        
        # Set updated_by from token
        planogram.updated_by = request.user
        planogram.save()
        
        logger.info(f"Updated planogram: id={planogram.id}, name={planogram.name}, display={planogram.display.name}, season={planogram.season}, category_ids={planogram.category_ids}")
        
        # Return only planogram data - layout will be recomputed when viewing the detail page
        return Response({
            'planogram': get_planogram_data(planogram)
        })
    
    elif request.method == 'DELETE':
        planogram.delete()
        return Response({'message': 'Planogram deleted successfully'}, status=200)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_ai_overview(request, planogram_slug):
    """Generate AI overview and analysis for a planogram"""
    from django.conf import settings
    from openai import OpenAI
    
    if not request.user.company:
        return Response({'error': 'User is not associated with a company'}, status=400)
    
    # Check if OpenAI API key is configured
    if not settings.OPENAI_API_KEY:
        return Response({'error': 'OpenAI API key is not configured'}, status=500)
    
    # Find planogram by matching slugified name
    planograms = Planogram.objects.filter(company=request.user.company)
    planogram = None
    for p in planograms:
        if p.slug == planogram_slug:
            planogram = p
            break
    
    if not planogram:
        return Response({'error': 'Planogram not found'}, status=404)
    
    try:
        # Collect all planogram data
        planogram_data = get_planogram_data(planogram)
        
        # Get layout data (similar to GET endpoint logic)
        layout = None
        if planogram.preserve_layout and planogram.layout:
            # Use saved layout
            try:
                saved_layout = planogram.layout
                rows = []
                for row_id, items in saved_layout.items():
                    if not items:
                        continue
                    row_num = int(row_id) if isinstance(row_id, (int, str)) and str(row_id).isdigit() else len(rows) + 1
                    categories_in_row = set()
                    for item in items:
                        if isinstance(item, dict) and 'meta' in item:
                            category = item['meta'].get('category')
                            if category:
                                categories_in_row.add(category)
                    category_labels = sorted(list(categories_in_row))
                    category_label = ", ".join(category_labels) if category_labels else None
                    rows.append({
                        "id": row_num,
                        "category": category_label,
                        "name": f"Shelf {row_num}",
                        "items": items
                    })
                
                from planograms.services.grid_service import compute_grid_geometry
                from planograms.services.validation import parse_planogram_params
                params = parse_planogram_params(planogram.width_in, planogram.height_in, planogram.shelf_count, planogram.season, planogram.category_ids)
                grid_geometry = compute_grid_geometry(
                    shelf_width_in=params['shelf_width'],
                    shelf_height_in=params['shelf_height'],
                    row_count=params['row_count'],
                )
                layout = {
                    "grid": grid_geometry,
                    "rows": rows
                }
            except Exception as e:
                logger.error(f"Error using saved layout for AI overview: {str(e)}")
        
        # If no saved layout, compute it
        if not layout:
            try:
                from planograms.services.validation import parse_planogram_params
                params = parse_planogram_params(planogram.width_in, planogram.height_in, planogram.shelf_count, planogram.season, planogram.category_ids)
                
                from planograms.services.product_service import get_products_for_season_and_categories
                products_by_category = get_products_for_season_and_categories(
                    season=params['season'],
                    category_ids=params['category_ids']
                )
                
                from planograms.services.grid_service import compute_grid_geometry
                grid_geometry = compute_grid_geometry(
                    shelf_width_in=params['shelf_width'],
                    shelf_height_in=params['shelf_height'],
                    row_count=params['row_count'],
                )
                
                from planograms.services.grid_service import layout_by_score
                layout = layout_by_score(
                    products_by_category=products_by_category,
                    grid=grid_geometry
                )
            except Exception as e:
                logger.error(f"Error computing layout for AI overview: {str(e)}")
                return Response({'error': 'Failed to compute layout'}, status=500)
        
        # Format data for AI prompt
        prompt = _format_planogram_data_for_ai(planogram_data, layout)
        
        # Call OpenAI API
        # Using gpt-4o-mini as default (cost-effective and widely available)
        # Alternative options: "gpt-4.1-nano" (cheapest), "gpt-4.1-mini", "gpt-4o", "gpt-4-turbo"
        client = OpenAI(api_key=settings.OPENAI_API_KEY)
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": "You are a retail planogram analyst expert. Analyze planogram layouts and provide insights on why they work for specific seasons, how they help sales, and their strengths. Be concise but informative."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.7,
            max_tokens=300
        )
        
        ai_overview = response.choices[0].message.content
        
        return Response({
            'overview': ai_overview
        })
        
    except Exception as e:
        # Log the full error for debugging
        logger.error(f"Error generating AI overview: {str(e)}")
        # Return simple user-friendly message
        return Response({'error': 'There was an error. Please try later.'}, status=500)


def _format_planogram_data_for_ai(planogram_data, layout):
    """Format planogram data into a readable prompt for AI"""
    lines = []
    
    lines.append("=== PLANOGRAM ANALYSIS REQUEST ===\n")
    lines.append(f"Planogram Name: {planogram_data['name']}")
    lines.append(f"Season: {planogram_data['season_display']} ({planogram_data['season']})")
    lines.append(f"\nDimensions:")
    lines.append(f"  - Width: {planogram_data.get('display', {}).get('width_in', 'N/A')} inches")
    lines.append(f"  - Height: {planogram_data.get('display', {}).get('height_in', 'N/A')} inches")
    lines.append(f"  - Depth: {planogram_data.get('display', {}).get('depth_in', 'N/A')} inches")
    lines.append(f"  - Shelf Count: {planogram_data['shelf_count']}")
    
    if planogram_data.get('categories'):
        lines.append(f"\nSelected Categories:")
        for cat in planogram_data['categories']:
            lines.append(f"  - {cat.get('name', 'Unknown')} (ID: {cat.get('id', 'N/A')})")
    
    if layout and layout.get('grid'):
        grid = layout['grid']
        lines.append(f"\nGrid Configuration:")
        lines.append(f"  - Columns: {grid.get('cols', 'N/A')}")
        lines.append(f"  - Rows: {grid.get('rows', 'N/A')}")
        lines.append(f"  - Cell Width: {grid.get('cellWidthIn', 'N/A')} inches")
    
    if layout and layout.get('rows'):
        lines.append(f"\nProduct Layout by Shelf:")
        for row in layout['rows']:
            lines.append(f"\n  Shelf {row.get('id', 'N/A')} ({row.get('name', 'Unknown')}):")
            if row.get('category'):
                lines.append(f"    Category: {row['category']}")
            
            items = row.get('items', [])
            if items:
                lines.append(f"    Products ({len(items)} items):")
                for item in items[:10]:  # Limit to first 10 items per row
                    meta = item.get('meta', {})
                    name = meta.get('name', 'Unknown')
                    score = meta.get('score', 0)
                    category = meta.get('category', 'Unknown')
                    width = meta.get('pack_width_in', 0)
                    lines.append(f"      - {name} (Category: {category}, Score: {score:.2f}, Width: {width}\")")
                if len(items) > 10:
                    lines.append(f"      ... and {len(items) - 10} more products")
            else:
                lines.append(f"    No products placed")
    
    lines.append("\n=== ANALYSIS REQUEST ===")
    lines.append("Please provide a brief analysis:")
    lines.append("1. Why this layout works well for the selected season")
    lines.append("2. How this layout helps drive sales")
    lines.append("3. Key strengths of this planogram")
    lines.append("\nKeep the response very concise (2-3 short paragraphs maximum).")
    
    return "\n".join(lines)


