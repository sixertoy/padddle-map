import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';

import { ZINDEX } from '../../constants';
import Arrow from './arrow';
import Distance from './distance';
import Picker from './picker';
import Title from './title';

const useStyles = createUseStyles({
  card: {
    background: '#FFFFFF',
    borderRadius: 8,
    boxShadow: '0 0 30px 0 rgba(0, 0, 0, 0.25)',
    composes: ['flex-columns', 'items-center'],
    height: 46,
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
  [`@media (max-width: ${680}px)`]: {
    card: {
      borderRadius: 0,
      width: '100%',
    },
    popup: {
      bottom: 0,
      left: 0,
      right: 0,
    },
  },
});

const ParcoursPopupComponent = React.memo(function ParcoursPopupComponent() {
  const classes = useStyles();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted) setMounted(true);
  }, [mounted]);

  return (
    <div className={classes.popup}>
      <div className={classes.wrapper}>
        <Arrow />
        <div className={classes.card}>
          <Picker />
          <Title />
          <Distance />
        </div>
      </div>
    </div>
  );
});

export default ParcoursPopupComponent;
