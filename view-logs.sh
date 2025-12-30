#!/bin/bash

# Helper script to view Django logs

# Colors for output
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

show_help() {
    echo "Usage: ./view-logs.sh [OPTION]"
    echo ""
    echo "Options:"
    echo "  -e, --errors    Show only errors (from errors.log)"
    echo "  -f, --follow    Follow the log file (tail -f)"
    echo "  -a, --all       Show all logs (from django.log)"
    echo "  -l, --last N    Show last N lines (default: 50)"
    echo "  -h, --help      Show this help message"
    echo ""
    echo "Examples:"
    echo "  ./view-logs.sh --errors          # Show all errors"
    echo "  ./view-logs.sh --follow          # Follow all logs in real-time"
    echo "  ./view-logs.sh --errors --follow # Follow error logs in real-time"
    echo "  ./view-logs.sh --last 100        # Show last 100 lines"
}

# Default values
FOLLOW=false
LOG_FILE="logs/django.log"
LINES=50

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -e|--errors)
            LOG_FILE="logs/errors.log"
            shift
            ;;
        -f|--follow)
            FOLLOW=true
            shift
            ;;
        -a|--all)
            LOG_FILE="logs/django.log"
            shift
            ;;
        -l|--last)
            LINES="$2"
            shift 2
            ;;
        -h|--help)
            show_help
            exit 0
            ;;
        *)
            echo "Unknown option: $1"
            show_help
            exit 1
            ;;
    esac
done

# Check if log file exists
if [ ! -f "$LOG_FILE" ]; then
    echo -e "${YELLOW}Warning: Log file $LOG_FILE does not exist yet.${NC}"
    echo "Logs will be created when the Django server runs."
    exit 1
fi

# Display log file
echo -e "${GREEN}Viewing: $LOG_FILE${NC}"
echo "----------------------------------------"

if [ "$FOLLOW" = true ]; then
    tail -f "$LOG_FILE"
else
    tail -n "$LINES" "$LOG_FILE"
fi
