import React from 'react';
import { createUseStyles } from 'react-jss';

import Logo from '../../assets/logo';

const useStyles = createUseStyles({
  container: {
    background: '#FFFFFF',
    color: '#FF5850',
    composes: ['p12', 'flex-0', 'flex-columns', 'flex-between', 'items-center'],

    height: 60,
  },
  left: {
    composes: ['flex-columns', 'items-center', 'flex-start'],
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
      <div className={classes.left}>
        <Logo className={classes.logo} />
        <h1 className={classes.title}>
          <span>Padddle</span>
        </h1>
      </div>
    </div>
  );
};

HeaderComponent.defaultProps = {};

HeaderComponent.propTypes = {};

export default HeaderComponent;
