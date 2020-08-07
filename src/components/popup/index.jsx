import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';

import { ZINDEX } from '../../constants';
import Close from './close';
import Infos from './infos';
import Title from './title';
import Toolbar from './toolbar';

const useStyles = createUseStyles({
  card: {
    background: 'rgba(255, 89, 80, 1)',
    borderRadius: 8,
    boxShadow: '0 0 30px 0 rgba(0, 0, 0, 0.25)',
    color: 'rgba(255, 255, 255, 1)',
    composes: ['px12', 'py12'],
    width: 265,
  },
  header: {
    composes: ['mb7'],
  },
  infos: {
    composes: ['flex-columns', 'flex-between', 'items-center'],
  },
  popup: {
    zIndex: ZINDEX.POPUP,
  },
  toolbar: {
    background: 'rgba(0, 0, 0, 0.65)',
    borderRadius: 8,
    composes: ['pr12', 'py7'],
    marginTop: 1,
  },
  wrapper: {
    background: 'transparent',
    borderRadius: 12,
    composes: ['is-relative', 'flex-rows', 'flex-end', 'items-end', 'mb12'],
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
        <div className={classes.card}>
          <Close />
          <div className={classes.header}>
            <Title />
          </div>
          <div className={classes.infos}>
            <Infos />
          </div>
        </div>
        <div className={classes.toolbar}>
          <Toolbar />
        </div>
      </div>
    </div>
  );
});

export default ParcoursPopupComponent;
