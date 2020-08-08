import React, { useCallback } from 'react';
import { IoIosSave as SaveIcon } from 'react-icons/io';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { rgba } from '../../core';
import { commitDraft } from '../../redux/actions';

const useStyles = createUseStyles({
  button: {
    '&:hover': {
      background: rgba('#FF5850', 0.65),
      color: '#FFFFFF',
    },
    background: '#FF5850',
    borderRadius: '50%',
    composes: ['mb7'],
    fontSize: '1.1rem',
    height: 40,
    lineHeight: 0,
    outline: 'none',
    transition: 'all 0.3s',
    width: 40,
  },
});

const CommitButtonComponent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const draft = useSelector(_ => _.draft);

  const commitHandler = useCallback(() => {
    dispatch(commitDraft(draft));
  }, [dispatch, draft]);

  return (
    <button className={classes.button} type="button" onClick={commitHandler}>
      <SaveIcon />
    </button>
  );
};

export default CommitButtonComponent;
