import React, { useCallback } from 'react';
import { IoIosClose as CloseIcon } from 'react-icons/io';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import { closeSelected } from '../../redux/actions';

const useStyles = createUseStyles({
  button: {
    color: 'rgba(0, 0, 0, 0.25)',
    composes: ['is-block'],
    height: 30,
    width: 30,
  },
  closeButton: {
    composes: ['is-absolute'],
    right: -4,
    top: -4,
  },
});

const CloseButtonComponent = React.memo(function CloseButtonComponent() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const closeHandler = useCallback(() => {
    dispatch(closeSelected());
  }, [dispatch]);

  return (
    <div className={classes.closeButton}>
      <button className={classes.button} type="button" onClick={closeHandler}>
        <CloseIcon />
      </button>
    </div>
  );
});

export default CloseButtonComponent;
