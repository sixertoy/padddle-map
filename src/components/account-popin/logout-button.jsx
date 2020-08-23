import firebase from 'firebase/app';
import React, { useCallback } from 'react';
import { IoMdLogOut as LogoutIcon } from 'react-icons/io';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import { rgba } from '../../core';
import { logoutUser } from '../../redux/actions';

const useStyles = createUseStyles({
  button: {
    '& svg': {
      marginLeft: 7,
    },
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
    transition: 'color 0.5s, background 0.5s',
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
      <span>Déconnection</span>
      <LogoutIcon />
    </button>
  );
};

export default LogoutButtonComponent;
