import Tippy from '@tippyjs/react';
import React, { useCallback } from 'react';
import { IoIosSave as SaveIcon } from 'react-icons/io';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { closeSelected, commitDraft } from '../../redux/actions';

const useStyles = createUseStyles({
  button: {
    '& .icon': {
      fontSize: '0.8em',
    },
    '&:hover': {
      background: '#FF5850',
      color: '#FFFFFF',
    },
    background: '#3388FF',
    borderRadius: '50%',
    color: '#FFFFFF',
    fontSize: '2.7rem',
    height: 60,
    lineHeight: 0,
    opacity: 1,
    outline: 'none',
    transition: 'all 0.3s',
    width: 60,
  },
  container: {
    composes: ['flex-columns', 'items-center'],
  },
});

const BigButtonComponent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const draft = useSelector(_ => _.draft);

  const clickHandler = useCallback(() => {
    dispatch(commitDraft(draft));
    dispatch(closeSelected());
  }, [dispatch, draft]);

  return (
    <Tippy content="Enregistrer" placement="left">
      <button className={classes.button} type="button" onClick={clickHandler}>
        <SaveIcon className="icon" />
      </button>
    </Tippy>
  );
};

export default BigButtonComponent;
