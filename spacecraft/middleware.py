"""
Custom middleware for logging request details, especially for mobile debugging
"""
import logging
from django.conf import settings
from django.utils.deprecation import MiddlewareMixin

logger = logging.getLogger('spacecraft.requests')
startup_logger = logging.getLogger('spacecraft.startup')

# Track if we've logged startup config
_startup_config_logged = False


class RequestLoggingMiddleware(MiddlewareMixin):
    """
    Log detailed request information for debugging mobile issues
    """
    
    def process_request(self, request):
        """Log request details before processing"""
        # Log startup configuration on first request
        global _startup_config_logged
        if not _startup_config_logged:
            startup_logger.info(
                f"CORS Configuration:\n"
                f"  CORS_ALLOWED_ORIGINS: {getattr(settings, 'CORS_ALLOWED_ORIGINS', [])}\n"
                f"  CORS_ALLOW_CREDENTIALS: {getattr(settings, 'CORS_ALLOW_CREDENTIALS', False)}\n"
                f"  DEBUG: {getattr(settings, 'DEBUG', False)}"
            )
            jwt_config = getattr(settings, 'SIMPLE_JWT', {})
            startup_logger.info(
                f"JWT Cookie Configuration:\n"
                f"  AUTH_COOKIE: {jwt_config.get('AUTH_COOKIE', 'N/A')}\n"
                f"  AUTH_COOKIE_HTTP_ONLY: {jwt_config.get('AUTH_COOKIE_HTTP_ONLY', 'N/A')}\n"
                f"  AUTH_COOKIE_SAMESITE: {jwt_config.get('AUTH_COOKIE_SAMESITE', 'N/A')}\n"
                f"  AUTH_COOKIE_SECURE: {jwt_config.get('AUTH_COOKIE_SECURE', 'N/A')}"
            )
            _startup_config_logged = True
        
        # Skip logging for health checks and static files
        if request.path.startswith('/static/') or request.path.startswith('/admin/static/'):
            return None
        
        # Get origin from request
        origin = request.META.get('HTTP_ORIGIN', 'No Origin header')
        referer = request.META.get('HTTP_REFERER', 'No Referer header')
        user_agent = request.META.get('HTTP_USER_AGENT', 'No User-Agent')
        
        # Check if origin is in allowed origins
        allowed_origins = getattr(settings, 'CORS_ALLOWED_ORIGINS', [])
        is_allowed = origin in allowed_origins if allowed_origins else False
        
        # Get cookie information
        cookie_name = settings.SIMPLE_JWT.get('AUTH_COOKIE', 'jwt')
        has_cookie = cookie_name in request.COOKIES
        cookie_value = request.COOKIES.get(cookie_name, None)
        cookie_preview = f"{cookie_value[:20]}..." if cookie_value and len(cookie_value) > 20 else (cookie_value or 'None')
        
        # Log request details
        logger.info(
            f"=== REQUEST START ===\n"
            f"Method: {request.method}\n"
            f"Path: {request.path}\n"
            f"Origin: {origin}\n"
            f"Referer: {referer}\n"
            f"User-Agent: {user_agent}\n"
            f"CORS Allowed Origins: {allowed_origins}\n"
            f"Origin Allowed: {is_allowed}\n"
            f"Has {cookie_name} Cookie: {has_cookie}\n"
            f"Cookie Preview: {cookie_preview}\n"
            f"All Cookies: {list(request.COOKIES.keys())}\n"
            f"IP Address: {self.get_client_ip(request)}\n"
            f"Content-Type: {request.META.get('CONTENT_TYPE', 'N/A')}\n"
            f"Accept: {request.META.get('HTTP_ACCEPT', 'N/A')}"
        )
        
        # Log CORS-specific headers for preflight requests
        if request.method == 'OPTIONS':
            access_control_request_method = request.META.get('HTTP_ACCESS_CONTROL_REQUEST_METHOD', 'N/A')
            access_control_request_headers = request.META.get('HTTP_ACCESS_CONTROL_REQUEST_HEADERS', 'N/A')
            logger.info(
                f"PREFLIGHT REQUEST:\n"
                f"Access-Control-Request-Method: {access_control_request_method}\n"
                f"Access-Control-Request-Headers: {access_control_request_headers}"
            )
        
        return None
    
    def process_response(self, request, response):
        """Log response details after processing"""
        # Skip logging for health checks and static files
        if request.path.startswith('/static/') or request.path.startswith('/admin/static/'):
            return response
        
        # Get CORS headers from response - check actual headers
        cors_headers = {}
        for header_name in ['Access-Control-Allow-Origin', 'Access-Control-Allow-Credentials', 
                           'Access-Control-Allow-Methods', 'Access-Control-Allow-Headers']:
            # Check both response headers dict and response object
            header_value = response.get(header_name) or response.headers.get(header_name, 'Not Set')
            cors_headers[header_name] = header_value
        
        # Check for Set-Cookie header properly
        cookie_name = settings.SIMPLE_JWT.get('AUTH_COOKIE', 'jwt')
        set_cookie_present = False
        set_cookie_value = None
        set_cookie_details = {}
        actual_set_cookie_header = None
        
        # Get the ACTUAL Set-Cookie header string - this is what Safari sees
        for header, value in response.items():
            if header.lower() == 'set-cookie':
                if cookie_name in str(value):
                    actual_set_cookie_header = str(value)
                    set_cookie_present = True
                    set_cookie_value = str(value)[:200]  # Truncate for logging
                    break
        
        # Method 1: Check response.cookies (Django's cookie jar)
        if cookie_name in response.cookies:
            set_cookie_present = True
            cookie_obj = response.cookies[cookie_name]
            if not set_cookie_value:
                set_cookie_value = f"{cookie_name}={str(cookie_obj.value)[:50]}..."
            # Django Morsel stores attributes as dict keys, not attributes
            set_cookie_details = {
                'HttpOnly': cookie_obj.get('httponly', False),
                'Secure': cookie_obj.get('secure', False),
                'SameSite': cookie_obj.get('samesite', 'Not Set'),
                'Path': cookie_obj.get('path', '/'),
                'Max-Age': cookie_obj.get('max-age', 'Not Set'),
            }
        
        # Log all response headers for debugging
        all_headers = dict(response.items())
        
        logger.info(
            f"=== REQUEST END ===\n"
            f"Method: {request.method}\n"
            f"Path: {request.path}\n"
            f"Status Code: {response.status_code}\n"
            f"CORS Headers: {cors_headers}\n"
            f"Set-Cookie Present: {set_cookie_present}\n"
            f"Set-Cookie Details: {set_cookie_value or 'Not Found'}\n"
            f"ACTUAL Set-Cookie Header String: {actual_set_cookie_header or 'Not Found'}\n"
            f"Cookie Attributes: {set_cookie_details}\n"
            f"Response Cookies Keys: {list(response.cookies.keys())}\n"
            f"All Response Headers: {list(all_headers.keys())}\n"
            f"Content-Type: {response.get('Content-Type', 'N/A')}"
        )
        
        return response
    
    def get_client_ip(self, request):
        """Get client IP address, handling proxies"""
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip

