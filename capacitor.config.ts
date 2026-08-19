import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.truebite.app',
  appName: 'TrueBite',
  webDir: 'dist',
  backgroundColor: '#1F3A2E',
  android: {
    backgroundColor: '#1F3A2E'
  },
  plugins: {
    SplashScreen: {
      backgroundColor: '#1F3A2E',
      showSpinner: false
    }
  }
};

export default config;
