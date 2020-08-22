import classnames from 'classnames';
import React, { useCallback, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { version } from '../../../package.json';
import { ReactComponent as SVG } from '../../assets/logo.svg';
// import { isFacebookApp } from '../../core/facebook';
import { IfFirebaseAuthed, IfFirebaseUnAuthed } from '../../core/firebase';
import { disableDebugMode, enableDebugMode } from '../../redux/actions';
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
    cursor: 'default',
    fontSize: 38,
  },
  title: {
    composes: ['is-pacifico', 'ml12'],
    fontSize: 30,
  },
  [`@media (max-width: ${680}px)`]: {
    container: {
      background:
        'linear-gradient(45deg, rgba(255,106,80,1) 0%, rgba(255,89,80,1) 59%, rgba(255,89,80,1) 100%)',
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
  const dispatch = useDispatch();
  const debugmode = useSelector(_ => _.debugmode);
  const [count, setCount] = useState(0);

  const logoHandler = useCallback(() => {
    setCount(prev => prev + 1);
    if (count === 10) {
      dispatch(enableDebugMode());
    }
  }, [count, dispatch]);

  const closeDebugHandler = useCallback(() => {
    setCount(0);
    dispatch(disableDebugMode());
  }, [dispatch]);

  const showLogin = true;
  // const showLogin = debugmode || !isFacebookApp();

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
      {showLogin && (
        <div className={classnames(classes.buttons, 'flex-end')}>
          <IfFirebaseUnAuthed>
            <LoginButton />
          </IfFirebaseUnAuthed>
          <IfFirebaseAuthed>
            {({ user }) => <LoggedButton user={user} />}
          </IfFirebaseAuthed>
        </div>
      )}
      {debugmode && (
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
