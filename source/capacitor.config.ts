import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.gueopic.gueopic',
  appName: 'Gueopic',
  webDir: 'www',
  plugins: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    SplashScreen: {
      // launchShowDuration: 3000,
      launchAutoHide: false,
      // backgroundColor: '#ffffffff',
      // androidSplashResourceName: 'splash',
      // androidScaleType: 'CENTER_CROP',
      showSpinner: true,
      androidSpinnerStyle: 'small',
      iosSpinnerStyle: 'small',
      // spinnerColor: '#999999',
      // splashFullScreen: true,
      // splashImmersive: true,
      // layoutName: 'launch_screen',
      // useDialog: true
    },
    server: {
      androidScheme: 'http',
    },
  },
};

export default config;
