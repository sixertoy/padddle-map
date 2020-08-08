import Tippy from '@tippyjs/react';
import React, { useCallback } from 'react';
import { IoMdTrash as DeleteIcon } from 'react-icons/io';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import { openDeleteModal } from '../../redux/actions';

const useStyles = createUseStyles({
  button: {
    '&:hover': {
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

const DeleteButtonComponent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const deleteHandler = useCallback(() => {
    dispatch(openDeleteModal());
  }, [dispatch]);

  return (
    <Tippy content="Supprimer le parcours" placement="top">
      <button className={classes.button} type="button" onClick={deleteHandler}>
        <DeleteIcon />
      </button>
    </Tippy>
  );
};

export default DeleteButtonComponent;
