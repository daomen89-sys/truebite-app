# TrueBite — Android App (Capacitor + React)

A prototype Android app for TrueBite pet food (dry & wet food for cats and dogs),
built with React + Vite and wrapped as a native Android app with Capacitor.

**Status:** Working prototype / demo. Product catalog is placeholder data, and the
payment gateway is a fully simulated pass-through (no real transactions). Replace
both before any real release — see "Before you ship" below.

---

## Project structure

```
truebite-app/
├── src/App.jsx          ← the entire app UI (screens, cart, checkout, dummy PG)
├── src/main.jsx         ← React entry point
├── index.html
├── vite.config.js
├── capacitor.config.ts  ← app id, name, splash/theme color
├── package.json
└── android/              ← native Android project (open this in Android Studio)
```

---

## Requirements

- Node.js 18+ and npm
- Android Studio (latest stable) with Android SDK installed
- A JDK (Android Studio bundles one — Build > JDK settings if you need to point to it)

---

## 1. Install dependencies

```bash
npm install
```

## 2. Build the web app and sync into the Android project

```bash
npm run build
npx cap sync android
```

Run this after any change to `src/`. It rebuilds `dist/` and copies it into
`android/app/src/main/assets/public`.

## 3. Open in Android Studio

```bash
npx cap open android
```

(Or open the `android/` folder directly from Android Studio's "Open" dialog.)

Let Gradle sync finish, then hit **Run ▶** with an emulator or a plugged-in device.
First sync can take a few minutes while Android Studio pulls Gradle/SDK dependencies.

## 4. Build a signed release APK/AAB (when you're ready to distribute)

In Android Studio: **Build > Generate Signed Bundle / APK**, then follow the
wizard to create or select a keystore. Or from the command line:

```bash
cd android
./gradlew assembleRelease      # unsigned release APK
# or
./gradlew bundleRelease        # Android App Bundle for Play Store
```

You'll need to configure signing in `android/app/build.gradle` (or via the
Android Studio wizard) before `assembleRelease` produces an installable, signed APK.

---

## App identity

- **App name:** TrueBite
- **Package / Application ID:** `com.truebite.app`
- **Brand colors:** Pine `#1F3A2E` (primary), Broth `#C6572E` (accent)
- Launcher icon and splash screen are already generated from the brand mark
  (`android/app/src/main/res/mipmap-*` and `res/drawable*/splash.png`).
  A standalone source `truebite-app-icon.svg` is included if you want to
  regenerate or redesign these later.

---

## Building the APK on GitHub (no Android Studio needed)

This project includes a GitHub Actions workflow (`.github/workflows/build-apk.yml`)
that builds a debug APK in the cloud every time you push. This is the easiest
path if you don't want to install Android Studio locally.

**One-time setup:**

1. Create a new repo on GitHub (github.com → New repository).
2. Push this project to it:
   ```bash
   cd truebite-app
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```
3. On GitHub, go to the **Actions** tab of your repo. You'll see "Build Android
   APK" running automatically (takes ~3–5 minutes).

**Every time after that:** just `git push` — the workflow reruns automatically.

**Downloading the APK to install on your phone:**

1. On GitHub, open the **Actions** tab → click the latest successful run.
2. Scroll to **Artifacts** → tap `truebite-debug-apk` to download it (this
   works directly from your phone's browser if you open the Actions page
   on your phone — GitHub's mobile web UI supports artifact downloads).
3. Open the downloaded `.apk` file from your phone's Downloads/notifications.
   Android will prompt to install it — you may need to allow "Install
   unknown apps" for your browser the first time (Settings > Apps > Special
   access > Install unknown apps).
4. Done — TrueBite is installed like any other app.

No signing is required for this debug build; it installs fine for testing,
just not eligible for Play Store distribution as-is (see "Before you ship").

---



1. **Replace the placeholder catalog.** `src/App.jsx` has a `PRODUCTS` array
   with 16 demo items (generic names/descriptions, no real photography). Swap
   in your real product data and photos — do not scrape competitor sites for
   this; it's a copyright/ToS risk regardless of environment.
2. **Replace the dummy payment gateway.** The `PaymentScreen` component
   simulates UPI/Card/Wallet checkout with a `setTimeout` and always succeeds.
   Before real money moves, integrate a licensed payment aggregator (e.g.
   Razorpay, Cashfree, PayU) via their official Android/JS SDK — this is a
   regulatory requirement in India (PCI-DSS, RBI guidelines), not just a
   code swap.
3. **Backend.** There's currently no backend — cart, orders, and addresses
   live only in memory and reset on app restart. You'll want an API for
   product data, auth, and order persistence before this is a real store.
4. **App icon / Play Store assets.** The launcher icon is ready; you'll also
   need a Play Store feature graphic, screenshots, and privacy policy URL
   for Play Console listing.

---

## Local development (browser preview, no Android Studio needed)

```bash
npm run dev
```

Opens a hot-reloading browser preview at the printed localhost URL — useful
for iterating on the UI before syncing to Android.
