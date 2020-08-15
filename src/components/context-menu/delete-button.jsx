import Tippy from '@tippyjs/react';
import React, { useCallback, useEffect, useState } from 'react';
import { IoMdTrash as DeleteIcon } from 'react-icons/io';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { closeSelected, openDeleteModal } from '../../redux/actions';

const useStyles = createUseStyles({
  button: {
    '&:hover': {
      background: '#B13333',
    },
    background: '#FF5950',
    borderRadius: '50%',
    color: '#FFFFFF',
    composes: ['ml7'],
    flex: 0,
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

const DeleteButtonComponent = React.memo(() => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [label, setLabel] = useState('Supprimer le parcours');

  const createmode = useSelector(_ => _.createmode);

  const deleteHandler = useCallback(() => {
    if (createmode) {
      dispatch(closeSelected());
    } else {
      dispatch(openDeleteModal());
    }
  }, [createmode, dispatch]);

  useEffect(() => {
    if (createmode) {
      setLabel('Annuler');
    } else {
      setLabel('Supprimer le parcours');
    }
  }, [createmode]);

  return (
    <Tippy content={label} placement="left">
      <button className={classes.button} type="button" onClick={deleteHandler}>
        <DeleteIcon />
      </button>
    </Tippy>
  );
});

export default DeleteButtonComponent;
