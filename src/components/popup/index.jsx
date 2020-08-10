import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { ZINDEX } from '../../constants';
// import { IfFirebaseAuthed } from '../../core/firebase';
// import { isOwner } from '../../helpers';
// import { selectParcours } from '../../redux/selectors';
import CommitButton from './commit-button';
// import DeleteButton from './delete-button';
import Distance from './distance';
import Picker from './picker';
import Title from './title';

const useStyles = createUseStyles({
  arrow: {
    borderColor: 'transparent transparent #FFFFFF transparent',
    borderStyle: 'solid',
    borderWidth: '0 12px 12px 12px',
    composes: ['is-absolute'],
    height: 0,
    left: '50%',
    marginLeft: -42,
    top: -12,
    width: 0,
  },
  card: {
    composes: ['flex-columns', 'flex-center', 'items-center'],
  },
  content: {
    background: '#FFFFFF',
    borderRadius: 8,
    boxShadow: '0 0 30px 0 rgba(0, 0, 0, 0.25)',
    composes: ['px12', 'py7', 'flex-columns', 'flex-between', 'items-center'],
  },
  popup: {
    bottom: 32,
    composes: ['is-absolute'],
    left: 92,
    right: 92,
    zIndex: ZINDEX.POPUP,
  },
  wrapper: {
    composes: ['is-relative'],
    margin: '0 auto',
    maxWidth: 500,
    width: '100%',
  },
  [`@media (max-width: ${680}px)`]: {
    arrow: {
      left: 20,
      marginLeft: 0,
    },
    popup: {
      left: 12,
      right: 92,
    },
  },
});

const ParcoursPopupComponent = React.memo(() => {
  const classes = useStyles();

  const draft = useSelector(_ => _.draft);
  // const selected = useSelector(selectParcours);
  // const createmode = useSelector(_ => _.createmode);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted) setMounted(true);
  }, [mounted]);

  return (
    <div className={classes.popup}>
      <div className={classes.wrapper}>
        <div className={classes.arrow} />
        <div className={classes.card}>
          <div className={classes.content}>
            <Picker />
            <Title />
            <Distance />
          </div>
          {/* <IfFirebaseAuthed
            and={({ user }) => !createmode && isOwner(selected, user)}>
            <DeleteButton />
          </IfFirebaseAuthed> */}
          {draft && <CommitButton />}
        </div>
      </div>
    </div>
  );
});

export default ParcoursPopupComponent;
