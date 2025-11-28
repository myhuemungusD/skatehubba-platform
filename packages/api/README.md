# SkateHubba Firebase Backend

Complete Firebase infrastructure with Cloud Functions, Firestore security rules, and Storage rules.

## 📁 Structure

```
packages/firebase/
├── src/
│   └── functions/
│       └── index.ts           # Cloud Functions (triggers & schedulers)
├── firestore.rules             # Firestore security rules
├── firestore.indexes.json      # Composite indexes for queries
├── firestore.schema.json       # Data model documentation
├── storage.rules               # Firebase Storage rules
├── firebase.json               # Firebase deployment config
└── package.json                # Dependencies
```

## 🔥 Cloud Functions

### Challenge Lifecycle
- **`onChallengeCreate`** - Validates clip duration, sets deadline
- **`onChallengeUpdate`** - Validates reply clip, marks completed
- **`onChallengeComplete`** - Awards Hubba Bucks to winner, updates stats
- **`checkChallengeTimeouts`** (scheduler) - Marks expired challenges as forfeit (every 60 min)

### Bounty System
- **`rotateBounties`** (scheduler) - Refreshes spot bounties daily (00:00)
- **`onCheckinCreate`** - Awards Hubba Bucks for spot check-ins

### Heshur AI
- **`heshurChat`** - Gemini-powered skate guru chatbot

## 📊 Firestore Data Models

### Collections
- **users** - User profiles with stats, gear, sponsors
- **challenges** - S.K.A.T.E game challenges with clips
- **spots** - Skate spot locations with bounties
- **checkins** - User check-ins with proof videos
- **wallets** - Hubba Bucks balances and transactions
- **closet** - User inventory (decks, clothes, hardware)

See `firestore.schema.json` for complete schema.

## 🔒 Security

### Firestore Rules
- **Users**: Read all, write own only
- **Challenges**: Read all, create/update participants only
- **Spots**: Public read, admin write only
- **Wallets**: Own wallet only
- **Closet**: Own items only

### Storage Rules
- Max file size: 8MB
- Video only: MP4/H.264
- Max clip duration: 15s (validated by functions)

## 🚀 Deployment

### Prerequisites
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Select project
firebase use sk8hub-d7806
```

### Deploy Everything
```bash
# From packages/firebase directory
cd packages/firebase

# Deploy all (rules, indexes, functions)
firebase deploy

# Or deploy specific components
firebase deploy --only firestore:rules
firebase deploy --only firestore:indexes
firebase deploy --only storage:rules
firebase deploy --only functions
```

### Deploy Specific Function
```bash
firebase deploy --only functions:onChallengeCreate
firebase deploy --only functions:heshurChat
```

## 🧪 Local Testing with Emulators

### Start Emulators
```bash
cd packages/firebase

# Start all emulators
firebase emulators:start

# Emulator UI: http://localhost:4000
# Functions: http://localhost:5001
# Firestore: http://localhost:8080
# Storage: http://localhost:9199
```

### Test Functions
```javascript
// In your app, connect to emulators
import { connectFunctionsEmulator } from 'firebase/functions';
import { connectFirestoreEmulator } from 'firebase/firestore';
import { connectStorageEmulator } from 'firebase/storage';

const functions = getFunctions();
const firestore = getFirestore();
const storage = getStorage();

if (import.meta.env.DEV) {
  connectFunctionsEmulator(functions, 'localhost', 5001);
  connectFirestoreEmulator(firestore, 'localhost', 8080);
  connectStorageEmulator(storage, 'localhost', 9199);
}
```

## 📝 Indexes

Composite indexes for optimized queries:
- Challenges by creator + status + deadline
- Challenges by opponent + status + deadline
- Check-ins by uid + spot + timestamp
- Users by handle
- Spots by difficulty + created

Deploy: `firebase deploy --only firestore:indexes`

## 🔑 Secrets

Required secrets for Cloud Functions:

```bash
# Set Gemini API key for Heshur chat
firebase functions:secrets:set GEMINI_KEY
```

## 📊 Metrics & Monitoring

### Performance Targets
- Function cold start: <800ms
- Firestore reads: <0.1¢/1K reads
- Storage egress: <5GB/month initially

### Monitoring
```bash
# View function logs
firebase functions:log

# View specific function
firebase functions:log --only onChallengeCreate

# Live logs
firebase functions:log --only heshurChat --type cloud --stream
```

## 🛠️ Development Workflow

### 1. Update Functions
Edit `src/functions/index.ts`

### 2. Test Locally
```bash
firebase emulators:start
```

### 3. Deploy
```bash
firebase deploy --only functions
```

### 4. Monitor
```bash
firebase functions:log --stream
```

## ⚡ Key Features

- ✅ Automatic challenge expiration (24h)
- ✅ Video duration validation (15s max)
- ✅ Wallet auto-creation
- ✅ Daily bounty rotation
- ✅ Winner/loser stats tracking
- ✅ Hubba Bucks rewards
- ✅ AI-powered Heshur chatbot

## 📦 Dependencies

- `firebase-admin` - Admin SDK for server-side operations
- `firebase-functions` - Cloud Functions framework
- `dayjs` - Date/time manipulation
- `@google/generative-ai` - Gemini API client

## 🐛 Troubleshooting

### Functions not deploying
```bash
# Check Node version (should be 20+)
node --version

# Clear cache and redeploy
firebase deploy --only functions --force
```

### Emulators not starting
```bash
# Kill existing processes
lsof -ti:5001 | xargs kill -9
lsof -ti:8080 | xargs kill -9

# Restart
firebase emulators:start
```

### Firestore rules errors
```bash
# Test rules locally
firebase emulators:start --only firestore

# Check rules syntax
firebase firestore:rules:validate firestore.rules
```

## 📚 Resources

- [Firebase Functions Docs](https://firebase.google.com/docs/functions)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase Storage Rules](https://firebase.google.com/docs/storage/security)
- [Firebase Emulator Suite](https://firebase.google.com/docs/emulator-suite)
