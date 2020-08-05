import classnames from 'classnames';
import React from 'react';
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
  corner: {
    backgroundImage:
      'radial-gradient(circle at 0 10px, rgba(0, 0, 0, 0) 12px, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0.65) 3px)',
    height: 12,
    width: 12,
  },
  header: {
    background: 'rgba(255, 89, 80, 1)',
    borderRadius: '8px 8px 0 0',
    boxShadow: '0 0 30px 0 rgba(0, 0, 0, 0.25)',
    color: 'rgba(255, 255, 255, 1)',
    composes: ['px12', 'pb3', 'pt12'],
  },
  infos: {
    background: 'rgba(255, 89, 80, 1)',
    borderRadius: '0 0 8px 8px',
    color: 'rgba(255, 255, 255, 1)',
    composes: [
      'px12',
      'pb12',
      'pt3',
      'flex-columns',
      'flex-between',
      'items-center',
    ],
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
  return (
    <div
      className={classnames(classes.popup, { anonymous: !user || !user.uid })}>
      <div className={classes.wrapper}>
        <Close />
        <div className={classes.header}>
          <Title />
        </div>
        <div className={classes.infos}>
          <Infos />
        </div>
        <div className={classes.bottom}>
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
