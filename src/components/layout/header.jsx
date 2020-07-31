import classnames from 'classnames';
import React from 'react';
import { createUseStyles } from 'react-jss';

import Logo from '../../assets/logo';
import LoginButton from './login-button';

const useStyles = createUseStyles({
  buttons: {
    composes: ['flex-columns', 'items-center'],
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
  menu: {
    '& button': {
      marginLeft: 12,
    },
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
      <div className={classnames(classes.buttons, classes.menu, 'flex-end')}>
        <LoginButton />
      </div>
    </div>
  );
};

export default HeaderComponent;
