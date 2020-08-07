import React, { useCallback } from 'react';
import { GoPerson as LoginIcon } from 'react-icons/go';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import { openLoginModal } from '../../redux/actions';

const useStyles = createUseStyles({
  container: {
    border: '3px solid #FF5950',
    borderRadius: '50%',
    color: '#FF5950',
    fontSize: '1.6rem',
    height: 32,
    lineHeight: '36px',
    overflow: 'hidden',
    width: 32,
  },
});

const LoginButtonComponent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const loginHandler = useCallback(() => {
    dispatch(openLoginModal());
  }, [dispatch]);

  return (
    <button className={classes.container} type="button" onClick={loginHandler}>
      <LoginIcon />
    </button>
  );
};

export default LoginButtonComponent;
