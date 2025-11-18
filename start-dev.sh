#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Starting development servers...${NC}\n"

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# Step 1: Check and install node_modules if needed
echo -e "${YELLOW}📦 Checking front-end dependencies...${NC}"
if [ ! -d "front-end/node_modules" ]; then
    echo -e "${YELLOW}   node_modules not found. Installing dependencies...${NC}"
    cd front-end
    npm install
    cd ..
    echo -e "${GREEN}   ✓ Dependencies installed${NC}\n"
else
    echo -e "${GREEN}   ✓ Dependencies already installed${NC}\n"
fi

# Step 2: Stop existing servers on ports 8000 (Django) and 3000 (Next.js)
echo -e "${YELLOW}🛑 Stopping existing servers...${NC}"

# Kill process on port 8000 (Django)
if lsof -ti:8000 > /dev/null 2>&1; then
    echo -e "${YELLOW}   Stopping process on port 8000 (Django)...${NC}"
    lsof -ti:8000 | xargs kill -9 2>/dev/null
    sleep 1
fi

# Kill process on port 3000 (Next.js)
if lsof -ti:3000 > /dev/null 2>&1; then
    echo -e "${YELLOW}   Stopping process on port 3000 (Next.js)...${NC}"
    lsof -ti:3000 | xargs kill -9 2>/dev/null
    sleep 1
fi

echo -e "${GREEN}   ✓ Ports cleared${NC}\n"

# Function to cleanup on exit
cleanup() {
    echo -e "\n${YELLOW}🛑 Shutting down servers...${NC}"
    if [ ! -z "$DJANGO_PID" ]; then
        kill $DJANGO_PID 2>/dev/null
    fi
    if [ ! -z "$NEXTJS_PID" ]; then
        kill $NEXTJS_PID 2>/dev/null
    fi
    # Kill any remaining processes
    lsof -ti:8000 | xargs kill -9 2>/dev/null
    lsof -ti:3000 | xargs kill -9 2>/dev/null
    echo -e "${GREEN}✓ Servers stopped${NC}"
    exit 0
}

# Trap Ctrl+C and call cleanup
trap cleanup SIGINT SIGTERM

# Step 3: Start Django backend server
echo -e "${GREEN}🐍 Starting Django server on http://localhost:8000${NC}"
cd "$SCRIPT_DIR"
poetry run python manage.py runserver &
DJANGO_PID=$!

# Wait a moment for Django to start
sleep 2

# Step 4: Start Next.js front-end server
echo -e "${GREEN}⚛️  Starting Next.js server on http://localhost:3000${NC}"
cd "$SCRIPT_DIR/front-end"
npm run dev &
NEXTJS_PID=$!

# Wait a moment for Next.js to start
sleep 2

echo -e "\n${GREEN}✅ Both servers are running!${NC}"
echo -e "${GREEN}   Django:    http://localhost:8000${NC}"
echo -e "${GREEN}   Next.js:   http://localhost:3000${NC}"
echo -e "\n${YELLOW}Logs from both servers will appear below. Press Ctrl+C to stop both servers${NC}\n"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"

# Wait for both processes (this keeps the script running and shows output)
wait $DJANGO_PID $NEXTJS_PID

