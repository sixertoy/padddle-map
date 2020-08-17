import Tippy from '@tippyjs/react';
import React, { useCallback, useEffect, useState } from 'react';
import { IoMdTrash as DeleteIcon } from 'react-icons/io';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { openDeleteModal } from '../../redux/actions';
import { selectParcours } from '../../redux/selectors';

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
  const { polygon } = useSelector(selectParcours);

  const [label, setLabel] = useState('');

  const deleteHandler = useCallback(() => {
    dispatch(openDeleteModal());
  }, [dispatch]);

  useEffect(() => {
    if (polygon) {
      setLabel('Supprimer le circuit');
    } else {
      setLabel('Supprimer le parcours');
    }
  }, [polygon]);

  return (
    <Tippy content={label} placement="left">
      <button className={classes.button} type="button" onClick={deleteHandler}>
        <DeleteIcon />
      </button>
    </Tippy>
  );
};

export default DeleteButtonComponent;
