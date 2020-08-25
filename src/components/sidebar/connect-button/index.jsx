import React, { useCallback } from 'react';
import { MdAdd as PlusIcon } from 'react-icons/md';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import { ZINDEX } from '../../../constants';
import { openLoginModal } from '../../../redux/actions';

const useStyles = createUseStyles({
  button: {
    '&:hover': {
      background:
        'linear-gradient(45deg, rgba(255,89,80,1) 0%, rgba(255,89,80,1) 59%, rgba(255,106,80,1) 100%)',
      color: '#FFFFFF',
    },
    background: '#FFFFFF',
    borderRadius: 25,
    color: '#FF594F',
    fontSize: 14,
    fontWeight: 'bold',
    height: 50,
    textAlign: 'center',
    transition: 'all 0.3s',
    width: 220,
  },
  connectButton: {
    bottom: 12,
    color: '#FFFFFF',
    composes: ['is-absolute', 'text-center'],
    left: '50%',
    marginLeft: -(220 / 2),
    right: 'inherit',
    zIndex: ZINDEX.SIDEBAR_BIG_BUTTON,
  },
  icon: {
    fontSize: 18,
    marginLeft: 5,
    verticalAlign: 'middle',
  },
});

const ConnectButtonComponent = function ConnectButtonComponent() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const loginHandler = useCallback(() => {
    dispatch(openLoginModal());
  }, [dispatch]);

  return (
    <div className={classes.connectButton} id="ride-step-login">
      <button className={classes.button} type="button" onClick={loginHandler}>
        <span className={classes.label}>Ajouter un parcours</span>
        <PlusIcon className={classes.icon} />
      </button>
    </div>
  );
};

export default ConnectButtonComponent;
