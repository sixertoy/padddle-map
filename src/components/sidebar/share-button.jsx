import Tippy from '@tippyjs/react';
import React, { useCallback } from 'react';
import { IoIosShareAlt as ShareIcon } from 'react-icons/io';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { openShareModal } from '../../redux/actions';

const useStyles = createUseStyles({
  button: {
    '&:hover': {
      background: '#FF5850',
      color: '#FFFFFF',
    },
    background: '#FFFFFF',
    borderRadius: '50%',
    composes: ['mb7', 'fs18'],
    height: 40,
    lineHeight: 0,
    outline: 'none',
    transition: 'all 0.3s',
    width: 40,
  },
});

const ShareButtonComponent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const createmode = useSelector(_ => _.createmode);

  const shareHandler = useCallback(() => {
    dispatch(openShareModal());
  }, [dispatch]);

  return (
    <Tippy content="Partager" placement="left">
      <button
        className={classes.button}
        disabled={createmode}
        type="button"
        onClick={shareHandler}>
        <ShareIcon />
      </button>
    </Tippy>
  );
};

export default ShareButtonComponent;
