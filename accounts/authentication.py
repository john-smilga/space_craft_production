from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken
from django.conf import settings
import logging

logger = logging.getLogger('accounts')


class CookieJWTAuthentication(JWTAuthentication):
    def get_header(self, request):
        """Override to get token from cookies instead of Authorization header"""
        token = request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE'])
        if token is None:
            logger.debug('No JWT token found in cookies')
            return None
        logger.debug('JWT token found in cookies')
        return f'Bearer {token}'.encode('utf-8')
    
    def authenticate(self, request):
        """Override to add logging and handle missing tokens gracefully"""
        logger.debug('CookieJWTAuthentication.authenticate called')
        try:
            return super().authenticate(request)
        except InvalidToken as e:
            logger.warning(f'Invalid token: {e}')
            return None
        except Exception as e:
            logger.error(f'Authentication error: {e}', exc_info=True)
            return None
