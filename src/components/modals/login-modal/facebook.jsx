import firebase from 'firebase/app';
import React, { useCallback } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { FaFacebookSquare as BrandIcon } from 'react-icons/fa';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  button: {
    background: '#4267B2',
    borderRadius: 4,
    color: '#FFF',
    composes: ['flex-columns', 'flex-center', 'items-center', 'p12'],
    maxWidth: '100%',
    minWidth: '100%',
    width: '100%',
  },
  icon: {
    fontSize: '1.2rem',
    marginLeft: 7,
  },
});

const FacebookProviderComponent = function FacebookProviderComponent() {
  const classes = useStyles();

  const isUserEqual = useCallback((facebookAuthResponse, firebaseUser) => {
    if (firebaseUser) {
      const { providerData } = firebaseUser;
      // eslint-disable-next-line
      for (let i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.FacebookAuthProvider.PROVIDER_ID &&
          providerData[i].uid === facebookAuthResponse.userID
        ) {
          // We don't need to re-auth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }, []);

  const checkLoginState = useCallback(
    event => {
      if (event.authResponse) {
        // User is signed-in Facebook.
        const unsubscribe = firebase.auth().onAuthStateChanged(firebaseUser => {
          unsubscribe();
          // Check if we are already signed-in Firebase with the correct user.
          if (!isUserEqual(event.authResponse, firebaseUser)) {
            // Build Firebase credential with the Facebook auth token.
            const credential = firebase.auth.FacebookAuthProvider.credential(
              event.authResponse.accessToken
            );
            // Sign in with the credential from the Facebook user.
            firebase
              .auth()
              .signInWithCredential(credential)
              .catch(() => {
                // Handle Errors here.
                // const errorCode = error.code;
                // const errorMessage = error.message;
                // The email of the user's account used.
                // const { email } = error;
                // The firebase.auth.AuthCredential type that was used.
                // const { credential } = error;
              });
          } else {
            // User is already signed-in Firebase with the correct user.
          }
        });
      } else {
        // User is signed-out of Facebook.
        firebase.auth().signOut();
      }
    },
    [isUserEqual]
  );

  return (
    <FacebookLogin
      autoLoad
      appId="288008652477160"
      callback={checkLoginState}
      render={({ onClick }) => (
        <button className={classes.button} type="button" onClick={onClick}>
          <span>Connexion</span>
          <BrandIcon className={classes.icon} />
        </button>
      )}
    />
  );
};

export default FacebookProviderComponent;
