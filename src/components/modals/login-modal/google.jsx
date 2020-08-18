import firebase from 'firebase/app';
import React, { useCallback } from 'react';
import { FaFacebookSquare as BrandIcon } from 'react-icons/fa';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  button: {
    background: '#C94130',
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

const GoogleProviderComponent = () => {
  const classes = useStyles();
  const googleSigninHandler = useCallback(() => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  }, []);

  return (
    <button
      className={classes.button}
      type="button"
      onClick={googleSigninHandler}>
      <span>Google</span>
      <BrandIcon className={classes.icon} />
    </button>
  );
};

export default GoogleProviderComponent;
