# 🎥 S.K.A.T.E. Challenge System

## Overview

The S.K.A.T.E. Challenge system allows users to create **15-second one-take video challenges** and send them to opponents. This is the core competitive feature of SkateHubba™.

---

## 🎯 Features

### **One-Take Challenges**
- ✅ 15-second hard cap (enforced client + server-side)
- ✅ H.264 720p video (optimized for mobile)
- ✅ 8MB max file size
- ✅ Record with rear camera
- ✅ Real-time countdown timer
- ✅ Preview before sending

### **Challenge Flow**
1. User selects opponent
2. Records 15-second trick
3. Previews video
4. Uploads to Firebase Storage
5. Cloud Function validates and transcodes
6. Opponent gets push notification
7. Opponent has 24h to respond

### **Server Validation** (Cloud Functions)
- ✅ Verify exact 15-second duration (±0.5s tolerance)
- ✅ Transcode to H.264 720p if needed
- ✅ Send FCM push notification to opponent
- ✅ Anti-cheat: Block pre-recorded videos (future)

---

## 📁 File Structure

```
apps/mobile/
├── app/
│   └── challenge/
│       └── new.tsx                 ← Main challenge creation screen
├── components/
│   ├── Timer.tsx                   ← Real-time countdown timer
│   └── ChallengePreview.tsx        ← Video preview component
└── lib/
    └── firebase.ts                 ← Firebase Storage/Functions integration
```

---

## 🚀 How to Use

### **1. Start Challenge**

```tsx
import { router } from 'expo-router';

// Navigate to challenge creation
router.push('/challenge/new?opponentHandle=sk8erdude');
```

### **2. Record Video**

User sees:
- Camera view (rear camera)
- Timer counting down from 15s
- "RECORD" button → turns to "STOP" when recording
- Automatic stop at 15s

### **3. Preview & Send**

After recording:
- Video preview loops with mute
- "SEND CHALLENGE" button
- Upload progress bar (0-100%)

### **4. Upload & Cloud Processing**

```javascript
// Client uploads to Firebase Storage
challenges/{userId}/{timestamp}.mp4

// Cloud Function:
1. Validates 15s duration
2. Transcodes to H.264 720p
3. Stores transcoded URL
4. Notifies opponent via FCM
```

---

## 🔧 Components

### **Timer Component** (`Timer.tsx`)

Real-time countdown with pulse animation:

```tsx
<Timer
  duration={15}
  onExpire={() => stopRecording()}
/>
```

**Features:**
- Counts down from 15s
- Updates every 0.1s
- Pulse animation when expires
- Auto-stops recording

### **ChallengePreview Component** (`ChallengePreview.tsx`)

Video preview with looping playback:

```tsx
<ChallengePreview uri={recordedVideoUri} />
```

**Features:**
- Loops video preview
- Muted playback
- 80% screen width
- Rounded corners with border

---

## 🎥 Camera Permissions

### **iOS** (`Info.plist`)
```xml
<key>NSCameraUsageDescription</key>
<string>SkateHubba needs camera access for S.K.A.T.E. challenges</string>
<key>NSMicrophoneUsageDescription</key>
<string>SkateHubba needs microphone access for challenge audio</string>
```

### **Android** (`AndroidManifest.xml`)
```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.RECORD_AUDIO" />
```

---

## ☁️ Cloud Function Setup

### **Firebase Functions** (`functions/src/index.ts`)

```typescript
export const onChallengeCreate = functions.https.onCall(async (data, context) => {
  const { challengeId, videoUrl } = data;
  
  // 1. Validate duration (15s ±0.5s)
  const duration = await getVideoDuration(videoUrl);
  if (Math.abs(duration - 15) > 0.5) {
    throw new Error('Video must be exactly 15 seconds');
  }
  
  // 2. Transcode to H.264 720p
  const transcodedUrl = await transcodeVideo(videoUrl);
  
  // 3. Update Firestore
  await db.doc(`challenges/${challengeId}`).update({
    'clipA.url': transcodedUrl
  });
  
  // 4. Send FCM notification to opponent
  await sendPushNotification(opponent, 'New Challenge!');
});
```

---

## 🔥 Firestore Schema

### **Challenge Document**
```javascript
challenges/{challengeId}
{
  createdBy: "userId123",
  opponent: "@sk8erdude",
  status: "pending",              // pending | accepted | completed
  rules: {
    oneTake: true,
    durationSec: 15
  },
  clipA: {
    url: "https://storage.../video.mp4",
    uploadedAt: Timestamp
  },
  clipB: {                        // Opponent's response
    url: "https://...",
    uploadedAt: Timestamp
  },
  createdAt: Timestamp,
  expiresAt: Timestamp            // 24h from creation
}
```

---

## 📱 User Flow Diagram

```
┌─────────────────┐
│  Select Opponent │
└────────┬─────────┘
         │
         ▼
┌─────────────────┐
│  Open Camera     │
│  (rear camera)   │
└────────┬─────────┘
         │
         ▼
┌─────────────────┐
│  Tap RECORD      │
│  Timer starts    │
└────────┬─────────┘
         │
         ▼
┌─────────────────┐
│  Recording...    │
│  (15s max)       │
└────────┬─────────┘
         │
         ▼
┌─────────────────┐
│  Auto Stop or    │
│  Manual Stop     │
└────────┬─────────┘
         │
         ▼
┌─────────────────┐
│  Preview Video   │
│  (looping)       │
└────────┬─────────┘
         │
         ▼
┌─────────────────┐
│  Tap SEND        │
│  Upload progress │
└────────┬─────────┘
         │
         ▼
┌─────────────────┐
│  Cloud Function  │
│  validates +     │
│  transcodes      │
└────────┬─────────┘
         │
         ▼
┌─────────────────┐
│  Opponent gets   │
│  push notification│
└─────────────────┘
```

---

## 🎨 UI/UX Design

### **Recording State**
- Black background (#0a0a0a)
- Camera preview (90% width)
- Timer overlay (top center)
- Red "RECORD" button (bottom center)
- Neon green when recording

### **Preview State**
- Video loops with mute
- Gold "SEND CHALLENGE" button
- "vs @opponent" subtitle

### **Upload State**
- Neon green progress text
- Percentage display (0-100%)

---

## 🔒 Security & Validation

### **Client-Side** (Mobile App)
- Max 15s recording enforced by camera
- 8MB file size check before upload
- Blob size validation

### **Server-Side** (Cloud Functions)
- FFmpeg video duration validation
- Transcode to standardized format
- Anti-tamper checks (future)

---

## 📊 Technical Specs

| Feature | Specification |
|---------|---------------|
| Video Duration | Exactly 15 seconds (±0.5s tolerance) |
| Video Format | H.264 720p |
| Max File Size | 8MB |
| Bitrate | ~2 Mbps |
| FPS | 30 fps |
| Audio | AAC |
| Camera | Rear camera only |
| Upload | Firebase Storage |
| Processing | Cloud Functions + FFmpeg |

---

## 🐛 Troubleshooting

**"Camera not available"**
→ Grant camera permission in Settings

**"Video exceeds 8MB limit"**
→ Reduce recording quality or duration

**"Upload failed"**
→ Check network connection + Firebase Storage rules

**"Permission denied" error**
→ Configure Firebase Storage rules:
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /challenges/{userId}/{fileName} {
      allow write: if request.auth != null && request.auth.uid == userId;
      allow read: if request.auth != null;
    }
  }
}
```

---

## 🎯 Next Steps

### **Immediate**
- [ ] Configure Firebase Storage rules
- [ ] Deploy Cloud Function for validation
- [ ] Test camera permissions on iOS/Android

### **Short-term**
- [ ] Add opponent selection UI
- [ ] Show challenge list screen
- [ ] Implement response flow (opponent records back)
- [ ] Add voting system for winners

### **Long-term**
- [ ] Add filters/effects during recording
- [ ] Allow slow-motion playback
- [ ] Add trick detection AI
- [ ] Leaderboards for challenge wins

---

**Built with 🛹 for SkateHubba™**
