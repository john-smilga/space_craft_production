"""Custom middleware for request logging."""

import logging
import traceback

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

        if request.path.startswith(("/static/", "/admin/static/")):
            return None

        logger.info(
            f"{request.method} {request.path} - IP: {self.get_client_ip(request)}"
        )
        return None

    def process_response(self, request, response):
        """Log response details after processing."""
        if request.path.startswith(("/static/", "/admin/static/")):
            return response

        # Always log errors (500), regardless of ENABLE_REQUEST_LOGGING
        if response.status_code >= 500:
            logger.error(
                f"{request.method} {request.path} - Status: {response.status_code} - IP: {self.get_client_ip(request)}"
            )
        elif getattr(settings, "ENABLE_REQUEST_LOGGING", False):
            # Log all requests if verbose logging is enabled
            logger.info(
                f"{request.method} {request.path} - Status: {response.status_code}"
            )

        return response

    def process_exception(self, request, exception):
        """Log exceptions that occur during request processing."""
        logger.error(
            f"Exception processing {request.method} {request.path}: {exception}",
            exc_info=True,
            extra={
                "request_path": request.path,
                "request_method": request.method,
                "client_ip": self.get_client_ip(request),
                "traceback": traceback.format_exc(),
            },
        )
        return None

    def get_client_ip(self, request):
        """Get client IP address, handling proxies."""
        x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
        if x_forwarded_for:
            ip = x_forwarded_for.split(",")[0]
        else:
            ip = request.META.get("REMOTE_ADDR")
        return ip
