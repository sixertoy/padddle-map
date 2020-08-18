let FIREBASE_APP_SINGLETON = null;

export function getFirebaseApp() {
  return FIREBASE_APP_SINGLETON;
}

export function initFirebaseWithConfig(firebase, config) {
  if (FIREBASE_APP_SINGLETON) {
    return FIREBASE_APP_SINGLETON;
  }
  try {
    FIREBASE_APP_SINGLETON = firebase.initializeApp(config);
    firebase.auth().useDeviceLanguage();
    if (config.measurementId) {
      firebase.analytics();
    }
  } catch (err) {
    if (err.code !== 'app/duplicate-app') {
      throw err;
    }
  }
  return FIREBASE_APP_SINGLETON;
}
