import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.gilitravel.angular',
  appName: 'travel',
  webDir: 'dist/travel',
  server: {
    androidScheme: 'https'
  }
};

export default config;
