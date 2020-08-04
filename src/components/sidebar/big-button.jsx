import Tippy from '@tippyjs/react';
import classnames from 'classnames';
import React, { useCallback } from 'react';
import { IoIosAdd as PlusIcon } from 'react-icons/io';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { cancelDraft, createDraft } from '../../redux/actions';

const useStyles = createUseStyles({
  button: {
    '&.createmode': {
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
  const createmode = useSelector(_ => _.createmode);

  const clickHandler = useCallback(() => {
    if (createmode) dispatch(cancelDraft());
    if (!createmode) dispatch(createDraft());
  }, [dispatch, createmode]);

  return (
    <Tippy content="Ajouter un parcours" placement="left">
      <button
        className={classnames(classes.button, { createmode })}
        type="button"
        onClick={clickHandler}>
        <PlusIcon className={classnames(classes.icon, { createmode })} />
      </button>
    </Tippy>
  );
};

export default BigButtonComponent;
