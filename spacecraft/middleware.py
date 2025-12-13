"""Custom middleware for request logging."""

import logging

from django.conf import settings
from django.utils.deprecation import MiddlewareMixin

logger = logging.getLogger("spacecraft.requests")
startup_logger = logging.getLogger("spacecraft.startup")

_startup_config_logged = False


class RequestLoggingMiddleware(MiddlewareMixin):
    """Log request information for debugging (configurable via settings)."""

    def process_request(self, request):
        """Log request details before processing (only if enabled)."""
        if not getattr(settings, "ENABLE_REQUEST_LOGGING", False):
            return None

        global _startup_config_logged
        if not _startup_config_logged:
            startup_logger.info(
                f"CORS Configuration: CORS_ALLOWED_ORIGINS={getattr(settings, 'CORS_ALLOWED_ORIGINS', [])}"
            )
            _startup_config_logged = True

        if request.path.startswith(("/static/", "/admin/static/")):
            return None

        logger.debug(
            f"Request: {request.method} {request.path} from {self.get_client_ip(request)}"
        )

        return None

    def process_response(self, request, response):
        """Log response details after processing (only if enabled)."""
        if not getattr(settings, "ENABLE_REQUEST_LOGGING", False):
            return response

        if request.path.startswith(("/static/", "/admin/static/")):
            return response

        logger.debug(
            f"Response: {request.method} {request.path} - Status {response.status_code}"
        )

        return response

    def get_client_ip(self, request):
        """Get client IP address, handling proxies."""
        x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
        if x_forwarded_for:
            ip = x_forwarded_for.split(",")[0]
        else:
            ip = request.META.get("REMOTE_ADDR")
        return ip
