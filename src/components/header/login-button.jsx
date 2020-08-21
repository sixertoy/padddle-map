import React, { useCallback } from 'react';
import { MdAdd as PlusIcon } from 'react-icons/md';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import { openLoginModal } from '../../redux/actions';

const useStyles = createUseStyles({
  button: {
    '& svg': {
      fontSize: 18,
      marginLeft: 8,
    },
    border: '1px solid #FF5950',
    borderRadius: 20,
    color: '#FF5950',
    composes: [
      'is-block',
      'is-bold',
      'fs16',
      'py5',
      'no-overflow',
      'flex-columns',
      'items-center',
    ],
    height: 42,
    paddingLeft: 16,
    paddingRight: 16,
  },
  name: {
    fontSize: '0.8em',
    fontWeight: 600,
    whiteSpace: 'nowrap',
  },
  [`@media (max-width: ${680}px)`]: {
    button: {
      '& img': { marginLeft: 0 },
      '& svg': { marginLeft: 0 },
      background: '#FFFFFF !important',
      color: '#FF5950  !important',
      display: 'block',
      height: 32,
      padding: '0 !important',
      textAlign: 'center',
      width: 32,
    },
    name: {
      display: 'none',
      visibility: 'hidden',
    },
  },
});

const LoginButtonComponent = function LoginButtonComponent() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const loginHandler = useCallback(() => {
    dispatch(openLoginModal());
  }, [dispatch]);

  return (
    <button className={classes.button} type="button" onClick={loginHandler}>
      <span className={classes.name}>Ajouter un parcours</span>
      <PlusIcon className={classes.icon} />
    </button>
  );
};

export default LoginButtonComponent;
