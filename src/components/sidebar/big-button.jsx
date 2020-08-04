import Tippy from '@tippyjs/react';
import classnames from 'classnames';
import React, { useCallback } from 'react';
import { IoIosAdd as PlusIcon } from 'react-icons/io';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { cancelDraft, closePopup, createDraft } from '../../redux/actions';

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
    '&.createmode': {
      transform: 'rotate(45deg)',
    },
    transform: 'rotate(0deg)',
    transition: 'transform 0.3s',
  },
});

const BigButtonComponent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const selected = useSelector(_ => _.selected);
  const createmode = useSelector(_ => _.createmode);

  const tippyContent = createmode ? 'Annuler' : 'Ajouter un parcours';

  const clickHandler = useCallback(() => {
    if (selected) dispatch(closePopup());
    if (createmode) dispatch(cancelDraft());
    if (!createmode) dispatch(createDraft());
  }, [selected, dispatch, createmode]);

  return (
    <Tippy content={tippyContent} placement="left">
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
