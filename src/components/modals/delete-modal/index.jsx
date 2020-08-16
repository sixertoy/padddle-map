import classnames from 'classnames';
import React, { useCallback } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { closeDeleteModal, deleteParcours } from '../../../redux/actions';
import { selectParcours } from '../../../redux/selectors';

const useStyles = createUseStyles({
  button: {
    '&:hover': {
      background: 'rgba(0, 0, 0, 0.65)',
      color: '#FFFFFF',
    },
    background: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 21,
    color: '#000',
    composes: ['mx7', 'p12'],
    height: 42,
    transition: 'all, 0.2s',
    width: 135,
  },
  buttonConfirm: {
    background: '#FF5A50',
    color: '#FFFFFF',
  },
  buttons: {
    composes: ['flex-columns', 'flex-around', 'items-center'],
  },
  description: {
    '& strong': { fontWeight: 'bold' },
    composes: ['mb32', 'text-center'],
    lineHeight: '1.1em',
  },
});

const DeleteModalComponent = function DeleteModalComponent() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const parcours = useSelector(selectParcours);

  const cancelHandler = useCallback(() => {
    dispatch(closeDeleteModal());
  }, [dispatch]);

  const confirmHandler = useCallback(() => {
    dispatch(closeDeleteModal());
    dispatch(deleteParcours(parcours.id));
  }, [dispatch, parcours.id]);

  return (
    <React.Fragment>
      <div className={classes.description}>
        <span>
          Confirmer la suppression de <strong>{parcours.name}</strong>&nbsp;?
        </span>
      </div>
      <div className={classes.buttons}>
        <button
          className={classnames(classes.button, classes.buttonConfirm)}
          type="button"
          onClick={confirmHandler}>
          <span>Confirmer</span>
        </button>
        <button
          className={classes.button}
          type="button"
          onClick={cancelHandler}>
          <span>Annuler</span>
        </button>
      </div>
    </React.Fragment>
  );
};

export default DeleteModalComponent;
