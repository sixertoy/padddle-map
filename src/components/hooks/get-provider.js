import firebase from 'firebase/app';

import {
  // FIREBASE_PROVIDER_EMAIL,
  FIREBASE_PROVIDER_FACEBOOK,
  // FIREBASE_PROVIDER_GOOGLE,
} from '../../../constants';

const getProviderById = (providerId = null) => {
  if (!providerId) return null;
  switch (providerId) {
    case FIREBASE_PROVIDER_FACEBOOK:
      return new firebase.auth.FacebookAuthProvider();
    default:
      return null;
  }
};

export default getProviderById;
