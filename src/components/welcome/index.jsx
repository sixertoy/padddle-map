import React from 'react';
import { createUseStyles } from 'react-jss';

import { ZINDEX } from '../../constants';
import Tour from './tour';

const useStyles = createUseStyles({
  welcome: {
    composes: ['is-overlay'],
    zIndex: ZINDEX.WELCOME,
  },
  welcomeOverlay: {
    background: 'rgba(0, 0, 0, 0.25)',
    height: '100%',
    width: '100%',
  },
});

const WelcomeComponent = () => {
  const classes = useStyles();
  return (
    <div className={classes.welcome}>
      <div className={classes.welcomeOverlay} />
      <Tour run={false} />
    </div>
  );
};

export default WelcomeComponent;
