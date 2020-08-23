import firebase from 'firebase/app';
import React, { useCallback } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import { rgba } from '../../core';
import { logoutUser } from '../../redux/actions';

const useStyles = createUseStyles({
  button: {
    '&:hover': { background: rgba('#4267B2', 0.75) },
    background: '#4267B2',
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
    transition: 'all 0.3s',
    width: '100%',
  },
});

const LogoutButtonComponent = function LogoutButtonComponent() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const signoutHandler = useCallback(() => {
    firebase
      .auth()
      .signOut()
      .then(() => dispatch(logoutUser()))
      .catch(() => {});
  }, [dispatch]);

  return (
    <button className={classes.button} type="button" onClick={signoutHandler}>
      <span>Déconnexion</span>
    </button>
  );
};

export default LogoutButtonComponent;
