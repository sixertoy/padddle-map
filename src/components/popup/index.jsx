import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { ZINDEX } from '../../constants';
import Close from './close';
import Infos from './infos';
import Title from './title';
import Toolbar from './toolbar';

const useStyles = createUseStyles({
  bottom: {
    composes: ['flex-columns', 'flex-end', 'items-start'],
  },
  card: {
    background: 'rgba(255, 89, 80, 1)',
    borderRadius: 8,
    boxShadow: '0 0 30px 0 rgba(0, 0, 0, 0.25)',
    color: 'rgba(255, 255, 255, 1)',
    composes: ['px12', 'py12'],
  },
  header: {
    composes: ['mb7'],
  },
  infos: {
    composes: ['flex-columns', 'flex-between', 'items-center'],
  },
  popup: {
    '&.anonymous': { bottom: 132 },
    bottom: 192,
    composes: ['is-absolute'],
    right: 12,
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
    composes: ['is-relative', 'flex-rows', 'flex-between'],
    width: 265,
  },
});

const ParcoursPopupComponent = React.memo(() => {
  const classes = useStyles();
  const user = useSelector(_ => _.user);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted) setMounted(true);
  }, [mounted]);

  return (
    <div
      className={classnames(classes.popup, { anonymous: !user || !user.uid })}>
      <div className={classnames(classes.wrapper, { mounted })}>
        <div className={classnames(classes.card, { mounted })}>
          <Close />
          <div className={classes.header}>
            <Title />
          </div>
          <div className={classes.infos}>
            <Infos />
          </div>
        </div>
        <div className={classnames(classes.bottom, { mounted })}>
          {/* <span className={classes.corner} /> */}
          <div className={classes.toolbar}>
            <Toolbar />
          </div>
        </div>
      </div>
    </div>
  );
});

export default ParcoursPopupComponent;
