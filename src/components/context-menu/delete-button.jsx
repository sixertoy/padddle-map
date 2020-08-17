import Tippy from '@tippyjs/react';
import React, { useCallback } from 'react';
import { IoMdTrash as DeleteIcon } from 'react-icons/io';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import { openDeleteModal } from '../../redux/actions';

const useStyles = createUseStyles({
  button: {
    '&:hover': {
      background: '#B13333',
    },
    background: '#FF5950',
    borderRadius: '50%',
    color: '#FFFFFF',
    composes: ['ml7'],
    fontSize: '1.1rem',
    height: 40,
    lineHeight: 0,
    outline: 'none',
    transition: 'all 0.3s',
    width: 40,
  },
  [`@media (max-width: ${680}px)`]: {
    button: {
      fontSize: '16px !important',
      height: 35,
      marginLeft: '0 !important',
      width: 35,
    },
  },
});

const DeleteButtonComponent = function DeleteButtonComponent() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const deleteHandler = useCallback(() => {
    dispatch(openDeleteModal());
  }, [dispatch]);

  return (
    <Tippy content="Supprimer le parcours" placement="left">
      <button className={classes.button} type="button" onClick={deleteHandler}>
        <DeleteIcon />
      </button>
    </Tippy>
  );
};

export default DeleteButtonComponent;
