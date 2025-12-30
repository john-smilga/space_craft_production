# Logging Directory

This directory contains Django application logs.

## Log Files

- **`django.log`** - All application logs (DEBUG, INFO, WARNING, ERROR)
  - Rotating log file (max 10MB per file, keeps 5 backups)
  - Contains general application activity

- **`errors.log`** - Error-level logs only (ERROR, CRITICAL)
  - Rotating log file (max 10MB per file, keeps 5 backups)
  - Contains only errors and critical issues

## Viewing Logs

### Using the helper script:

```bash
# View last 50 lines of all logs
./view-logs.sh

# View only errors
./view-logs.sh --errors

# Follow logs in real-time (like tail -f)
./view-logs.sh --follow

# Follow error logs in real-time
./view-logs.sh --errors --follow

# View last 100 lines
./view-logs.sh --last 100
```

### Using standard Unix commands:

```bash
# View last 50 lines
tail -50 logs/django.log

# Follow logs in real-time
tail -f logs/django.log

# View only errors
tail -f logs/errors.log

# Search for specific error
grep "ai-overview" logs/django.log

# Search for ERROR level messages
grep "ERROR" logs/django.log
```

## Log Levels

Logs are captured at different levels:

- **DEBUG** - Detailed information for debugging (only in development)
- **INFO** - General informational messages
- **WARNING** - Warning messages (potential issues)
- **ERROR** - Error messages (actual problems)
- **CRITICAL** - Critical issues that need immediate attention

## Development vs Production

- **Development** (DEBUG=True):
  - Logs DEBUG level and above
  - More verbose output
  - Console + file logging

- **Production** (DEBUG=False):
  - Logs INFO level and above
  - Less verbose output
  - Console + file logging
  - Error tracking via middleware

## What Gets Logged

### Automatically Logged

1. **All HTTP 500 errors** - Always logged with request details
2. **Exceptions** - Full traceback with request context
3. **Django request errors** - Captured by `django.request` logger
4. **Application errors** - From all Django apps (planograms, accounts, etc.)

### Optional Verbose Logging

Set `ENABLE_REQUEST_LOGGING=True` in your `.env` file to enable:
- All HTTP requests (method, path, IP)
- All HTTP responses (status codes)

## Troubleshooting

### No log files appearing?

1. Check if the `logs/` directory exists:
   ```bash
   ls -l logs/
   ```

2. Ensure the Django server has write permissions:
   ```bash
   chmod 755 logs/
   ```

3. Check Django settings:
   - Verify `BASE_DIR` is correct
   - Check file handler configuration in `LOGGING`

### Logs not showing in console?

1. Check `DEBUG` setting in `.env`
2. Verify console handler is enabled in settings
3. Check log level configuration

### Finding specific errors

```bash
# Find all 500 errors
grep "500" logs/django.log

# Find specific endpoint errors
grep "ai-overview" logs/django.log

# Find all exceptions
grep -A 10 "Traceback" logs/django.log
```

## Log Format

### Console Output
```
[YYYY-MM-DD HH:MM:SS] LEVEL logger_name - message
```

Example:
```
[2025-12-29 18:50:23] ERROR django.request - Internal Server Error: /api/planograms/planogram-2223/ai-overview/
```

### File Output
```
LEVEL YYYY-MM-DD HH:MM:SS,mmm module process thread message
```

Example:
```
ERROR 2025-12-29 18:50:23,123 views 12345 67890 Error generating AI overview
```

## Best Practices

1. **Regular monitoring** - Check `errors.log` regularly in production
2. **Log rotation** - Log files automatically rotate at 10MB
3. **Don't commit logs** - Log files are in `.gitignore`
4. **Use appropriate levels** - Use DEBUG for development, INFO for production tracking, ERROR for actual issues
5. **Add context** - When logging errors, include relevant context (user ID, request path, etc.)

## Adding Custom Logging

In your Django code:

```python
import logging

logger = logging.getLogger(__name__)

# Info level
logger.info("User logged in successfully")

# Warning level
logger.warning("Invalid input received, using default")

# Error level (with exception traceback)
try:
    result = risky_operation()
except Exception as e:
    logger.error(f"Operation failed: {e}", exc_info=True)
```
