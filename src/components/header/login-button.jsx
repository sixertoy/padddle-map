import React, { useCallback } from 'react';
import { GoPerson as LoginIcon } from 'react-icons/go';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import { openLoginModal } from '../../redux/actions';

const useStyles = createUseStyles({
  button: {
    '& .icon': {
      marginLeft: 8,
      marginRight: 8,
    },
    border: '1px solid #FF5950',
    borderRadius: 20,
    color: '#FF5950',
    composes: [
      'is-block',
      'fs16',
      'p5',
      'no-overflow',
      'flex-columns',
      'items-center',
    ],
    height: 42,
    paddingLeft: '16px !important',
  },
  name: {
    fontSize: '0.8em',
    fontWeight: 600,
    whiteSpace: 'nowrap',
  },
});

const LoginButtonComponent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const loginHandler = useCallback(() => {
    dispatch(openLoginModal());
  }, [dispatch]);

  return (
    <button className={classes.button} type="button" onClick={loginHandler}>
      <span className={classes.name}>Se connecter</span>
      <LoginIcon className={classes.icon} />
    </button>
  );
};

export default LoginButtonComponent;
