import get from 'lodash.get';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import {
  FirebaseAuthContext,
  getFirebaseConfig,
  initFirebaseWithConfig,
} from './core';

const FirebaseAuthProvider = ({ children, config, firebase, persistence }) => {
  const app = initFirebaseWithConfig(firebase, config);
  const changeListener = useRef(null);

  const [state, setState] = useState({
    firebase: app,
    isAnonymous: true,
    isReady: false,
    isSignedIn: false,
    providerId: null,
    user: null,
  });

  const onAuthChange = useCallback(
    user => {
      const nextState = {
        firebase: app,
        isAdmin: false,
        isAnonymous: get(user, 'isAnonymous', true),
        isReady: true,
        isSignedIn: Boolean(user),
        providerId: get(user, 'providerData.0.providerId', null),
        user,
      };
      if (user) {
        firebase
          .auth()
          .currentUser.getIdTokenResult()
          .then(idTokenResult => {
            const isAdmin = !!idTokenResult.claims.admin;
            setState({ ...nextState, isAdmin });
          });
      } else {
        setState(nextState);
      }
    },
    [app, firebase]
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
  }, [app, onAuthChange, persistence]);

  return (
    <FirebaseAuthContext.Provider value={state}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};

FirebaseAuthProvider.defaultProps = {
  config: getFirebaseConfig(),
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
  persistence: PropTypes.oneOf([
    'local', // firebase.auth.Auth.Persistence.LOCAL,
    'sesssion', // firebase.auth.Auth.Persistence.SESSION,
    'none', // firebase.auth.Auth.Persistence.NONE,
  ]),
};

FirebaseAuthProvider.displayName = 'FirebaseAuthProvider';

export default FirebaseAuthProvider;
