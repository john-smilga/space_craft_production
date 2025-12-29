import logging

from django.conf import settings
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken

logger = logging.getLogger("accounts")


class CookieJWTAuthentication(JWTAuthentication):
    def get_header(self, request):
        """Override to get token from cookies instead of Authorization header"""
        cookie_name = settings.SIMPLE_JWT["AUTH_COOKIE"]
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

        return f"Bearer {token}".encode()

    def authenticate(self, request):
        """Override to add logging and handle missing tokens gracefully"""
        try:
            result = super().authenticate(request)
            if result:
                user, token = result
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
                exc_info=True,
            )
            return None
