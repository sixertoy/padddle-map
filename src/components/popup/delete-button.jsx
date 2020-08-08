import React, { useCallback } from 'react';
import {
  IoMdClose as CloseIcon,
  IoMdTrash as DeleteIcon,
} from 'react-icons/io';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { cancelDraft, openDeleteModal } from '../../redux/actions';

const useStyles = createUseStyles({
  button: {
    '&:hover': {
      background: '#800083',
      color: '#FFFFFF',
    },
    background: '#FFFFFF',
    borderRadius: '50%',
    composes: ['mb7', 'is-absolute'],
    fontSize: '1.1rem',
    height: 40,
    lineHeight: 0,
    outline: 'none',
    right: -48,
    transition: 'all 0.3s',
    width: 40,
  },
});

const DeleteButtonComponent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const createmode = useSelector(_ => _.createmode);

  const deleteHandler = useCallback(() => {
    if (createmode) dispatch(cancelDraft());
    if (!createmode) dispatch(openDeleteModal());
  }, [createmode, dispatch]);

  return (
    <button className={classes.button} type="button" onClick={deleteHandler}>
      {createmode && <CloseIcon />}
      {!createmode && <DeleteIcon />}
    </button>
  );
};

DeleteButtonComponent.defaultProps = {};

DeleteButtonComponent.propTypes = {};

export default DeleteButtonComponent;
