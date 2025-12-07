from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken
from django.conf import settings
import logging

logger = logging.getLogger('accounts')


class CookieJWTAuthentication(JWTAuthentication):
    def get_header(self, request):
        """Override to get token from cookies instead of Authorization header"""
        cookie_name = settings.SIMPLE_JWT['AUTH_COOKIE']
        token = request.COOKIES.get(cookie_name)
        
        if token is None:
            logger.warning(
                f"No JWT token found in cookies. "
                f"Cookie name: {cookie_name}, "
                f"Available cookies: {list(request.COOKIES.keys())}, "
                f"Origin: {request.META.get('HTTP_ORIGIN', 'No Origin')}, "
                f"User-Agent: {request.META.get('HTTP_USER_AGENT', 'No UA')[:100]}"
            )
            return None
        
        logger.info(
            f"JWT token found in cookies. "
            f"Cookie name: {cookie_name}, "
            f"Token length: {len(token)}, "
            f"Token preview: {token[:20]}..."
        )
        return f'Bearer {token}'.encode('utf-8')
    
    def authenticate(self, request):
        """Override to add logging and handle missing tokens gracefully"""
        logger.info(
            f"CookieJWTAuthentication.authenticate called for "
            f"path: {request.path}, "
            f"method: {request.method}, "
            f"origin: {request.META.get('HTTP_ORIGIN', 'No Origin')}"
        )
        
        try:
            result = super().authenticate(request)
            if result:
                user, token = result
                logger.info(
                    f"Authentication successful. "
                    f"User: {user.username} (id: {user.id}), "
                    f"Path: {request.path}"
                )
            else:
                logger.warning(
                    f"Authentication returned None. "
                    f"Path: {request.path}, "
                    f"Method: {request.method}, "
                    f"Has cookies: {bool(request.COOKIES)}"
                )
            return result
        except InvalidToken as e:
            logger.warning(
                f"Invalid token: {e}. "
                f"Path: {request.path}, "
                f"Origin: {request.META.get('HTTP_ORIGIN', 'No Origin')}"
            )
            return None
        except Exception as e:
            logger.error(
                f"Authentication error: {e}. "
                f"Path: {request.path}, "
                f"Origin: {request.META.get('HTTP_ORIGIN', 'No Origin')}",
                exc_info=True
            )
            return None
