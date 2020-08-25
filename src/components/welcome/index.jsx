import React, { useCallback, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import { ZINDEX } from '../../constants';
import { closeDemoMode } from '../../redux/actions';
import Card from './card';
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
  const dispatch = useDispatch();
  const [run, setRun] = useState(false);

  const closeHandler = useCallback(() => {
    dispatch(closeDemoMode({ unauthed: true }));
  }, [dispatch]);

  const startHandler = useCallback(() => {
    setRun(true);
  }, []);

  return (
    <div className={classes.welcome}>
      <div className={classes.welcomeOverlay} />
      <Card onClose={closeHandler} onStart={startHandler} />
      <Tour run={run} />
    </div>
  );
};

export default WelcomeComponent;
