#!/usr/bin/env bash
# Start Gunicorn
gunicorn spacecraft.wsgi:application --bind 0.0.0.0:$PORT

