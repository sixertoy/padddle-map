import React, { useCallback, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { ReactComponent as SVG } from '../../assets/logo.svg';
import { enableDebugMode } from '../../redux/actions';

const useStyles = createUseStyles({
  headerLogo: {
    composes: ['flex-columns', 'flex-start', 'items-center'],
    flex: 0,
  },
  headerLogoImg: {
    cursor: 'default',
    fontSize: 38,
  },
  headerLogoText: {
    composes: ['is-pacifico', 'ml12'],
    fontSize: 30,
  },
  [`@media (max-width: ${680}px)`]: {
    headerLogoImg: {
      fontSize: 36,
    },
    headerLogoText: {
      fontSize: 28,
      marginLeft: 8,
    },
  },
});

const HeaderLogoComponent = () => {
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

  useEffect(() => {
    if (!debugmode && count > 10) {
      setCount(0);
    }
  }, [debugmode, count]);

  return (
    <div className={classes.headerLogo}>
      <div
        className={classes.headerLogoImg}
        role="button"
        tabIndex="-1"
        onClick={logoHandler}>
        <SVG style={{ height: '1em', verticalAlign: 'bottom', width: '1em' }} />
      </div>
      <h1 className={classes.headerLogoText}>
        <span>Padddle</span>
      </h1>
    </div>
  );
};

export default HeaderLogoComponent;
