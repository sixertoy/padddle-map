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
  header: {
    background: 'rgba(255, 89, 80, 1)',
    borderRadius: '12px 12px 0 0',
    color: 'rgba(255, 255, 255, 1)',
    composes: ['px24', 'pb3', 'pt16'],
  },
  infos: {
    background: 'rgba(255, 89, 80, 1)',
    color: 'rgba(255, 255, 255, 1)',
    composes: [
      'px24',
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
    borderRadius: '0 0 12px 12px',
    composes: ['px24', 'py7'],
  },
  wrapper: {
    background: 'transparent',
    borderRadius: 12,
    boxShadow: '0 0 30px 0 rgba(0, 0, 0, 0.25)',
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
        <div className={classes.toolbar}>
          <Toolbar />
        </div>
      </div>
    </div>
  );
});

export default ParcoursPopupComponent;
