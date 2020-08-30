import React, { useCallback } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { version } from '../../../package.json';
import { ZINDEX } from '../../constants';
import { disableDebugMode } from '../../redux/actions';

const useStyles = createUseStyles({
  headerDebugger: {
    '& > p': { marginBottom: 12 },
    background: '#000000',
    borderRadius: 4,
    color: '#FFFFFF',
    composes: ['is-absolute', 'pt12', 'px12', 'is-bold', 'fs11', 'text-left'],
    left: 12,
    top: 72,
    zIndex: ZINDEX.DEBUGGER,
  },
});

const HeaderDebugerComponent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const parcours = useSelector(_ => _.parcours);
  const waiting = parcours.filter(obj => !obj.validated);

  const closeDebugHandler = useCallback(() => {
    dispatch(disableDebugMode());
  }, [dispatch]);

  return (
    <div
      className={classes.headerDebugger}
      role="button"
      tabIndex="-1"
      onClick={closeDebugHandler}>
      <p>Version : {version}</p>
      <p>Parcours : {parcours.length}</p>
      <p>Waiting : {waiting.length}</p>
    </div>
  );
};

export default HeaderDebugerComponent;
