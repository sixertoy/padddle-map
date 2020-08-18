import Tippy from '@tippyjs/react';
import classnames from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import { IoIosSave as SaveIcon, IoMdCreate as EditIcon } from 'react-icons/io';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { disableEditMode, enableEditMode } from '../../../redux/actions';

const useStyles = createUseStyles({
  button: {
    '&.editmode': {
      background: '#112E7F',
      color: '#3388FF',
    },
    '&.editmode:hover': {
      background: '#3388FF',
      color: '#FFFFFF',
    },
    '&:hover:not(.editmode)': {
      background: '#112E7F',
      color: '#3388FF',
    },
    background: '#3388FF',
    borderRadius: '50%',
    color: '#FFFFFF',
    fontSize: '1.6rem',
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

const EditButtonComponent = function EditButtonComponent() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [label, setLabel] = useState('Modifier');

  const editmode = useSelector(_ => _.editmode);

  const clickHandler = useCallback(() => {
    if (editmode) {
      dispatch(disableEditMode());
    } else {
      dispatch(enableEditMode());
    }
  }, [dispatch, editmode]);

  useEffect(() => {
    if (editmode) {
      setLabel('Enregistrer');
    } else {
      setLabel('Modifier');
    }
  }, [editmode]);

  return (
    <Tippy content={label} placement="left">
      <button
        className={classnames(classes.button, { editmode })}
        type="button"
        onClick={clickHandler}>
        {editmode && <SaveIcon className="icon" />}
        {!editmode && <EditIcon className="icon" />}
      </button>
    </Tippy>
  );
};

export default EditButtonComponent;
