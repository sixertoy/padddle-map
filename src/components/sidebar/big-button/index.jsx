import classnames from 'classnames';
import React from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import { ZINDEX } from '../../../constants';
import { isOwner } from '../../../helpers';
import { selectParcours } from '../../../redux/selectors';
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
    transition: 'bottom 0.3s, left 0.3s',
    zIndex: ZINDEX.SIDEBAR_BIG_BUTTON,
  },
  [`@media (max-width: ${680}px)`]: {
    bigButton: {
      '&.opened': {
        bottom: BOTTOM_POSITION_ON_DESKTOP + 30,
        left: 'calc(50% + 16px)',
      },
      bottom: 0,
      left: '50%',
      right: 'inherit',
    },
  },
});

const BigButtonComponent = function BigButtonComponent() {
  const classes = useStyles();
  const isMobile = useMediaQuery({ query: '(max-width: 680px)' });

  const user = useSelector(_ => _.user);
  const parcours = useSelector(selectParcours);
  const editmode = useSelector(_ => _.editmode);
  const selected = useSelector(_ => _.selected);
  const createmode = useSelector(_ => _.createmode);

  const isowner = isOwner(parcours, user);

  const showEditButton = !createmode && !editmode && selected && !isMobile;
  const showCreateButton = !createmode && !editmode && !selected;
  const showCloseButton = editmode;
  const showCommitButton = createmode;

  return (
    <div className={classnames(classes.bigButton, { opened: !!selected })}>
      {showEditButton && <EditButton disabled={!isowner} />}
      {showCloseButton && <CloseButton />}
      {showCommitButton && <CommitButton />}
      {showCreateButton && <CreateButton />}
    </div>
  );
};

export default BigButtonComponent;
