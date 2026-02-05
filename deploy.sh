#!/bin/bash
# ACM Website - Quick Deployment Script for cPanel
# Usage: bash deploy.sh

echo "=========================================="
echo "ACM Website - cPanel Deployment Script"
echo "=========================================="

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
CPANEL_USER="your_username"  # CHANGE THIS
DOMAIN="yourdomain.com"      # CHANGE THIS
API_PORT="5000"

echo -e "${YELLOW}Pre-Deployment Checklist${NC}"
echo "1. Update CPANEL_USER and DOMAIN in this script"
echo "2. Ensure backend/dist/ folder exists"
echo "3. Ensure my-next-app/out/ folder exists"
echo "4. Have FTP/SSH credentials ready"
echo ""

read -p "Continue with deployment? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Deployment cancelled."
    exit 1
fi

# Step 1: Build Backend
echo -e "${YELLOW}Step 1: Building Backend...${NC}"
cd backend
npm run build
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Backend built successfully${NC}"
else
    echo -e "${RED}✗ Backend build failed${NC}"
    exit 1
fi
cd ..

# Step 2: Build Frontend
echo -e "${YELLOW}Step 2: Building Frontend...${NC}"
cd my-next-app
npm run build
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Frontend built successfully${NC}"
else
    echo -e "${RED}✗ Frontend build failed${NC}"
    exit 1
fi
cd ..

# Step 3: Create deployment archive
echo -e "${YELLOW}Step 3: Creating deployment packages...${NC}"

# Backend archive
cd backend
tar -czf ../acm-backend.tar.gz dist/ node_modules/ package.json .env.production .htaccess
echo -e "${GREEN}✓ Backend package created: acm-backend.tar.gz${NC}"
cd ..

# Frontend archive
cd my-next-app
tar -czf ../acm-frontend.tar.gz out/ .htaccess
echo -e "${GREEN}✓ Frontend package created: acm-frontend.tar.gz${NC}"
cd ..

# Step 4: Upload instructions
echo ""
echo -e "${YELLOW}Step 4: Manual Upload to cPanel${NC}"
echo ""
echo "Backend Deployment:"
echo "  1. Create folder: /public_html/api/"
echo "  2. Upload acm-backend.tar.gz to /public_html/api/"
echo "  3. Extract: tar -xzf acm-backend.tar.gz"
echo "  4. Setup Node.js App in cPanel:"
echo "     - Application root: /home/$CPANEL_USER/public_html/api"
echo "     - Startup file: dist/server.js"
echo "     - Port: $API_PORT"
echo "  5. Start the app"
echo ""
echo "Frontend Deployment:"
echo "  1. Create folder: /public_html/www/"
echo "  2. Upload acm-frontend.tar.gz to /public_html/www/"
echo "  3. Extract: tar -xzf acm-frontend.tar.gz"
echo "  4. Move out/* to /public_html/www/"
echo "  5. Set permissions: chmod -R 755 /public_html/www/"
echo ""

# Step 5: Configuration reminder
echo -e "${YELLOW}Step 5: Configuration Reminders${NC}"
echo ""
echo "Update these files before uploading:"
echo "  1. backend/.env.production"
echo "     - MONGO_URI: Ensure it's correct"
echo "     - PORT: 5000"
echo ""
echo "  2. my-next-app/.env.production"
echo "     - NEXT_PUBLIC_API_URL: https://$DOMAIN/api"
echo ""

# Step 6: Testing
echo -e "${YELLOW}Step 6: Post-Deployment Testing${NC}"
echo ""
echo "After uploading, test:"
echo "  1. Frontend: https://$DOMAIN"
echo "  2. API: https://$DOMAIN/api/blogs"
echo "  3. Check browser console (F12) for errors"
echo "  4. Test all pages: Teams, Events, Blogs, Gallery"
echo ""

echo -e "${GREEN}=========================================="
echo "✓ Build packages ready for deployment!"
echo "==========================================${NC}"
echo ""
echo "Next steps:"
echo "  1. Upload acm-backend.tar.gz to cPanel"
echo "  2. Upload acm-frontend.tar.gz to cPanel"
echo "  3. Follow the manual deployment steps above"
echo ""
