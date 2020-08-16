import Tippy from '@tippyjs/react';
import React, { useCallback, useEffect, useState } from 'react';
import { IoIosSave as SaveIcon } from 'react-icons/io';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { commitDraft } from '../../../redux/actions';

const useStyles = createUseStyles({
  button: {
    '&:disabled': {
      background: '#FFFFFF',
      color: '#B7B7B7',
    },
    '&:hover': {
      background: '#112E7F',
    },
    background: '#3388FF',
    borderRadius: '50%',
    color: '#FFFFFF',
    fontSize: '2rem',
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
  [`@media (max-width: ${680}px)`]: {
    button: {
      fontSize: '16px !important',
      height: 45,
      width: 45,
    },
  },
});

const CommitButtonComponent = function CommitButtonComponent() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const draft = useSelector(_ => _.draft);

  const [disabled, setDisabled] = useState(true);

  const clickHandler = useCallback(() => {
    dispatch(commitDraft(draft));
  }, [dispatch, draft]);

  useEffect(() => {
    const haspoints = draft && draft.points && draft.points.length >= 2;
    setDisabled(!haspoints);
  }, [draft]);

  return (
    <Tippy content="Enregistrer" placement="left">
      <button
        className={classes.button}
        disabled={disabled}
        type="button"
        onClick={clickHandler}>
        <SaveIcon className="icon" />
      </button>
    </Tippy>
  );
};

export default CommitButtonComponent;
