import firebase from 'firebase/app';
import get from 'lodash.get';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import {
  FaFacebookSquare as FacebookIcon,
  FaGoogle as GoogleIcon,
} from 'react-icons/fa';
import {
  GoGistSecret as AnonIcon,
  GoMail as MailIcon,
  GoMarkGithub as GithubIcon,
} from 'react-icons/go';
import { IoMdLogOut as LogoutIcon } from 'react-icons/io';
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
  account: {
    padding: 12,
    width: 200,
  },
  avatar: {
    '& img': { extend: img },
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '50%',
    composes: ['is-flex', 'is-relative'],
    height: 92,
    margin: '0 auto',
    width: 92,
  },
  button: {
    '& svg': {
      marginLeft: 7,
    },
    '&:hover': { background: rgba('#FF5950', 0.75) },
    background: '#FF5950',
    borderRadius: 8,
    borderStyle: 'solid',
    borderWidth: 1,
    color: '#FFFFFF',
    composes: [
      'is-block',
      'p12',
      'no-background',
      'fs14',
      'flex-columns',
      'flex-center',
      'items-center',
    ],
    transition: 'color 0.5s, background 0.5s',
    width: '100%',
  },
  container: {
    composes: ['fs16', 'flex-columns', 'flex-end'],
    fontFamily: '"mulish", helvetica, arial, sans-serif',
  },
  infos: {
    '& .email': {
      color: '#959AA0',
      display: 'block',
      fontSize: '0.7em',
    },
    '& .name': {
      display: 'block',
      fontWeight: 'bold',
    },
    composes: ['py24', 'text-center'],
    letterSpacing: '0.02em',
  },
  provider: {
    '& .icon': {
      marginTop: 6,
    },
    background: '#4267B2',
    borderRadius: '50%',
    bottom: -10,
    color: '#FFFFFF',
    composes: ['is-absolute', 'fs20', 'text-center'],
    height: 32,
    left: '65%',
    width: 32,
  },
  settings: {
    background: 'rgba(0, 0, 0, 0.1)',
    width: 160,
  },
});

function getProviderIcon(providerid) {
  switch (providerid) {
    case 'github.com':
      return GithubIcon;
    case 'google.com':
      return GoogleIcon;
    case 'facebook.com':
      return FacebookIcon;
    case 'email':
      return MailIcon;
    default:
      return AnonIcon;
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
      {/* <div className={classes.settings} /> */}
      <div className={classes.account}>
        <div className={classes.avatar}>
          <img alt="user avatar" src={photoURL} />
          <div className={classes.provider}>
            <ProviderIcon className="icon" />
          </div>
        </div>
        <div className={classes.infos}>
          {name && <span className="name">{name}</span>}
          <span className="email">{email}</span>
        </div>
        <button
          className={classes.button}
          type="button"
          onClick={signoutHandler}>
          <span>Déconnection</span>
          <LogoutIcon />
        </button>
      </div>
    </div>
  );
});

AccountComponent.propTypes = {
  user: PropTypes.shape().isRequired,
};

export default AccountComponent;
