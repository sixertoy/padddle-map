import firebase from 'firebase/app';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { FaGoogle as BrandIcon } from 'react-icons/fa';
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

const GoogleProviderComponent = ({ onError, onSuccess }) => {
  const classes = useStyles();

  const googleSigninHandler = useCallback(() => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().languageCode = 'fr_FR';
    firebase.auth().signInWithPopup(provider)
.then(onSuccess)
.catch(onError);
  }, [onError, onSuccess]);

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

GoogleProviderComponent.propTypes = {
  onError: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default GoogleProviderComponent;
