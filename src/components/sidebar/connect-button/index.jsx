import classnames from 'classnames';
// import { isFacebookApp } from '../../core/facebook';
import React from 'react';
import { IoIosAdd as PlusIcon } from 'react-icons/io';
import { createUseStyles } from 'react-jss';

import { ZINDEX } from '../../../constants';

const useStyles = createUseStyles({
  connectButton: {
    bottom: 0,
    composes: ['is-absolute'],
    left: '50%',
    marginRight: 12,
    right: 'inherit',
    transition: 'bottom 0.3s, left 0.3s',
    zIndex: ZINDEX.SIDEBAR_BIG_BUTTON,
  },
});

const ConnectButtonComponent = function ConnectButtonComponent() {
  const classes = useStyles();

  const loginHandler = () => {};

  return (
    <div className={classnames(classes.connectButton)}>
      <button className={classes.button} type="button" onClick={loginHandler}>
        <span className={classes.label}>Ajouter un parcours</span>
        <PlusIcon />
      </button>
    </div>
  );
};

export default ConnectButtonComponent;
