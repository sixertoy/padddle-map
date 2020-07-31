import firebase from 'firebase/app';
import { useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';

import {
  FIREBASE_AUTH_LOCAL,
  FIREBASE_AUTH_SESSION,
  // FIREBASE_PROVIDER_EMAIL,
  FIREBASE_PROVIDER_GITHUB,
  FIREBASE_PROVIDER_GOOGLE,
} from '../../../constants';
import { deleteUser, updateUser } from '../../../redux/actions';
import getProvider from './get-provider';

const ACCOUNT_EXISTS_CODE = 'auth/account-exists-with-different-credential';

const getProviderById = (providerId = null) => {
  if (!providerId) return null;
  switch (providerId) {
    case FIREBASE_PROVIDER_GOOGLE:
      return new firebase.auth.GoogleAuthProvider();
    case FIREBASE_PROVIDER_GITHUB:
      return new firebase.auth.GithubAuthProvider();
    default:
      return null;
  }
};

const useLogin = (providerId = null) => {
  const dispatch = useDispatch();
  const providerRef = useRef(getProvider(providerId));

  // const onLogoutError = useCallback(() => {
  // TODO
  // }, []);

  // const onLogoutSuccess = useCallback(() => {
  // TODO
  // }, []);

  const onLoginSuccess = useCallback(
    ({ user }) => {
      dispatch(updateUser({ user }));
    },
    [dispatch]
  );

  // NOTE documentation auth
  // https://firebase.google.com/docs/auth/web/google-signin#expandable-1-label
  const onLoginError = useCallback(
    err => {
      const auth = firebase.auth();
      const { code, credential, email, message } = err;
      if (code !== ACCOUNT_EXISTS_CODE) {
        throw new Error(message);
      }
      auth.fetchSignInMethodsForEmail(email).then(methods => {
        console.log('methods', methods);
        const [method] = methods;
        if (method === 'email') {
          // TODO something
          return;
        }
        const pid = getProviderById(method);
        if (!pid) {
          // TODO throw error
          return;
        }
        auth.signInWithPopup(pid).then(({ user }) => {
          user
            .linkAndRetrieveDataWithCredential(credential)
            .then(onLoginSuccess);
        });
      });
    },
    [onLoginSuccess]
  );

  const onSigninWithEmail = useCallback(() => {
    // NOTE
    // https://firebase.google.com/docs/auth/web/email-link-auth
  }, []);

  const onSignoutClick = useCallback(
    evt => {
      evt.preventDefault();
      firebase
        .auth()
        .signOut()
        .then(() => dispatch(deleteUser()))
        .catch(err => {
          console.log('err => ', err);
        });
    },
    [dispatch]
  );

  const onSigninClick = useCallback(
    evt => {
      evt.preventDefault();
      firebase
        .auth()
        .setPersistence(FIREBASE_AUTH_LOCAL)
        .then(() => firebase.auth().signInWithPopup(providerRef.current))
        .then(onLoginSuccess)
        .catch(onLoginError);
    },
    [onLoginError, onLoginSuccess]
  );

  const onAnonymousClick = useCallback(
    evt => {
      evt.preventDefault();
      firebase
        .auth()
        .setPersistence(FIREBASE_AUTH_SESSION)
        .then(() => firebase.auth().signInAnonymously())
        .then(onLoginSuccess)
        .catch(onLoginError);
    },
    [onLoginError, onLoginSuccess]
  );

  return {
    onAnonymousClick,
    onLoginError,
    onLoginSuccess,
    onSigninClick,
    onSigninWithEmail,
    onSignoutClick,
  };
};

export default useLogin;
