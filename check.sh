#!/bin/bash

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "🔍 Running linting and type check for web app..."
echo ""

cd "$SCRIPT_DIR/front-end"

echo "🎨 Running ESLint..."
npm run lint:web

LINT_EXIT_CODE=$?

echo ""
echo "📝 Running TypeScript type check..."
npm run typecheck:web

TYPECHECK_EXIT_CODE=$?

echo ""

if [ $LINT_EXIT_CODE -eq 0 ] && [ $TYPECHECK_EXIT_CODE -eq 0 ]; then
    echo "✅ All checks passed!"
    exit 0
else
    echo "❌ Some checks failed"
    exit 1
fi
