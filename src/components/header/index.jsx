import classnames from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';

import { version } from '../../../package.json';
import { ReactComponent as SVG } from '../../assets/logo.svg';
import { IfFirebaseAuthed, IfFirebaseUnAuthed } from '../../core/firebase';
import LoggedButton from './logged-button';
import LoginButton from './login-button';

const useStyles = createUseStyles({
  buttons: {
    composes: ['flex-columns', 'items-center'],
    flex: 0,
  },
  container: {
    background: '#FFFFFF',
    color: '#FF5850',
    composes: [
      'is-relative',
      'p12',
      'flex-0',
      'flex-columns',
      'flex-between',
      'items-center',
    ],

    height: 60,
  },
  debug: {
    background: '#000000',
    color: '#FFFFFF',
    composes: ['is-absolute', 'p7', 'is-bold', 'fs9'],
    left: 12,
    top: 12,
  },
  logo: {
    fontSize: 38,
  },
  title: {
    composes: ['is-pacifico', 'ml12'],
    fontSize: 30,
  },
  [`@media (max-width: ${680}px)`]: {
    container: {
      // background: '#FF5850',
      background:
        'linear-gradient(45deg, rgba(255,89,80,1) 0%, rgba(255,89,80,1) 59%, rgba(255,106,80,1) 100%)',
      color: '#FFFFFF',
    },
    logo: {
      fontSize: 36,
    },
    title: {
      fontSize: 28,
      marginLeft: 8,
    },
  },
});

const HeaderComponent = React.memo(function HeaderComponent() {
  const classes = useStyles();
  const [count, setCount] = useState(0);
  const [debug, setDebug] = useState(false);

  const logoHandler = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  const closeDebugHandler = useCallback(() => {
    setDebug(false);
    setCount(0);
  }, []);

  useEffect(() => {
    if (count >= 10) setDebug(true);
  }, [count]);

  return (
    <div className={classes.container}>
      <div className={classnames(classes.buttons, 'flex-start')}>
        <div
          className={classes.logo}
          role="button"
          tabIndex="-1"
          onClick={logoHandler}>
          <SVG
            style={{ height: '1em', verticalAlign: 'bottom', width: '1em' }}
          />
        </div>
        <h1 className={classes.title}>
          <span>Padddle</span>
        </h1>
      </div>
      <div className={classnames(classes.buttons, 'flex-end')}>
        <IfFirebaseUnAuthed>
          <LoginButton />
        </IfFirebaseUnAuthed>
        <IfFirebaseAuthed>
          {({ user }) => <LoggedButton user={user} />}
        </IfFirebaseAuthed>
      </div>
      {debug && (
        <div
          className={classes.debug}
          role="button"
          tabIndex="-1"
          onClick={closeDebugHandler}>
          <p>Version : {version}</p>
        </div>
      )}
    </div>
  );
});

export default HeaderComponent;
