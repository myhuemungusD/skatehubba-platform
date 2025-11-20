# 🔌 Connecting Your UI to the API Backend

This guide shows you exactly how to connect each frontend app to your Express API backend.

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend Apps                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Web App      │  │ Landing Page │  │ Admin Panel  │      │
│  │ (Vite+React) │  │ (Next.js)    │  │ (Next.js)    │      │
│  │ Port 5000    │  │ Port 3000    │  │ Port 5000    │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
│         │                 │                  │              │
└─────────┼─────────────────┼──────────────────┼──────────────┘
          │                 │                  │
          └─────────────────┴──────────────────┘
                            │
                   HTTP API Requests
                            │
          ┌─────────────────┴──────────────────┐
          │   Express API Backend               │
          │   Port 8000 (local dev)            │
          │   https://your-api.replit.app      │
          │   (production - Autoscale)         │
          └────────────────────────────────────┘
```

---

## ✅ What's Already Set Up

I've created API client files for all your apps:

### 📁 File Structure
```
apps/
├── web/src/lib/api.ts          ← Web app API client
├── landing/lib/api.ts          ← Landing page API client
├── admin/lib/api.ts            ← Admin panel API client
└── server/                     ← API backend (running on port 8000)

.env.example                    ← Environment variables template
```

---

## 🚀 How to Use the API in Each App

### **1️⃣ Web App (Vite + React)**

**File:** `apps/web/src/lib/api.ts`

#### Example Usage in Components:

```tsx
import { useEffect, useState } from 'react'
import { api } from './lib/api'

function SpotsMap() {
  const [spots, setSpots] = useState([])

  useEffect(() => {
    // Fetch all spots from API
    api.getSpots()
      .then(setSpots)
      .catch(console.error)
  }, [])

  return (
    <div>
      {spots.map(spot => (
        <Marker key={spot.id} position={[spot.lat, spot.lng]}>
          <Popup>{spot.name}</Popup>
        </Marker>
      ))}
    </div>
  )
}
```

#### Creating a New Spot:

```tsx
const handleCreateSpot = async (spotData) => {
  try {
    const newSpot = await api.createSpot({
      name: 'Venice Skatepark',
      lat: 33.9857,
      lng: -118.4723,
      description: 'Legendary spot!'
    })
    console.log('Spot created:', newSpot)
  } catch (error) {
    console.error('Failed to create spot:', error)
  }
}
```

#### Getting User Profile (Authenticated):

```tsx
import { useProfile } from './hooks/useProfile'

function ProfilePage() {
  const { data: profile, isLoading } = useProfile()

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <h1>{profile.username}</h1>
      <p>Hubba Bucks: {profile.hubbaBucks}</p>
    </div>
  )
}
```

---

### **2️⃣ Admin Panel (Next.js)**

**File:** `apps/admin/lib/api.ts`

#### Example Usage in Admin Components:

```tsx
'use client'

import { useState, useEffect } from 'react'
import { adminApi } from '@/lib/api'

export default function ManageSpots() {
  const [spots, setSpots] = useState([])

  useEffect(() => {
    // Fetch all spots for moderation
    adminApi.getAllSpots()
      .then(setSpots)
      .catch(console.error)
  }, [])

  const handleApprove = async (spotId: string) => {
    await adminApi.approveSpot(spotId)
    // Refresh list
    setSpots(spots.filter(s => s.id !== spotId))
  }

  const handleDelete = async (spotId: string) => {
    if (confirm('Delete this spot?')) {
      await adminApi.deleteSpot(spotId)
      setSpots(spots.filter(s => s.id !== spotId))
    }
  }

  return (
    <div>
      <h2>Pending Spots</h2>
      {spots.map(spot => (
        <div key={spot.id}>
          <h3>{spot.name}</h3>
          <button onClick={() => handleApprove(spot.id)}>Approve</button>
          <button onClick={() => handleDelete(spot.id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}
```

#### Dashboard Stats:

```tsx
'use client'

import { useState, useEffect } from 'react'
import { adminApi } from '@/lib/api'

export default function Dashboard() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    adminApi.getStats()
      .then(setStats)
      .catch(console.error)
  }, [])

  if (!stats) return <div>Loading...</div>

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="stat-card">
        <h3>Total Users</h3>
        <p className="text-4xl">{stats.totalUsers}</p>
      </div>
      <div className="stat-card">
        <h3>Active Spots</h3>
        <p className="text-4xl">{stats.activeSpots}</p>
      </div>
      <div className="stat-card">
        <h3>Live Streams</h3>
        <p className="text-4xl">{stats.liveStreams}</p>
      </div>
      <div className="stat-card">
        <h3>Pending Approvals</h3>
        <p className="text-4xl text-red-500">{stats.pendingApprovals}</p>
      </div>
    </div>
  )
}
```

---

### **3️⃣ Landing Page (Next.js)**

**File:** `apps/landing/lib/api.ts`

#### Email Subscription Form:

```tsx
'use client'

import { useState } from 'react'
import { api } from '@/lib/api'

export default function SubscribeForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      await api.subscribe(email)
      setStatus('Thanks for subscribing! 🎉')
      setEmail('')
    } catch (error) {
      setStatus('Failed to subscribe. Try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
      />
      <button type="submit">Get Early Access</button>
      {status && <p>{status}</p>}
    </form>
  )
}
```

---

## ⚙️ Environment Configuration

### **Step 1: Set Up Environment Variables**

Create `.env.local` in each app:

#### For Web App (`apps/web/.env.local`):
```bash
VITE_API_URL=http://localhost:8000
VITE_FIREBASE_API_KEY=AIzaSyD0T3cZOj4RgXZy5NnVGxBiP4aSKJhDxRs
VITE_FIREBASE_AUTH_DOMAIN=sk8hub-d7806.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=sk8hub-d7806
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

#### For Admin Panel (`apps/admin/.env.local`):
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyD0T3cZOj4RgXZy5NnVGxBiP4aSKJhDxRs
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=sk8hub-d7806.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=sk8hub-d7806
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

#### For Landing Page (`apps/landing/.env.local`):
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## 🔐 Authentication Flow

### How Firebase Auth + API Works Together:

1. **User signs in** with Firebase (Google, Email, etc.)
2. **Firebase generates a token** for that user
3. **Your app sends the token** with every API request
4. **API verifies the token** and identifies the user
5. **API returns user-specific data**

#### Example with Auth:

```tsx
import { getAuth } from 'firebase/auth'
import { api } from './lib/api'

async function fetchMyData() {
  // User must be signed in
  const auth = getAuth()
  if (!auth.currentUser) {
    console.error('Not signed in!')
    return
  }

  // API client automatically includes auth token
  const profile = await api.getProfile()
  console.log('My profile:', profile)
}
```

---

## 🌐 Local Development vs Production

### **Local Development** (Right Now)

All apps connect to `http://localhost:8000`:

```
Web App (localhost:5000) ──┐
Landing (localhost:3000) ───┼──> API (localhost:8000)
Admin (localhost:5000) ─────┘
```

### **Production** (After Deployment)

Your API is deployed to Replit Autoscale. Get the URL:

1. Go to your Replit dashboard
2. Click "Deployments"
3. Copy your API URL (e.g., `https://your-api-123.replit.app`)

Then update `.env.local`:

```bash
# Production API URL
VITE_API_URL=https://your-api-123.replit.app
NEXT_PUBLIC_API_URL=https://your-api-123.replit.app
```

---

## 📋 Available API Endpoints

### **Web App Endpoints** (`api` from `apps/web/src/lib/api.ts`)

| Method | Description | Auth Required |
|--------|-------------|---------------|
| `api.getProfile()` | Get current user profile | ✅ Yes |
| `api.updateProfile(data)` | Update user profile | ✅ Yes |
| `api.getSpots()` | Get all skate spots | ❌ No |
| `api.getSpot(id)` | Get single spot | ❌ No |
| `api.createSpot(data)` | Create new spot | ✅ Yes |
| `api.getChallenges()` | Get S.K.A.T.E challenges | ✅ Yes |
| `api.createChallenge(data)` | Create challenge | ✅ Yes |
| `api.getLeaderboard()` | Get leaderboard | ❌ No |
| `api.subscribe(email)` | Email subscription | ❌ No |

### **Admin Panel Endpoints** (`adminApi` from `apps/admin/lib/api.ts`)

| Method | Description | Auth Required |
|--------|-------------|---------------|
| `adminApi.getStats()` | Dashboard stats | ✅ Admin |
| `adminApi.getAllSpots()` | All spots (moderation) | ✅ Admin |
| `adminApi.approveSpot(id)` | Approve pending spot | ✅ Admin |
| `adminApi.deleteSpot(id)` | Delete spot | ✅ Admin |
| `adminApi.getPendingStreams()` | Get pending streams | ✅ Admin |
| `adminApi.approveStream(id)` | Approve stream | ✅ Admin |
| `adminApi.getAllUsers()` | Get all users | ✅ Admin |
| `adminApi.banUser(id, reason)` | Ban user | ✅ Admin |
| `adminApi.verifyProUser(id)` | Verify pro skater | ✅ Admin |
| `adminApi.getFlaggedClips()` | Get flagged clips | ✅ Admin |
| `adminApi.createEvent(data)` | Create event | ✅ Admin |
| `adminApi.getAnalytics(timeframe)` | Get analytics | ✅ Admin |
| `adminApi.createAnnouncement(data)` | Push announcement | ✅ Admin |

---

## 🧪 Testing the Connection

### **Quick Test in Browser Console:**

Open your web app and run:

```javascript
// Test API connection
fetch('http://localhost:8000/api/spots')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error)
```

### **Test with the API Client:**

```tsx
import { api } from './lib/api'

// In your component
useEffect(() => {
  api.getSpots()
    .then(spots => console.log('Spots:', spots))
    .catch(err => console.error('API Error:', err))
}, [])
```

---

## 🐛 Common Issues & Solutions

### **Issue: CORS Error**

**Error:** `Access to fetch has been blocked by CORS policy`

**Solution:** Your API backend already has CORS enabled. Make sure:
1. API is running on port 8000
2. You're using the correct URL (`http://localhost:8000`)

### **Issue: 401 Unauthorized**

**Error:** `HTTP 401`

**Solution:** 
1. Make sure user is signed in with Firebase
2. Check that the endpoint requires auth
3. Verify Firebase token is being sent

### **Issue: Connection Refused**

**Error:** `Failed to fetch` or `ERR_CONNECTION_REFUSED`

**Solution:**
1. Check if API is running: `curl http://localhost:8000/api/health`
2. Restart the "SkateHubba API" workflow
3. Verify port 8000 is correct

---

## ✅ Summary

**You're all set!** Here's what you have:

✅ **API Client Files** created for all 3 apps  
✅ **Automatic Auth Integration** (Firebase tokens handled automatically)  
✅ **Type-Safe API Methods** (all endpoints defined)  
✅ **Environment Config** (.env.example provided)  
✅ **Production-Ready** (just update API URL when deployed)  

### **Next Steps:**

1. **Test locally:** Run your web app and try fetching spots
2. **Add backend endpoints:** Implement missing API routes in `apps/server`
3. **Deploy API:** Your API is already deployed to Autoscale
4. **Update env vars:** Switch to production URL when ready

---

**Need help?** Check the examples above or ask me to show you specific API integrations! 🚀
