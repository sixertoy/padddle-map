import React from 'react';
import { createUseStyles } from 'react-jss';

import { ZINDEX } from '../constants';
import Loader from './commons/loader';

const useStyles = createUseStyles({
  container: {
    bottom: 0,
    composes: ['is-absolute'],
    left: 0,
    right: 0,
    top: 0,
    zIndex: ZINDEX.LOADER,
  },
  wrapper: {
    composes: ['is-relative', 'is-full-layout'],
  },
});

const LoaderComponent = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <Loader />
      </div>
    </div>
  );
};

export default LoaderComponent;
