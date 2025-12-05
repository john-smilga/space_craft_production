from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils.text import slugify
from .models import Company
from .permissions import IsAdmin
from .serializers import get_token_for_user
from django.conf import settings

User = get_user_model()


def get_user_data(user):
    """Helper function to get user data with role and company"""
    return {
        'id': user.id,
        'email': user.email,
        'username': user.username,
        'slug': user.slug,
        'role': user.role,
        'date_joined': user.date_joined.isoformat() if user.date_joined else None,
        'company': {
            'id': user.company.id,
            'name': user.company.name,
        } if user.company else None,
    }


@api_view(['GET'])
@permission_classes([AllowAny])
def validate_invitation(request):
    """Validate an invitation token and return company info"""
    token = request.query_params.get('token')
    
    if not token:
        return Response({'error': 'Token is required'}, status=400)
    
    try:
        user = User.objects.get(invitation_token=token)
        
        if not user.is_invitation_valid():
            return Response({'error': 'Invitation token has expired'}, status=400)
        
        if user.is_active:
            return Response({'error': 'This invitation has already been used'}, status=400)
        
        return Response({
            'valid': True,
            'email': user.email,
            'company': {
                'id': user.company.id,
                'name': user.company.name,
            } if user.company else None,
        })
    except User.DoesNotExist:
        return Response({'error': 'Invalid invitation token'}, status=400)


@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    """Register a new user using an invitation token"""
    token = request.data.get('token')
    password = request.data.get('password')
    username = request.data.get('username')
    
    if not token or not password:
        return Response({'error': 'Token and password are required'}, status=400)
    
    try:
        user = User.objects.get(invitation_token=token)
        
        if not user.is_invitation_valid():
            return Response({'error': 'Invitation token has expired'}, status=400)
        
        if user.is_active:
            return Response({'error': 'This invitation has already been used'}, status=400)
        
        # Set password and activate user
        user.set_password(password)
        if username:
            user.username = username
        user.is_active = True
        user.invitation_token = None
        user.invitation_expires_at = None
        user.save()
        
        refresh = RefreshToken.for_user(user)
        
        response = Response({
            'user': get_user_data(user)
        })
        response.set_cookie(
            settings.SIMPLE_JWT['AUTH_COOKIE'],
            str(refresh.access_token),
            httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
            samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'],
            secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE']
        )
        return response
        
    except User.DoesNotExist:
        return Response({'error': 'Invalid invitation token'}, status=400)


@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    """Login existing user"""
    import logging
    logger = logging.getLogger('accounts')
    
    logger.info('=== LOGIN ATTEMPT ===')
    logger.info(f'Request method: {request.method}')
    logger.info(f'Request content type: {request.content_type}')
    logger.info(f'Request data type: {type(request.data)}')
    logger.info(f'Request data: {request.data}')
    
    email = request.data.get('email')
    password = request.data.get('password')
    
    logger.info(f'Extracted email: {email}')
    logger.info(f'Extracted password: {"***" if password else None}')
    
    if not email or not password:
        logger.warning(f'Missing email or password - email: {email}, password: {"present" if password else "missing"}')
        return Response({'error': 'Email and password are required'}, status=400)
    
    try:
        logger.info(f'Looking up user with email: {email}')
        user = User.objects.get(email=email)
        logger.info(f'User found: {user.username} (id: {user.id}, active: {user.is_active})')
        
        password_check = user.check_password(password)
        logger.info(f'Password check result: {password_check}')
        
        if not password_check:
            logger.warning(f'Password check failed for user: {email}')
            return Response({'error': 'Invalid credentials'}, status=401)
        
        if not user.is_active:
            logger.warning(f'User is not active: {email}')
            return Response({'error': 'Account is not active'}, status=401)
        
        logger.info(f'Generating token for user: {user.username}')
        refresh = get_token_for_user(user)
        logger.info('Token generated successfully')
        
        response = Response({
            'user': get_user_data(user)
        })
        response.set_cookie(
            settings.SIMPLE_JWT['AUTH_COOKIE'],
            str(refresh.access_token),
            httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
            samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'],
            secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE']
        )
        logger.info('Login successful, returning response')
        return response
        
    except User.DoesNotExist:
        logger.warning(f'User not found with email: {email}')
        return Response({'error': 'Invalid credentials'}, status=401)
    except Exception as e:
        logger.error(f'Unexpected error during login: {e}', exc_info=True)
        return Response({'error': 'An error occurred during login'}, status=500)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    """Logout current user"""
    response = Response({'message': 'Logged out'})
    response.delete_cookie('jwt')
    return response


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def me(request):
    """Get current user info"""
    return Response(get_user_data(request.user))


@api_view(['POST'])
@permission_classes([IsAuthenticated, IsAdmin])
def invite_user(request):
    """Create an invitation for a new user (admin only)"""
    email = request.data.get('email')
    role = request.data.get('role', 'member')  # Default to member
    
    if not email:
        return Response({'error': 'Email is required'}, status=400)
    
    if not request.user.company:
        return Response({'error': 'Admin is not associated with a company'}, status=400)
    
    # Only allow creating members via invitation (admins are created via Django admin)
    if role != 'member':
        return Response({'error': 'Only members can be created via invitation. Admins must be created via Django admin.'}, status=400)
    
    # Check if user already exists
    if User.objects.filter(email=email).exists():
        return Response({'error': 'User with this email already exists'}, status=400)
    
    # Use admin's company automatically
    company = request.user.company
    
    # Create inactive user with invitation (always as member)
    user = User.objects.create_user(
        username=email.split('@')[0],  # Use email prefix as default username
        email=email,
        password=None,  # User will set password during registration
        company=company,
        role=role,
        is_active=False,  # User is inactive until they complete registration
    )
    
    # Generate invitation token
    token = user.generate_invitation_token()
    
    # Generate invitation link
    frontend_url = settings.FRONTEND_URL
    invitation_link = f"{frontend_url}/register?token={token}"
    
    return Response({
        'message': 'Invitation created successfully',
        'invitation_token': token,
        'invitation_link': invitation_link,
        'user': {
            'id': user.id,
            'email': user.email,
            'role': user.role,
            'company': {
                'id': company.id,
                'name': company.name,
            },
        },
    }, status=201)


@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdmin])
def list_users(request):
    """List all users from the same company (admin only)"""
    if not request.user.company:
        return Response({'error': 'User is not associated with a company'}, status=400)
    
    # Get all users from the same company
    users = User.objects.filter(company=request.user.company, is_active=True).exclude(id=request.user.id)
    
    return Response({
        'users': [get_user_data(user) for user in users]
    })


@api_view(['GET', 'DELETE'])
@permission_classes([IsAuthenticated, IsAdmin])
def get_or_delete_user(request, user_slug):
    """Get or delete a user by slug (admin only, same company only)"""
    if not request.user.company:
        return Response({'error': 'User is not associated with a company'}, status=400)
    
    # Find user by matching slugified username
    # Since slug is derived from username, we need to check all users
    # This is acceptable as users are filtered by company (typically small set)
    users = User.objects.filter(company=request.user.company, is_active=True)
    user = None
    for u in users:
        if u.slug == user_slug:
            user = u
            break
    
    if not user:
        return Response({'error': 'User not found'}, status=404)
    
    if request.method == 'GET':
        if not user.is_active:
            return Response({'error': 'User not found'}, status=404)
        return Response({
            'user': get_user_data(user)
        })
    
    elif request.method == 'DELETE':
        # Prevent admin from deleting themselves
        if user.id == request.user.id:
            return Response({'error': 'Cannot delete your own account'}, status=400)
        
        # Prevent deleting the company admin
        if user.role == 'admin':
            return Response({'error': 'Cannot delete admin user'}, status=400)
        
        user.delete()
        return Response({'message': 'User deleted successfully'}, status=200)


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_username(request):
    """Update current user's username (any authenticated user, only their own)"""
    new_username = request.data.get('username')
    
    if not new_username:
        return Response({'error': 'Username is required'}, status=400)
    
    # Check if username is already taken
    if User.objects.filter(username=new_username).exclude(id=request.user.id).exists():
        return Response({'error': 'Username already taken'}, status=400)
    
    request.user.username = new_username
    request.user.save()
    
    return Response({
        'user': get_user_data(request.user)
    })


