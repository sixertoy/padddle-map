import classnames from 'classnames';
import React from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import { ZINDEX } from '../../constants';
import { IfFirebaseAuthed } from '../../core/firebase';
import { isOwner } from '../../helpers';
import { selectParcours } from '../../redux/selectors';
import AuthedButtons from '../commons/authed-buttons';
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
    zIndex: ZINDEX.SIDEBAR,
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
  const isMobile = useMediaQuery({ query: '(max-width: 680px)' });

  const parcours = useSelector(selectParcours);
  const createmode = useSelector(_ => _.createmode);

  return (
    <div className={classnames(classes.contextMenu, { opened: !!parcours })}>
      <IfFirebaseAuthed and={({ user }) => isOwner(parcours, user)}>
        {() => (
          <div className={classes.controls}>
            {createmode && <CancelButton />}
            {!createmode && <DeleteButton />}
          </div>
        )}
      </IfFirebaseAuthed>
      {isMobile && (
        <div className={classes.options}>
          <AuthedButtons />
        </div>
      )}
    </div>
  );
});

export default ContextMenuComponent;
