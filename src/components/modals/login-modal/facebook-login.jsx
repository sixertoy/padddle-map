import firebase from 'firebase/app';
import get from 'lodash.get';
import React, { useCallback, useState } from 'react';
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

function isUserEqual(userId, firebaseUser) {
  if (!firebaseUser) return false;
  const providerData = get(firebaseUser, 'providerData', null);
  const found = providerData.find(obj => {
    const uid = get(obj, 'uid', null);
    const providerId = get(obj, 'providerId', null);
    const useFacebook = providerId === 'facebook.com';
    return useFacebook && uid === userId;
  });
  return !!found;
}

const FacebookLoginProviderComponent = function FacebookLoginProviderComponent() {
  const classes = useStyles();

  const [disabled, setDisabled] = useState(false);

  const checkLoginState = useCallback(event => {
    const userId = get(event, 'userID', null);
    if (userId) {
      setDisabled(true);
      const unsubscribe = firebase.auth().onAuthStateChanged(user => {
        unsubscribe();
        if (!isUserEqual(userId, user)) {
          const accessToken = get(event, 'accessToken', null);
          const credChecker = firebase.auth.FacebookAuthProvider.credential;
          const credential = credChecker(accessToken);
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
        }
      });
    } else {
      firebase.auth().signOut();
    }
  }, []);

  return (
    <FacebookLogin
      // autoLoad
      appId="288008652477160"
      callback={checkLoginState}
      redirectUri="https://www.facebook.com/connect/login_success.html"
      // redirectUri="https://padddle.io"
      render={({ onClick }) => (
        <button
          className={classes.button}
          disabled={disabled}
          type="button"
          onClick={onClick}>
          <span>Connexion</span>
          <BrandIcon className={classes.icon} />
        </button>
      )}
    />
  );
};

export default FacebookLoginProviderComponent;
