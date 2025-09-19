# Voice Transcriber 🎙️

A React Native/Expo app for recording voice and transcribing it using Cloudflare's Whisper API.

## 📋 Prerequisites

### General Requirements

- Node.js 18+ and npm/yarn
- Expo CLI: `npm install -g expo-cli`
- EAS CLI (for builds): `npm install -g eas-cli`

### iOS Requirements (Mac only)

- macOS with Xcode 14+
- CocoaPods: `sudo gem install cocoapods`
- iOS Simulator or physical device

### Android Requirements

- Android Studio with SDK
- Android Emulator or physical device with USB debugging
- Java JDK 11+

## 🚀 Quick Start

```bash
# 1. Clone and install
git clone <your-repo>
cd voice-transcriber
npm install

# 2. Setup API keys (REQUIRED - see detailed instructions below)
cp .env.example .env.local
# Edit .env.local with your Cloudflare credentials

# 3. Run the app
npx expo start  # For Expo Go
# OR
npx expo prebuild && npm run ios     # For iOS
npx expo prebuild && npm run android  # For Android
```

## 📝 Detailed Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables (REQUIRED!)

⚠️ **Important: The app won't work without proper API keys!**

#### Getting Cloudflare API Credentials:

1. **Get Account ID:**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Select your domain/website (or create a free account)
   - On the right sidebar, find "Account ID" and copy it

2. **Create API Token:**
   - Go to [API Tokens page](https://dash.cloudflare.com/profile/api-tokens)
   - Click "Create Token"
   - Use "Custom token" template with these permissions:
     - **Account** → Workers AI:Edit
     - **Account** → Account Settings:Read
   - Click "Continue to summary" → "Create Token"
   - Copy the token (you won't see it again!)

3. **Configure the app:**
```bash
# Copy the example env file
cp .env.example .env.local

# Open .env.local in your editor and add your credentials:
nano .env.local  # or use any text editor

# Add these lines with YOUR actual values:
EXPO_PUBLIC_CLOUDFLARE_ACCOUNT_ID=your_actual_account_id_here
EXPO_PUBLIC_CLOUDFLARE_API_TOKEN=your_actual_api_token_here
```

⚠️ **Security Notes:** 
- Never commit `.env.local` to git! It contains sensitive API keys
- The example values in `.env.example` won't work - you need your own
- Free Cloudflare account works for testing (with API limits)

### 3. Running in Development (Expo Go)

The easiest way to start - no native build required:

```bash
# Start Expo dev server
npx expo start

# Then:
# - Press 'i' for iOS Simulator
# - Press 'a' for Android Emulator
# - Scan QR code with Expo Go app on your phone
```

## 📱 Building for Native Platforms

### Prebuild (Generate Native Folders)

```bash
# This creates /ios and /android folders
npx expo prebuild

# Clean prebuild if needed
npx expo prebuild --clear
```

### iOS Build & Run 🍎

#### Option 1: Direct to Simulator

```bash
# After prebuild, install CocoaPods dependencies
cd ios
pod install
cd ..

# Run on iOS Simulator
npm run ios

# Or specify a device
npm run ios -- --device "iPhone 15 Pro"
```

#### Option 2: Physical Device

1. Open `ios/myapp.xcworkspace` in Xcode
2. Select your device in the toolbar
3. Sign the app with your Apple Developer account
4. Press Run (⌘R)

#### Troubleshooting iOS

```bash
# If pod install fails
cd ios
pod repo update
pod install --repo-update
cd ..

# Clear all caches
npx expo start --clear
cd ios && pod deintegrate && pod install && cd ..
```

### Android Build & Run 🤖

#### Option 1: Direct to Emulator

```bash
# Make sure Android Emulator is running first
# Then:
npm run android
```

#### Option 2: Physical Device

```bash
# Enable Developer Options and USB Debugging on your phone
# Connect via USB and check connection
adb devices

# Run on connected device
npm run android

# If multiple devices connected
npm run android -- --device=DEVICE_ID
```

#### Troubleshooting Android

```bash
# If build fails
cd android
./gradlew clean
cd ..
npx expo prebuild --clear

# If device not recognized
adb kill-server
adb start-server
adb devices
```

## 🏗️ Production Builds

### Using EAS Build (Recommended)

1. Install and login to EAS:

```bash
npm install -g eas-cli
eas login
```

2. Configure your project:

```bash
eas build:configure
```

3. Build for iOS:

```bash
# Development build for testing
eas build --platform ios --profile development

# Production build for App Store
eas build --platform ios --profile production
```

4. Build for Android:

```bash
# Development APK
eas build --platform android --profile development

# Production AAB for Play Store
eas build --platform android --profile production
```

### Local Builds

#### iOS (Mac only)

```bash
# Archive for App Store
npx expo build:ios -t archive

# Or use Xcode:
# 1. Open ios/VoiceTranscriber.xcworkspace
# 2. Product → Archive
```

#### Android

```bash
# Build APK
cd android
./gradlew assembleRelease
# APK will be in android/app/build/outputs/apk/release/

# Build AAB for Play Store
./gradlew bundleRelease
# AAB will be in android/app/build/outputs/bundle/release/
```

## 🔧 Common Issues & Solutions

### Permission Issues

- **iOS**: Microphone permission is configured in `Info.plist`
- **Android**: Microphone permission is in `AndroidManifest.xml`
- Both handled automatically by expo-audio

### Metro Bundler Issues

```bash
# Clear Metro cache
npx expo start --clear

# Reset everything
watchman watch-del-all
rm -rf node_modules
npm install
npx expo start --clear
```

### Build Errors

```bash
# Full reset
rm -rf node_modules
rm -rf ios android
npm install
npx expo prebuild --clear

# iOS specific
cd ios && pod deintegrate && pod install && cd ..

# Android specific
cd android && ./gradlew clean && cd ..
```

## 📝 Development Tips

1. **Hot Reload**: Shake device or press 'r' in terminal
2. **Debug Menu**: Shake device or press 'd' in terminal
3. **Logs**: Use `npx react-native log-ios` or `npx react-native log-android`
4. **Type Check**: `npm run typescript`
5. **Lint**: `npm run lint`

## 🛠️ Tech Stack

- React Native 0.81.4
- Expo SDK 54
- TypeScript
- expo-audio for recording
- Cloudflare Workers AI (Whisper) for transcription

## 📄 License

MIT

## 🤝 Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open a Pull Request

## 🆘 Support

For issues, please check:

1. [Expo Documentation](https://docs.expo.dev)
2. [React Native Docs](https://reactnative.dev)
3. GitHub Issues in this repo

---
