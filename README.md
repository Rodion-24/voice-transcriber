# Voice Transcriber 🎙️

Voice recording and transcription app using Cloudflare Whisper API.

## Requirements

- **Node.js**: 18+
- **Java JDK**: 11+ (17 recommended)
- **iOS**: macOS with Xcode 14+, CocoaPods
- **Android**: Android Studio, Android SDK

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure API Keys (REQUIRED!)

1. Get Cloudflare credentials from [dashboard](https://dash.cloudflare.com):

   - Account ID (right sidebar)
   - [Create API Token](https://dash.cloudflare.com/profile/api-tokens) with Workers AI:Edit permission

2. Setup environment:

```bash
cp .env.example .env.local

# Add your credentials to .env.local:
EXPO_PUBLIC_CLOUDFLARE_ACCOUNT_ID=your_account_id
EXPO_PUBLIC_CLOUDFLARE_API_TOKEN=your_api_token
```

## Run the App

### Expo Go (Easiest)

```bash
npx expo start
# Press 'i' for iOS, 'a' for Android, or scan QR code
```

### iOS

```bash
npx expo prebuild
cd ios && pod install && cd ..
npm run ios
```

### Android

```bash
npx expo prebuild
npm run android
# Make sure emulator is running or device connected
```

## Troubleshooting

```bash
# Clear everything and start fresh
rm -rf node_modules ios android
npm install
npx expo prebuild --clear

# iOS specific
cd ios && pod deintegrate && pod install && cd ..

# Android specific
cd android && ./gradlew clean && cd ..
```
