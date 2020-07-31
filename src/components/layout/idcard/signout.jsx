import firebase from 'firebase/app';
import React, { useCallback } from 'react';
import { GoSignOut as LogoutIcon } from 'react-icons/go';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import { rgba } from '../../../core';
import { logoutUser } from '../../../redux/actions';

const useStyles = createUseStyles({
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
});

const SignoutComponent = React.memo(() => {
  const classes = useStyles();
  const dispatch = useDispatch();

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
    <button className={classes.button} type="button" onClick={signoutHandler}>
      <span>Signout</span>
      <LogoutIcon />
    </button>
  );
});

export default SignoutComponent;
