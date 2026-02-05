# ACM Website - cPanel Deployment Guide

## Project Structure
```
ACM-Website/
├── backend/                 # Node.js Express API
│   ├── dist/               # Production build (compiled JS)
│   ├── src/                # TypeScript source
│   ├── package.json
│   ├── .env                # Development config
│   └── .env.production     # Production config
│
└── my-next-app/            # Next.js Frontend
    ├── out/                # Static export for production
    ├── src/                # React components
    ├── package.json
    ├── .env.local          # Development config
    └── .env.production     # Production config
```

## Deployment Steps

### 1. **Prepare Your cPanel Environment**

#### 1.1 Create Directories in cPanel
- Login to cPanel
- Open **File Manager**
- Navigate to **public_html**
- Create two folders:
  ```
  public_html/
  ├── api/                  # Backend API folder
  └── www/                  # Frontend static files folder
  ```

#### 1.2 Install Node.js (if not already installed)
- Go to **Setup Node.js App** in cPanel
- Install Node.js v18 or higher
- Set **Application root** to the `api/` folder

---

### 2. **Deploy Backend**

#### 2.1 Upload Backend Files
1. Compress backend folder: `backend.zip`
2. Upload to `public_html/api/` via FTP or File Manager
3. Extract the files
4. Delete the `.zip` file

#### 2.2 Structure Should Be
```
public_html/api/
├── dist/                  # Compiled JavaScript files
├── node_modules/          # Dependencies
├── package.json
├── .env.production        # Production environment variables
└── (other source files)
```

#### 2.3 Install Dependencies
- In cPanel terminal (or SSH):
  ```bash
  cd public_html/api
  npm install --production
  ```

#### 2.4 Configure .env.production
Edit `.env.production` in `public_html/api/`:
```
PORT=5000
MONGO_URI=mongodb+srv://root:root@cluster0.cnsqhiu.mongodb.net/acm_website?retryWrites=true&w=majority
NODE_ENV=production
```

#### 2.5 Setup Node.js App in cPanel
- Go to **Setup Node.js App**
- Create new app:
  - **Node.js version**: 18+
  - **Application root**: `/home/username/public_html/api`
  - **Application startup file**: `dist/server.js`
  - **Application name**: ACM-Backend
  - **Port**: 5000
- Click **Create**

The system will auto-generate a `.htaccess` file with reverse proxy rules.

---

### 3. **Deploy Frontend**

#### 3.1 Build Frontend Locally
```bash
cd my-next-app
npm run build
# This creates the 'out' folder with static files
```

#### 3.2 Upload Frontend Files
1. Upload entire `out/` folder to `public_html/www/`
2. Rename it if needed to serve from root

#### 3.3 Frontend .htaccess
Create `.htaccess` in `public_html/www/` (or `public_html/` if deploying to root):

```apache
# ACM Website - Next.js Static Export
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Handle static files and directories
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-f
  
  # Rewrite to index.html for SPA routing
  RewriteRule ^ index.html [QSA,L]
  
  # Add cache headers for static assets
  <FilesMatch "\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$">
    Header set Cache-Control "max-age=31536000, public"
  </FilesMatch>
</IfModule>

# Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>
```

---

### 4. **API Reverse Proxy (cPanel Auto-Generated)**

After creating the Node.js app, cPanel creates `.htaccess` in the app root:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^(.*)$ http://127.0.0.1:5000/$1 [P]
</IfModule>
```

This routes all `/api/*` requests to your Node.js backend.

---

### 5. **Update Environment Variables**

#### Backend Production (.env.production)
```
PORT=5000
MONGO_URI=mongodb+srv://root:root@cluster0.cnsqhiu.mongodb.net/acm_website?retryWrites=true&w=majority
NODE_ENV=production
```

#### Frontend Production (.env.production)
Update with your actual domain:
```
NEXT_PUBLIC_API_URL=https://yourdomain.com/api
```

---

### 6. **Start Services**

In cPanel **Terminal** or **SSH**:

```bash
# Start backend
cd ~/public_html/api
npm start
# or use PM2 (recommended)
pm2 start dist/server.js --name "acm-api" --env production

# Verify frontend files are in place
ls -la ~/public_html/www/  # or ~/public_html/ if root deployment
```

---

### 7. **Verify Deployment**

✅ **Frontend**: Visit `https://yourdomain.com`
✅ **Backend API**: Visit `https://yourdomain.com/api/blogs` (should return data)
✅ **Check Backend Logs**: 
```bash
pm2 logs acm-api
# or tail -f /path/to/backend.log
```

---

## Troubleshooting

### Issue: API calls return 404
- **Check**: Backend is running (`pm2 list`)
- **Check**: `.env.production` has correct `MONGO_URI`
- **Check**: Frontend `.env.production` has correct `NEXT_PUBLIC_API_URL`

### Issue: Reverse proxy not working
- **Check**: `.htaccess` syntax in api folder
- **Check**: mod_rewrite is enabled in cPanel
- **Test**: `curl http://127.0.0.1:5000/api/blogs`

### Issue: MongoDB connection fails
- **Check**: IP whitelist in MongoDB Atlas
- **Check**: Connection string in `.env.production`
- **Test**: `mongodb+srv://` auth credentials

### Issue: Static files (CSS/JS) not loading
- **Check**: `out/` folder was uploaded completely
- **Check**: `.htaccess` in frontend folder allows static files
- **Clear**: Browser cache (Ctrl+Shift+Delete)

---

## Continuous Updates

### Updating Backend
```bash
cd ~/public_html/api
git pull origin main  # or upload new files
npm install
npm run build
pm2 restart acm-api
```

### Updating Frontend
```bash
cd ~/my-next-app
git pull origin main  # or download new files
npm run build
# Upload 'out/' folder contents to public_html/www/
```

---

## Performance Optimization

### Recommended cPanel Settings
- **Enable Gzip**: Module: mod_deflate
- **Enable Cache**: Cache control headers in `.htaccess`
- **Use CloudFlare** or similar CDN for static assets
- **Monitor CPU/Memory**: Use cPanel Resource Usage monitor

---

## Support & Monitoring

- **Node.js Logs**: 
  ```bash
  pm2 logs acm-api
  journalctl -u nodejs_service -f
  ```
  
- **Browser DevTools**: Check Network tab for API responses
- **MongoDB Atlas**: Monitor connection in Atlas Dashboard

---

**Last Updated**: February 5, 2026
**Status**: Ready for Production Deployment ✅
