import get from 'lodash.get';
import React from 'react';
import {
  FaFacebookSquare as FacebookIcon,
  FaGoogle as GoogleIcon,
} from 'react-icons/fa';
import {
  GoGistSecret as AnonIcon,
  GoMail as MailIcon,
  GoMarkGithub as GithubIcon,
} from 'react-icons/go';
import { createUseStyles } from 'react-jss';

import { FirebaseAuthConsumer } from '../../core/firebase';

const useStyles = createUseStyles({
  avatar: {
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '50%',
    composes: ['is-flex', 'is-relative'],
    height: 92,
    margin: '0 auto',
    width: 92,
  },
  icon: {
    marginTop: 6,
  },
  img: {
    borderRadius: '50%',
    height: 92,
    margin: '0 auto',
    width: 92,
  },
  provider: {
    background: '#4267B2',
    borderRadius: '50%',
    bottom: -10,
    color: '#FFFFFF',
    composes: ['is-absolute', 'fs20', 'text-center'],
    height: 32,
    left: '65%',
    width: 32,
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

const ProfilePictureComponent = () => {
  const classes = useStyles();
  return (
    <FirebaseAuthConsumer>
      {({ user }) => {
        const photoURL = get(user, 'photoURL', null);
        const provider = get(user, 'providerData.0.providerId', null);
        const ProviderIcon = getProviderIcon(provider);
        return (
          <div className={classes.avatar}>
            <img alt="user avatar" className={classes.img} src={photoURL} />
            <div className={classes.provider}>
              <ProviderIcon className={classes.icon} />
            </div>
          </div>
        );
      }}
    </FirebaseAuthConsumer>
  );
};

export default ProfilePictureComponent;
