import React, { useCallback } from 'react';
import { IoMdClose as CloseIcon } from 'react-icons/io';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import { closePopup } from '../../redux/actions';

const useStyles = createUseStyles({
  close: {
    color: 'rgba(255, 255, 255, 0.55)',
    composes: ['is-absolute', 'fs14'],
    right: 7,
    top: 7,
  },
});

const CloseComponent = React.memo(() => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const closeHandler = useCallback(() => {
    dispatch(closePopup());
  }, [dispatch]);

  return (
    <button className={classes.close} type="button" onClick={closeHandler}>
      <CloseIcon />
    </button>
  );
});

export default CloseComponent;
