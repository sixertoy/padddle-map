import classnames from 'classnames';
import React from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { ZINDEX } from '../../../constants';
import { isOwner } from '../../../helpers';
import { selectParcours } from '../../../redux/selectors';
import CancelButton from './cancel-button';
import DeleteButton from './delete-button';

const MARGIN = 12;
const BUTTONS_SIZE = 40;
const BIGBUTTON_SIZE = 60;
const BOTTOM_POSITION = 16;
const SPACE_BETWEEN_BUTTONS = 7;
const BOTTOM_POSITION_LOGGED =
  BOTTOM_POSITION +
  SPACE_BETWEEN_BUTTONS +
  BIGBUTTON_SIZE / 2 -
  BUTTONS_SIZE / 2;

const useStyles = createUseStyles({
  contextMenu: {
    bottom: BOTTOM_POSITION_LOGGED,
    composes: [
      'is-absolute',
      'flex-columns',
      'flex-end',
      'items-center',
      'flex-1',
    ],
    right: MARGIN + BIGBUTTON_SIZE + SPACE_BETWEEN_BUTTONS,
    transition: 'bottom 0.3s, left 0.3s',
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
      '&.opened': {
        bottom: BOTTOM_POSITION_LOGGED + 22,
        left: 'calc(50% - 40px)',
      },
      bottom: 0,
      left: '50%',
      right: 'inherit',
      // right: MARGIN + BIGBUTTON_SIZE + SPACE_BETWEEN_BUTTONS - 20,
    },
    controls: {
      width: 35,
    },
  },
});

const ContextMenuComponent = React.memo(function ContextMenuComponent() {
  const classes = useStyles();

  const user = useSelector(_ => _.user);
  const parcours = useSelector(selectParcours);
  const selected = useSelector(_ => _.selected);
  const createmode = useSelector(_ => _.createmode);

  const isowner = isOwner(parcours, user);

  const showCancelButton = createmode;
  const showDeleteButton = !createmode && selected && isowner;

  return (
    <div className={classnames(classes.contextMenu, { opened: !!selected })}>
      <div className={classes.controls}>
        {showCancelButton && <CancelButton />}
        {showDeleteButton && <DeleteButton />}
      </div>
    </div>
  );
});

export default ContextMenuComponent;
