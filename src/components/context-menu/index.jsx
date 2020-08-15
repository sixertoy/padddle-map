import React from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { ZINDEX } from '../../constants';
import { IfFirebaseAuthed } from '../../core/firebase';
import { isOwner } from '../../helpers';
import { selectParcours } from '../../redux/selectors';
import CancelButton from './cancel-button';
import DeleteButton from './delete-button';

const useStyles = createUseStyles({
  contextMenu: {
    bottom: 40,
    composes: ['is-absolute'],
    right: 82,
    zIndex: ZINDEX.SIDEBAR,
  },
  [`@media (max-width: ${680}px)`]: {
    contextMenu: {
      bottom: 62,
      left: 12,
      right: 'inherit',
    },
  },
});

const ContextMenuComponent = () => {
  const classes = useStyles();

  const selected = useSelector(selectParcours);
  const createmode = useSelector(_ => _.createmode);

  return (
    <div className={classes.contextMenu}>
      <IfFirebaseAuthed and={({ user }) => isOwner(selected, user)}>
        {() => (
          <React.Fragment>
            {createmode && <CancelButton />}
            {!createmode && <DeleteButton />}
          </React.Fragment>
        )}
      </IfFirebaseAuthed>
    </div>
  );
};

export default ContextMenuComponent;
