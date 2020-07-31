import React from 'react';

const FirebaseAuthContext = React.createContext({
  firebase: {},
  isSignedIn: false,
  providerId: null,
  user: null,
});

FirebaseAuthContext.displayName = 'FirebaseAuthContext';

export default FirebaseAuthContext;
