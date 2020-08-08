import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';

import { ZINDEX } from '../../constants';
import Close from './close-button';
import Distance from './distance';
import Picker from './picker';
import Title from './title';

const useStyles = createUseStyles({
  popup: {
    bottom: 32,
    composes: ['is-absolute'],
    left: 92,
    right: 92,
    zIndex: ZINDEX.POPUP,
  },
  popupCard: {
    background: 'rgba(255, 89, 80, 1)',
    borderRadius: 8,
    boxShadow: '0 0 30px 0 rgba(0, 0, 0, 0.25)',
    color: 'rgba(255, 255, 255, 1)',
    composes: ['p12', 'pt16'],
  },
  popupHeader: {
    composes: ['mb7'],
  },
  popupInfos: {
    composes: ['flex-columns', 'flex-between', 'items-center'],
  },
  popupWrapper: {
    background: 'transparent',
    borderRadius: 12,
    composes: ['is-relative', 'flex-rows', 'flex-end', 'items-end'],
    margin: '0 auto',
    maxWidth: 500,
    width: '100%',
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
      <div className={classes.popupWrapper}>
        <div className={classes.popupCard}>
          <Close />
          <div className={classes.popupInfos}>
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
