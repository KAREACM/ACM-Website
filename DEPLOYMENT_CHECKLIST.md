# ACM Website - Deployment Checklist

## Pre-Deployment ✅

- [x] Backend built: `npm run build` → generates `dist/` folder
- [x] Frontend built: `npm run build` → generates `out/` folder  
- [x] Environment files created:
  - [x] `backend/.env.production` 
  - [x] `my-next-app/.env.production`
- [x] API path configuration updated in frontend components
- [x] MongoDB Atlas whitelisted your cPanel IP
- [x] Deployment guide created: `DEPLOYMENT_GUIDE.md`

## cPanel Deployment Steps

### Phase 1: Backend Setup (30 mins)
- [ ] 1. Create `/public_html/api/` folder via cPanel File Manager
- [ ] 2. Upload backend folder contents to `/public_html/api/`
- [ ] 3. Upload `.htaccess` file to `/public_html/api/`
- [ ] 4. SSH into server: `ssh user@yourdomain.com`
- [ ] 5. Navigate: `cd ~/public_html/api`
- [ ] 6. Install dependencies: `npm install --production`
- [ ] 7. Create Node.js App in cPanel:
  - Application root: `/home/username/public_html/api`
  - Startup file: `dist/server.js`
  - Port: `5000`
- [ ] 8. Start application: cPanel will auto-start or use `npm start`
- [ ] 9. Test backend: `curl http://127.0.0.1:5000/api/blogs`

### Phase 2: Frontend Setup (20 mins)
- [ ] 1. Create `/public_html/www/` folder (or deploy to `/public_html/`)
- [ ] 2. Upload all files from `my-next-app/out/` to `/public_html/www/`
- [ ] 3. Upload `.htaccess` file to `/public_html/www/`
- [ ] 4. Verify file permissions: `chmod -R 755 ~/public_html/www/`
- [ ] 5. Clear browser cache (Ctrl+Shift+Delete)
- [ ] 6. Visit `https://yourdomain.com` and verify UI loads

### Phase 3: Integration Testing (15 mins)
- [ ] 1. Open browser DevTools (F12)
- [ ] 2. Go to Network tab
- [ ] 3. Click "Teams" page → verify API call to `/api/teams` returns data
- [ ] 4. Click "Events" page → verify `/api/events` returns data
- [ ] 5. Click "Blogs" page → verify `/api/blogs` returns data
- [ ] 6. Click "Gallery" page → verify `/api/photos` and `/api/awards` load
- [ ] 7. Check Console tab for any errors
- [ ] 8. Test on mobile device

### Phase 4: DNS & HTTPS (5 mins)
- [ ] 1. Point domain DNS to cPanel nameservers
- [ ] 2. Enable AutoSSL certificate in cPanel
- [ ] 3. Wait 24h for DNS propagation
- [ ] 4. Visit `https://yourdomain.com` (HTTPS only, not HTTP)

## Post-Deployment Verification

### ✅ Functionality Checks
- [ ] Homepage loads with no errors
- [ ] Navigation links work correctly
- [ ] All pages load (Home, About, Blogs, Events, Gallery, Teams, Contact)
- [ ] API calls are successful (check Network tab)
- [ ] Images load properly
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] Forms work (contact form if applicable)

### ✅ Performance Checks
- [ ] Page load time < 3 seconds
- [ ] CSS/JS files are minified and cached
- [ ] Images are optimized
- [ ] No 404 errors in console

### ✅ Security Checks
- [ ] HTTPS is enabled
- [ ] Security headers are present (X-Frame-Options, etc.)
- [ ] Environment files (.env) are not publicly accessible
- [ ] No sensitive data in frontend console logs

## Rollback Plan

If something goes wrong:

```bash
# Stop backend
pm2 stop acm-api

# Or via cPanel:
# Go to Setup Node.js App → Delete the app

# Restore frontend
# Replace /public_html/www/ contents with backup
```

## Monitoring & Maintenance

### Daily Checks
- [ ] Backend is running: SSH → `pm2 status`
- [ ] No MongoDB connection errors: Check logs
- [ ] Website is accessible at `https://yourdomain.com`

### Weekly Checks
- [ ] Monitor error logs in cPanel
- [ ] Check MongoDB Atlas dashboard for connection issues
- [ ] Review site analytics

### Monthly Tasks
- [ ] Update dependencies: `npm update`
- [ ] Review and backup database
- [ ] Check SSL certificate expiration (AutoSSL should auto-renew)

## Contact & Support

- **MongoDB Issues**: https://cloud.mongodb.com/
- **cPanel Support**: Contact your hosting provider
- **Domain/DNS Issues**: Contact your registrar

---

**Deployment Date**: _________________
**Deployed By**: _________________
**Status**: ⚪ (Pending) | 🟢 (Complete)

---

For detailed steps, refer to: `DEPLOYMENT_GUIDE.md`
