import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.subtracking.app',
  appName: 'SubTracking',
  webDir: 'out',
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: 'YOUR_WEB_CLIENT_ID', // Replaced Later
      forceCodeForRefreshToken: true,
    },
  },
};

export default config;
