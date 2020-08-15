import firebase from 'firebase/app';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
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

const FacebookProviderComponent = ({ onError, onSuccess }) => {
  const classes = useStyles();

  const signinHandler = useCallback(() => {
    const promised = firebase.auth().getRedirectResult();
    promised.then(onSuccess).catch(onError);
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  }, [onError, onSuccess]);

  return (
    <button className={classes.button} type="button" onClick={signinHandler}>
      <span>Connexion</span>
      <BrandIcon className={classes.icon} />
    </button>
  );
};

FacebookProviderComponent.propTypes = {
  onError: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default FacebookProviderComponent;
