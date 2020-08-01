import Tippy from '@tippyjs/react';
import classnames from 'classnames';
import React, { useCallback } from 'react';
import { IoIosAdd as PlusIcon } from 'react-icons/io';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { cancelDraft, createDraft } from '../../redux/actions';

const useStyles = createUseStyles({
  button: {
    '&.edit': {
      background: '#FF5850',
      color: '#FFFFFF',
    },
    '&:hover': {
      background: '#FF5850',
      color: '#FFFFFF',
    },
    background: '#FFFFFF',
    borderRadius: '50%',
    fontSize: '2.7rem',
    height: 60,
    lineHeight: 0,
    outline: 'none',
    transition: 'all 0.3s',
    width: 60,
  },
  icon: {
    '&.edit': { transform: 'rotate(45deg)' },
    transform: 'rotate(0deg)',
    transition: 'transform 0.3s',
  },
});

const BigButtonComponent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const edit = useSelector(_ => _.editmode);

  const clickHandler = useCallback(() => {
    if (edit) dispatch(cancelDraft());
    if (!edit) dispatch(createDraft());
  }, [dispatch, edit]);

  return (
    <Tippy content="Ajouter un parcours" placement="left">
      <button
        className={classnames(classes.button, { edit })}
        type="button"
        onClick={clickHandler}>
        <PlusIcon className={classnames(classes.icon, { edit })} />
      </button>
    </Tippy>
  );
};

export default BigButtonComponent;
