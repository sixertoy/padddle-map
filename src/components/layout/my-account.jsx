import firebase from 'firebase/app';
import get from 'lodash.get';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { FaFacebookSquare, FaGoogle } from 'react-icons/fa';
import {
  GoGistSecret,
  GoMail,
  GoMarkGithub,
  GoSignOut as LogoutIcon,
} from 'react-icons/go';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import { rgba } from '../../core';
import { logoutUser } from '../../redux/actions';

const img = {
  borderRadius: '50%',
  height: 92,
  margin: '0 auto',
  width: 92,
};

const useStyles = createUseStyles({
  avatar: {
    '& img': { extend: img },
    composes: ['is-flex', 'is-relative'],
  },
  button: {
    '& svg': { marginLeft: 7 },
    '&:hover': { background: rgba('#000000', 0.45), color: '#FFFFFF' },
    borderColor: rgba('#000000', 0.25),
    borderStyle: 'solid',
    borderWidth: 1,
    color: '#959AA0',
    composes: ['is-block', 'p12', 'no-background', 'fs14'],
    transition: 'color 0.5s, background 0.5s',
    width: '100%',
  },
  container: {
    composes: ['fs16'],
  },
  email: {
    color: '#959AA0',
    composes: ['is-block', 'fs14'],
  },
  infos: {
    composes: ['py24', 'text-center'],
    letterSpacing: '0.02em',
  },
  name: {
    composes: ['is-block', 'is-bold', 'mb3'],
  },
  provider: {
    background: '#EB7496',
    borderRadius: '50%',
    bottom: 0,
    color: '#FFFFFF',
    composes: ['is-absolute', 'fs20', 'text-center'],
    height: 32,
    left: '56%',
    width: 32,
  },
});

function getProviderIcon(providerid) {
  switch (providerid) {
    case 'github.com':
      return GoMarkGithub;
    case 'google.com':
      return FaGoogle;
    case 'facebook.com':
      return FaFacebookSquare;
    case 'email':
      return GoMail;
    default:
      return GoGistSecret;
  }
}

const AccountComponent = React.memo(({ user }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const name = get(user, 'displayName', null);
  const email = get(user, 'email', null);
  const photoURL = get(user, 'photoURL', null);
  const provider = get(user, 'providerData.0.providerId', null);
  const ProviderIcon = getProviderIcon(provider);

  const signoutHandler = useCallback(() => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch(logoutUser());
      })
      .catch(() => {});
  }, [dispatch]);

  return (
    <div className={classes.container}>
      <div className={classes.avatar}>
        <img alt="user avatar" src={photoURL} />
        <div className={classes.provider}>
          <ProviderIcon />
        </div>
      </div>
      <div className={classes.infos}>
        {name && <span className={classes.name}>{name}</span>}
        <span className={classes.email}>{email}</span>
      </div>
      <button className={classes.button} type="button" onClick={signoutHandler}>
        <span>Signout</span>
        <LogoutIcon />
      </button>
    </div>
  );
});

AccountComponent.propTypes = {
  user: PropTypes.shape().isRequired,
};

export default AccountComponent;
