import get from 'lodash.get';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import {
  FirebaseAuthContext,
  getFirebaseConfig,
  initFirebaseWithConfig,
} from './core';

const FirebaseAuthProvider = ({
  children,
  config,
  firebase,
  onLogin,
  onLogout,
  persistence,
}) => {
  const changeListener = useRef(null);
  const app = initFirebaseWithConfig(firebase, config);

  const [state, setState] = useState({
    firebase: app,
    isAnonymous: true,
    isReady: false,
    isSignedIn: false,
    providerId: null,
    token: null,
    user: null,
  });

  const onAuthChange = useCallback(
    user => {
      const isAnonymous = get(user, 'isAnonymous', true);
      const providerId = get(user, 'providerData.0.providerId', null);
      const nextState = {
        firebase: app,
        isAdmin: false,
        isAnonymous,
        isReady: true,
        isSignedIn: Boolean(user),
        providerId,
        token: null,
        user,
      };
      if (user) {
        setState(nextState);
        if (onLogin) onLogin(user);
      } else {
        setState(nextState);
        if (onLogout) onLogout();
      }
    },
    [app, onLogin, onLogout]
  );

  useEffect(() => {
    if (!changeListener.current) {
      app.auth().setPersistence(persistence);
      changeListener.current = app.auth().onAuthStateChanged(onAuthChange);
    }
    return () => {
      const removeChangedListener = changeListener.current;
      removeChangedListener();
    };
  }, [app, firebase, onAuthChange, persistence]);

  return (
    <FirebaseAuthContext.Provider value={state}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};

FirebaseAuthProvider.defaultProps = {
  config: getFirebaseConfig(),
  onLogin: null,
  onLogout: null,
  persistence: 'local',
};

FirebaseAuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
  config: PropTypes.shape({
    apiKey: PropTypes.string.isRequired,
    appId: PropTypes.string,
    authDomain: PropTypes.string.isRequired,
    databaseURL: PropTypes.string.isRequired,
    messagingSenderId: PropTypes.string,
    projectId: PropTypes.string.isRequired,
    storageBucket: PropTypes.string.isRequired,
  }),
  firebase: PropTypes.shape().isRequired,
  onLogin: PropTypes.func,
  onLogout: PropTypes.func,
  persistence: PropTypes.oneOf([
    'local', // firebase.auth.Auth.Persistence.LOCAL,
    'sesssion', // firebase.auth.Auth.Persistence.SESSION,
    'none', // firebase.auth.Auth.Persistence.NONE,
  ]),
};

FirebaseAuthProvider.displayName = 'FirebaseAuthProvider';

export default FirebaseAuthProvider;
