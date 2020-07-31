import React, { useCallback } from 'react';
import { IoIosShareAlt as ShareIcon } from 'react-icons/io';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import { openShareModal } from '../../redux/actions';

const useStyles = createUseStyles({
  container: {
    color: '#FF5950',
    fontSize: '1.5rem',
  },
});

const ShareButtonComponent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const shareHandler = useCallback(() => {
    dispatch(openShareModal());
  }, [dispatch]);

  return (
    <button className={classes.container} type="button" onClick={shareHandler}>
      <ShareIcon />
    </button>
  );
};

export default ShareButtonComponent;
