import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';

import { ZINDEX } from '../../constants';
import Distance from './distance';
import Picker from './picker';
import Title from './title';

const useStyles = createUseStyles({
  arrow: {
    borderColor: 'transparent transparent #FFFFFF transparent',
    borderStyle: 'solid',
    borderWidth: '0 12px 12px 12px',
    composes: ['is-absolute'],
    height: 0,
    left: 'calc(50% - 6px)',
    marginLeft: 0,
    top: -12,
    width: 0,
  },
  card: {
    composes: ['flex-columns', 'flex-center', 'items-center'],
  },
  content: {
    background: '#FFFFFF',
    borderRadius: 8,
    boxShadow: '0 0 30px 0 rgba(0, 0, 0, 0.25)',
    composes: ['px12', 'py7', 'flex-columns', 'flex-between', 'items-center'],
    maxWidth: 480,
    minWidth: 480,
    width: 480,
  },
  popup: {
    bottom: 32,
    composes: ['is-absolute'],
    left: 'calc(50% - 240px)',
    zIndex: ZINDEX.POPUP,
  },
  wrapper: {
    composes: ['is-relative'],
  },
});

const ParcoursPopupComponent = React.memo(() => {
  const classes = useStyles();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted) setMounted(true);
  }, [mounted]);

  return (
    <div className={classes.popup}>
      <div className={classes.wrapper}>
        <div className={classes.arrow} />
        <div className={classes.card}>
          <div className={classes.content}>
            <Picker />
            <Title />
            <Distance />
          </div>
        </div>
      </div>
    </div>
  );
});

export default ParcoursPopupComponent;
