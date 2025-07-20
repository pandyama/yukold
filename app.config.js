require('dotenv').config()

export default {
  extra: {
    API_KEY: process.env.API_KEY,
    eas: {
      projectId: 'c90f4720-589c-4c49-98d6-244e7e77b2e7',
    },
  },
  android: {
    package: 'com.mp.yukold',
    versionCode: 8,
    version: '1.1.4',
    adaptiveIcon: {
      foregroundImage: './assets/appIcon.png',
      backgroundColor: '#FFFFFF',
    },
    softwareKeyboardLayoutMode: 'pan',
  },

  plugins: ['expo-build-properties', 'expo-font'],
}
