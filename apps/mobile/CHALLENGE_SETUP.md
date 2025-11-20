# 🚀 Challenge System Setup Guide

## Quick Start

Your S.K.A.T.E. challenge system is ready! Here's how to complete setup.

---

## ✅ What's Built

| Component | Status |
|-----------|--------|
| Challenge Screen | ✅ Built |
| Timer Component | ✅ Built |
| Preview Component | ✅ Built |
| Firebase Storage | ✅ Configured |
| Firebase Functions | ⚠️ Need to deploy |
| Camera Permissions | ⚠️ Need to configure |

---

## 📱 Configure Permissions

### **iOS** (apps/mobile/ios/SkateHubba/Info.plist)

Add these keys:

```xml
<key>NSCameraUsageDescription</key>
<string>SkateHubba needs camera access for S.K.A.T.E. challenges</string>

<key>NSMicrophoneUsageDescription</key>
<string>SkateHubba needs microphone access for challenge audio</string>
```

### **Android** (apps/mobile/android/app/src/main/AndroidManifest.xml)

Add these permissions:

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-feature android:name="android.hardware.camera" android:required="false" />
<uses-feature android:name="android.hardware.camera.autofocus" android:required="false" />
```

---

## ☁️ Deploy Cloud Function

### **1. Set Up Firebase Functions**

```bash
cd infra/firebase/functions
npm install
```

### **2. Install FFmpeg** (for video processing)

```bash
npm install fluent-ffmpeg @google-cloud/storage
```

### **3. Deploy Function**

```bash
firebase deploy --only functions:onChallengeCreate
```

### **4. Configure Storage Rules**

In Firebase Console → Storage → Rules:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /challenges/{userId}/{fileName} {
      // Users can upload their own challenges
      allow write: if request.auth != null && request.auth.uid == userId;
      
      // All authenticated users can view challenges
      allow read: if request.auth != null;
    }
  }
}
```

---

## 🧪 Test the System

### **1. Navigate to Challenge**

```tsx
import { router } from 'expo-router';

router.push('/challenge/new?opponentHandle=testuser');
```

### **2. Record Video**
- Tap "RECORD" button
- Wait for timer countdown
- Video auto-stops at 15s

### **3. Preview & Send**
- Review looping preview
- Tap "SEND CHALLENGE"
- Watch upload progress

### **4. Verify Firebase**

Check Firebase Console:
- **Storage**: `challenges/{userId}/{timestamp}.mp4` exists
- **Firestore**: `challenges/{challengeId}` document created
- **Functions**: `onChallengeCreate` executed successfully

---

## 🔧 Dependencies Installed

```json
{
  "react-native-vision-camera": "^4.0.0",
  "expo-av": "^16.0.7",
  "@react-native-firebase/storage": "^23.5.0",
  "@react-native-firebase/functions": "^23.5.0"
}
```

---

## 📋 Checklist

- [ ] Add camera permission strings (iOS + Android)
- [ ] Deploy Cloud Function to Firebase
- [ ] Configure Firebase Storage rules
- [ ] Test recording on physical device
- [ ] Verify upload to Storage
- [ ] Confirm Cloud Function execution

---

## 🐛 Common Issues

**"Camera not available"**
→ Run on physical device (simulator cameras don't work)

**"Permission denied"**
→ Add permission strings to Info.plist/AndroidManifest.xml

**"Module not found: react-native-vision-camera"**
→ Run `pod install` in `ios/` folder

**"Cloud Function error"**
→ Check Firebase Functions logs in console

---

**Ready to record! 🛹**
