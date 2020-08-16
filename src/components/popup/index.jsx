import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useMediaQuery } from 'react-responsive';

import { ZINDEX } from '../../constants';
import CloseButton from './close-button';
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
    maxWidth: 480,
    width: 480,
  },
  content: {
    background: '#FFFFFF',
    borderRadius: 8,
    boxShadow: '0 0 30px 0 rgba(0, 0, 0, 0.25)',
    composes: ['px12', 'py7', 'flex-columns', 'flex-between', 'items-center'],
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
      width: '100%',
    },
    content: {
      padding: '0 0 0 8px !important',
    },
    popup: {
      bottom: '12px !important',
      left: 12,
      right: 12,
    },
  },
});

const ParcoursPopupComponent = React.memo(function ParcoursPopupComponent() {
  const classes = useStyles();

  const isMobile = useMediaQuery({ query: '(max-width: 680px)' });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted) setMounted(true);
  }, [mounted]);

  return (
    <div className={classes.popup}>
      <div className={classes.wrapper}>
        {!isMobile && <CloseButton />}
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
