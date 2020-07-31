import get from 'lodash.get';
import PropTypes from 'prop-types';
import React from 'react';
import { AiOutlineGoogle } from 'react-icons/ai';
import { GoGistSecret, GoMail, GoMarkGithub } from 'react-icons/go';
import { createUseStyles } from 'react-jss';

import Signout from './signout';

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
      return AiOutlineGoogle;
    case 'email':
      return GoMail;
    default:
      return GoGistSecret;
  }
}

const AccountComponent = React.memo(({ user }) => {
  const classes = useStyles();

  const name = get(user, 'name', null);
  const email = get(user, 'email', null);
  const provider = get(user, 'provider', null);
  const ProviderIcon = getProviderIcon(provider);
  const photoURL = get(user, 'photoURL', null);

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
      <Signout />
    </div>
  );
});

AccountComponent.propTypes = {
  user: PropTypes.shape().isRequired,
};

export default AccountComponent;
