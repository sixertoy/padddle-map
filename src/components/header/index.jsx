import classnames from 'classnames';
import React from 'react';
import { createUseStyles } from 'react-jss';

import { IfFirebaseAuthed, IfFirebaseUnAuthed } from '../../core/firebase';
import LoggedButton from './logged-button';
import LoginButton from './login-button';
import Logo from './logo';

const useStyles = createUseStyles({
  buttons: {
    composes: ['flex-columns', 'items-center'],
    flex: 0,
  },
  container: {
    background: '#FFFFFF',
    color: '#FF5850',
    composes: ['p12', 'flex-0', 'flex-columns', 'flex-between', 'items-center'],

    height: 60,
  },
  logo: {
    fontSize: 38,
  },
  title: {
    composes: ['is-pacifico', 'ml12'],
    fontSize: 30,
  },
});

const HeaderComponent = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classnames(classes.buttons, 'flex-start')}>
        <Logo className={classes.logo} />
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
    </div>
  );
};

export default HeaderComponent;
