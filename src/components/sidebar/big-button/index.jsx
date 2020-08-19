import get from 'lodash.get';
import React from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { ZINDEX } from '../../../constants';
import { selectParcours } from '../../../redux/selectors';
import CancelButton from './cancel-button';
import CommitButton from './commit-button';
import CreateButton from './create-button';
import EditButton from './edit-button';

const BOTTOM_POSITION_ON_DESKTOP = 16;

const useStyles = createUseStyles({
  bigButton: {
    bottom: BOTTOM_POSITION_ON_DESKTOP,
    composes: ['is-absolute'],
    marginRight: 12,
    right: 0,
    zIndex: ZINDEX.SIDEBAR_BIG_BUTTON,
  },
});

const BigButtonComponent = function BigButtonComponent() {
  const classes = useStyles();

  const parcours = useSelector(selectParcours);
  const editmode = useSelector(_ => _.editmode);
  const selected = useSelector(_ => _.selected);
  const createmode = useSelector(_ => _.createmode);

  const owner = get(parcours, 'owner', false);

  const showCancelButton = !createmode && editmode;
  const showCommitButton = createmode && !editmode;
  const showCreateButton = !createmode && !editmode && !selected;
  const showEditButton = !createmode && !editmode && selected && owner;

  return (
    <div className={classes.bigButton}>
      {showEditButton && <EditButton />}
      {showCommitButton && <CommitButton />}
      {showCreateButton && <CreateButton />}
      {showCancelButton && <CancelButton />}
    </div>
  );
};

export default BigButtonComponent;
