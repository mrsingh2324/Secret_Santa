# Vercel Deployment Guide

## Quick Deploy Using Vercel CLI

### 1. Install Vercel CLI
```bash
npm install -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy from the client directory
```bash
cd /Users/satyamsingh/Desktop/secretSanta/client
vercel
```

### 4. Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Choose your account
- Link to existing project? **N**
- Project name: **secret-santa** (or your choice)
- In which directory is your code located? **./
** (just press Enter)
- Want to override settings? **N**

### 5. Deploy to production
```bash
vercel --prod
```

---

## What Vercel Will Do:

1. ✅ Read `vercel.json` configuration
2. ✅ Navigate to `client` directory
3. ✅ Run `npm install`
4. ✅ Run `npm run build`
5. ✅ Deploy the `dist` folder
6. ✅ Give you a live URL!

---

## After Deployment:

Your app will be live at:
- `https://secret-santa-[something].vercel.app`

You can:
- ✅ Set a custom domain
- ✅ Enable automatic deployments from GitHub
- ✅ View deployment logs
- ✅ Roll back if needed

---

## Troubleshooting:

### Issue: "Build failed"
**Fix:** Make sure you set Root Directory to `client`

### Issue: "Page not found" or blank screen
**Fix:** The `vercel.json` file (already added) handles this

### Issue: Firebase errors in production
**Fix:** Your Firebase config is already in the code - it will work!

---

## Environment Variables (Optional):

If you want to hide your Firebase keys:

1. In Vercel dashboard → Your Project → Settings → Environment Variables
2. Add these:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - etc.

3. Update `firebaseConfig.js` to use:
   ```javascript
   apiKey: import.meta.env.VITE_FIREBASE_API_KEY
   ```

But this is optional - your current setup will work fine!
