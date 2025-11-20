# SkateHubba™ Deployment Guide

## 🎯 Architecture Overview

SkateHubba uses a **decoupled deployment strategy** for optimal performance and scalability:

```
┌─────────────────────┐         ┌──────────────────────┐
│   Web UI            │         │   API Backend        │
│   (Vercel)          │ ◄─API──►│   (Replit Autoscale) │
│   apps/web          │         │   apps/server        │
│   Port: 3000        │         │   Port: 8000         │
└─────────────────────┘         └──────────────────────┘
                                          │
                                 ┌────────┴────────┐
                                 │  PostgreSQL DB  │
                                 │  Firebase Auth  │
                                 └─────────────────┘
```

---

## ✅ COMPLETED: API Backend Deployment

Your API backend is **already deployed** on Replit Autoscale!

### Deployment URL
```
https://YOUR-REPLIT-DEPLOYMENT-URL.replit.app
```

### Test Your API
```bash
curl https://YOUR-REPLIT-DEPLOYMENT-URL.replit.app/api/health
# Should return: {"status":"ok","env":"production"}
```

---

## 🚀 NEXT: Deploy Web UI to Vercel

### Why Vercel?
- **Built for Next.js**: Vercel created Next.js - best performance
- **Edge Network**: Global CDN for fast loading
- **Free Tier**: Generous free tier for frontend hosting
- **Easy Deploys**: Git-based deployments
- **Zero Config**: Optimized for Next.js out of the box

### Prerequisites
1. **GitHub Account**: Connect your repo
2. **Vercel Account**: Free at [vercel.com](https://vercel.com)
3. **Your API URL**: Your Replit deployment URL from above

---

## 📝 Step-by-Step Vercel Deployment

### Step 1: Push Code to GitHub
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### Step 2: Import Project to Vercel
1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"**
3. Select your **SkateHubba repository**
4. Vercel will auto-detect it's a monorepo

### Step 3: Configure Build Settings
In Vercel's import wizard:

**Root Directory:**
```
apps/web
```

**Framework Preset:**
```
Next.js
```

**Build Command:**
```
cd ../.. && pnpm run build --filter @skatehubba/web
```

**Install Command:**
```
cd ../.. && pnpm install --frozen-lockfile
```

**Output Directory:**
```
.next
```

### Step 4: Set Environment Variables
In Vercel dashboard → Settings → Environment Variables, add:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_API_URL` | `https://YOUR-REPLIT-API-URL.replit.app` |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | `AIzaSyBLjxVN6GqKBH7dXOTj_hJ0JL9BJD4K-KU` |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | `sk8hub-d7806.firebaseapp.com` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | `sk8hub-d7806` |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | `sk8hub-d7806.firebasestorage.app` |

⚠️ **IMPORTANT**: Replace `YOUR-REPLIT-API-URL.replit.app` with your actual API deployment URL!

### Step 5: Deploy
1. Click **"Deploy"**
2. Wait 2-3 minutes for build
3. Get your live URL: `https://your-project.vercel.app`

---

## 🔧 Post-Deployment: Update API CORS

Your API needs to allow requests from your Vercel domain.

### Update Server CORS (in apps/server/server/index.ts)
```typescript
const corsOptions = {
  origin: [
    'https://your-project.vercel.app',  // Add your Vercel URL
    'http://localhost:5000',
    'http://localhost:3000'
  ],
  credentials: true
};
```

Then redeploy your API on Replit.

---

## 🧪 Testing Your Deployment

### 1. Test API Directly
```bash
curl https://YOUR-REPLIT-API-URL.replit.app/api/health
```

### 2. Test Web UI
```bash
# Open in browser
https://your-project.vercel.app
```

### 3. Test Full Flow
1. Visit your Vercel URL
2. Try signing up/logging in
3. Check browser console for errors
4. Verify API calls are working

---

## 📱 Optional: Deploy Landing Page

The landing page (`apps/landing`) can also be deployed to Vercel:

1. Create a new Vercel project
2. Point to `apps/landing` as root directory
3. Use same build configuration as web app

---

## 🔄 Continuous Deployment

Once set up, every push to `main` branch:
- ✅ Automatically builds on Vercel
- ✅ Runs tests
- ✅ Deploys to production
- ✅ No manual steps needed

---

## 🆘 Troubleshooting

### Web UI Shows "Cannot connect to API"
- Check CORS configuration in API
- Verify `NEXT_PUBLIC_API_URL` environment variable
- Check browser console for CORS errors

### Build Fails on Vercel
- Check build logs in Vercel dashboard
- Verify all workspace packages are building
- Try running `pnpm run build --filter @skatehubba/web` locally first

### API Returns 404
- Verify your API deployment is running on Replit
- Check your API URL is correct
- Test `/api/health` endpoint directly

---

## 📊 Current Deployment Status

| Component | Platform | Status | URL |
|-----------|----------|--------|-----|
| **API Backend** | Replit Autoscale | ✅ Deployed | `YOUR-REPLIT-URL` |
| **Web UI** | Vercel | ⏳ Pending | Follow steps above |
| **Landing Page** | Vercel | ⏳ Optional | Follow steps above |
| **Mobile App** | Expo | 📱 Separate build | Use EAS Build |

---

## 💡 Pro Tips

1. **Use Vercel CLI** for faster deploys: `vercel deploy`
2. **Preview Deploys**: Every PR gets its own preview URL
3. **Analytics**: Enable Vercel Analytics for usage tracking
4. **Custom Domain**: Add your own domain in Vercel settings
5. **Environment Branches**: Use different API URLs for staging/production

---

## 🎉 Success Checklist

- [ ] API backend deployed to Replit Autoscale
- [ ] Web UI deployed to Vercel
- [ ] Environment variables configured
- [ ] CORS updated in API
- [ ] Test authentication flow
- [ ] Test API connectivity
- [ ] Custom domain configured (optional)

---

**Need Help?** Check the Vercel docs or Replit deployment guides for more info!
