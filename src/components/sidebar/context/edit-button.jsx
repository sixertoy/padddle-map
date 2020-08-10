import Tippy from '@tippyjs/react';
import classnames from 'classnames';
import React, { useCallback } from 'react';
import { MdTabUnselected as EditIcon } from 'react-icons/md';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { disableEditMode, enableEditMode } from '../../../redux/actions';

const useStyles = createUseStyles({
  button: {
    '&.editmode': {
      background: '#FF5950',
      color: '#FFFFFF',
    },
    background: '#FFFFFF',
    borderRadius: '50%',
    composes: ['ml7'],
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

const EditButtonComponent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const editmode = useSelector(_ => _.editmode);

  const editHandler = useCallback(() => {
    if (editmode) dispatch(disableEditMode());
    if (!editmode) dispatch(enableEditMode());
  }, [dispatch, editmode]);

  return (
    <Tippy content="Ajout/Supp de points" placement="top">
      <button
        className={classnames(classes.button, { editmode })}
        type="button"
        onClick={editHandler}>
        <EditIcon />
      </button>
    </Tippy>
  );
};

export default EditButtonComponent;
