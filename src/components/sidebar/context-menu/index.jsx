import classnames from 'classnames';
import React from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { ZINDEX } from '../../../constants';
import { selectParcours } from '../../../redux/selectors';
import CancelButton from './cancel-button';
import DeleteButton from './delete-button';

const useStyles = createUseStyles({
  contextMenu: {
    bottom: 40,
    composes: [
      'is-absolute',
      'flex-columns',
      'flex-end',
      'items-center',
      'flex-1',
    ],
    right: 90,
    zIndex: ZINDEX.SIDEBAR_CONTEXT,
  },
  controls: {
    width: 40,
  },
  options: {
    marginLeft: 7,
  },
  [`@media (max-width: ${680}px)`]: {
    contextMenu: {
      '&.opened': { bottom: 54 },
      bottom: 12,
      right: 12,
    },
    controls: {
      width: 35,
    },
  },
});

const ContextMenuComponent = React.memo(function ContextMenuComponent() {
  const classes = useStyles();

  const parcours = useSelector(selectParcours);
  const createmode = useSelector(_ => _.createmode);

  return (
    <div className={classnames(classes.contextMenu, { opened: !!parcours })}>
      <div className={classes.controls}>
        {createmode && <CancelButton />}
        {!createmode && parcours && <DeleteButton />}
      </div>
    </div>
  );
});

export default ContextMenuComponent;
