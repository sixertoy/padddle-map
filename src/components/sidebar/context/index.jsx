import React from 'react';
import { createUseStyles } from 'react-jss';

// import { useSelector } from 'react-redux';
import { IfFirebaseAuthed } from '../../../core/firebase';
import DeleteButton from './delete-button';
import EditButton from './edit-button';

const useStyles = createUseStyles({
  controls: {
    composes: ['flex-rows', 'items-center'],
  },
});

const ControlsComponent = () => {
  const classes = useStyles();

  // const selected = useSelector(selectParcours);
  // const createmode = useSelector(_ => _.createmode);

  return (
    <IfFirebaseAuthed>
      <div className={classes.context}>
        <EditButton />
        <DeleteButton />
      </div>
    </IfFirebaseAuthed>
  );
};

export default ControlsComponent;
