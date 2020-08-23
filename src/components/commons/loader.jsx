import classnames from 'classnames';
import React from 'react';
import { createUseStyles } from 'react-jss';

import { ReactComponent as Logo } from '../../assets/logo.svg';
import { ZINDEX } from '../../constants';

const useStyles = createUseStyles({
  container: {
    background: 'rgba(144, 204, 202, 0.85)',
    color: '#FFFFFF',
    zIndex: ZINDEX.LOADER_SPINNER,
  },
  label: {
    background: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
    fontSize: 8,
    fontWeight: 'bold',
    left: '50%',
    letterSpacing: '0.05em',
    marginLeft: -41,
    padding: '8px 0',
    position: 'absolute',
    textAlign: 'center',
    textTransform: 'uppercase',
    top: 'calc(50% + 43px)',
    width: 82,
  },
  logo: {
    left: '50%',
    marginLeft: -25,
    marginTop: -25,
    position: 'absolute',
    top: '50%',
    width: 50,
  },
});

const LoaderComponent = function LoaderComponent() {
  const classes = useStyles();
  return (
    <div className={classes.container} id="application-loader">
      <div className="wrapper">
        <Logo className={classnames(classes.logo, 'flip-vertical-left')} />
        <div className={classes.label}>
          <span>Chargement...</span>
        </div>
      </div>
    </div>
  );
};

export default LoaderComponent;
