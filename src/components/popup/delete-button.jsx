import Tippy from '@tippyjs/react';
import React, { useCallback, useEffect, useState } from 'react';
import { IoMdTrash as DeleteIcon } from 'react-icons/io';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { cancelDraft, openDeleteModal } from '../../redux/actions';

const useStyles = createUseStyles({
  button: {
    '&:hover': {
      background: '#3388FF',
    },
    background: '#FF5950',
    borderRadius: '50%',
    color: '#FFFFFF',
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

const DeleteButtonComponent = React.memo(() => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [label, setLabel] = useState('Supprimer le parcours');

  const createmode = useSelector(_ => _.createmode);

  const deleteHandler = useCallback(() => {
    if (createmode) dispatch(cancelDraft());
    if (!createmode) dispatch(openDeleteModal());
  }, [createmode, dispatch]);

  useEffect(() => {
    if (createmode) {
      setLabel('Annuler');
    } else {
      setLabel('Supprimer le parcours');
    }
  }, [createmode]);

  return (
    <Tippy content={label} placement="top">
      <button className={classes.button} type="button" onClick={deleteHandler}>
        <DeleteIcon />
      </button>
    </Tippy>
  );
});

export default DeleteButtonComponent;
