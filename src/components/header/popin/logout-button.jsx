import firebase from 'firebase/app';
import React, { useCallback } from 'react';
import { IoMdLogOut as LogoutIcon } from 'react-icons/io';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import { rgba } from '../../../core';
import { logoutUser } from '../../../redux/actions';

const useStyles = createUseStyles({
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
});

const LogoutButtonComponent = () => {
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
      <span>Déconnection</span>
      <LogoutIcon />
    </button>
  );
};

LogoutButtonComponent.defaultProps = {};

LogoutButtonComponent.propTypes = {};

export default LogoutButtonComponent;
