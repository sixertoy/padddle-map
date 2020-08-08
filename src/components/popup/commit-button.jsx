import React, { useCallback } from 'react';
import { IoIosSave as SaveIcon } from 'react-icons/io';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { commitDraft } from '../../redux/actions';

const useStyles = createUseStyles({
  button: {
    '&:hover': {
      background: '#FF5950',
      color: '#FFFFFF',
    },
    background: '#FFFFFF',
    borderRadius: '50%',
    composes: ['ml12'],
    flex: 0,
    fontSize: '1.1rem',
    height: 40,
    lineHeight: 0,
    minHeight: 40,
    minWidth: 40,
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
