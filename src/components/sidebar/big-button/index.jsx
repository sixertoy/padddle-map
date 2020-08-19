import classnames from 'classnames';
import React from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { ZINDEX } from '../../../constants';
import CloseButton from './close-button';
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
    transition: 'bottom 0.3s',
    zIndex: ZINDEX.SIDEBAR_BIG_BUTTON,
  },
  [`@media (max-width: ${680}px)`]: {
    bigButton: {
      '&.opened': {
        bottom: BOTTOM_POSITION_ON_DESKTOP + 30,
      },
    },
  },
});

const BigButtonComponent = function BigButtonComponent() {
  const classes = useStyles();

  const editmode = useSelector(_ => _.editmode);
  const selected = useSelector(_ => _.selected);
  const createmode = useSelector(_ => _.createmode);

  const showEditButton = !createmode && !editmode && selected;
  const showCreateButton = !createmode && !editmode && !selected;
  const showCloseButton = editmode;
  const showCommitButton = createmode;

  return (
    <div className={classnames(classes.bigButton, { opened: !!selected })}>
      {showEditButton && <EditButton />}
      {showCloseButton && <CloseButton />}
      {showCommitButton && <CommitButton />}
      {showCreateButton && <CreateButton />}
    </div>
  );
};

export default BigButtonComponent;
