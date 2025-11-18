from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken
from django.conf import settings


class CookieJWTAuthentication(JWTAuthentication):
    def get_header(self, request):
        """Override to get token from cookies instead of Authorization header"""
        token = request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE'])
        if token is None:
            return None
        return f'Bearer {token}'.encode('utf-8')
