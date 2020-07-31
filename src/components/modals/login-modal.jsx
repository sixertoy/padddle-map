import firebase from 'firebase/app';
import React from 'react';
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

const LoginModalComponent = () => {
  const classes = useStyles();

  const signinHandler = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().languageCode = 'fr_FR';
    provider.addScope('user_birthday');
    provider.setCustomParameters({
      display: 'popup',
    });
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(({ credential, user }) => {
        const { accessToken } = credential.accessToken;
        console.log('user', user);
        console.log('accessToken', accessToken);
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  return (
    <button className={classes.button} type="button" onClick={signinHandler}>
      <span>Facebook</span>
      <BrandIcon className={classes.icon} />
    </button>
  );
};

export default LoginModalComponent;
