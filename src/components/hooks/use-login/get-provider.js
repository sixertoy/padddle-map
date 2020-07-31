import firebase from 'firebase/app';

import {
  // FIREBASE_PROVIDER_EMAIL,
  FIREBASE_PROVIDER_GOOGLE,
} from '../../../constants';

const getProviderById = (providerId = null) => {
  if (!providerId) return null;
  switch (providerId) {
    case FIREBASE_PROVIDER_GOOGLE:
      return new firebase.auth.GoogleAuthProvider();
    default:
      return null;
  }
};

export default getProviderById;
