import React from 'react';
import { createUseStyles } from 'react-jss';

import { ZINDEX } from '../../constants';
import Close from './close';
import Color from './color';
import Distance from './distance';
import Title from './title';
import Toolbar from './toolbar';

const useStyles = createUseStyles({
  close: {
    composes: ['is-absolute'],
    right: 0,
    top: 0,
  },
  infopopup: {
    composes: ['is-absolute'],
    left: 12,
    top: 72,
    zIndex: ZINDEX.POPUP,
  },
  wrapper: {
    background: '#FFFFFF',
    borderRadius: 10,
    composes: ['is-relative'],
    height: 200,
    width: 200,
  },
});

const ParcoursPopupComponent = React.memo(() => {
  const classes = useStyles();
  return (
    <div className={classes.infopopup}>
      <div className={classes.wrapper}>
        <Close />
        <div className={classes.header}>
          <Color />
          <Title />
          <Distance />
        </div>
        <div>
          <Toolbar />
        </div>
      </div>
    </div>
  );
});

export default ParcoursPopupComponent;
