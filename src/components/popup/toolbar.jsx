import React, { useCallback } from 'react';
import {
  IoIosSave as SaveIcon,
  IoIosStar as FavoriteIcon,
  IoMdTrash as DeleteIcon,
} from 'react-icons/io';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { FirebaseAuthConsumer } from '../../core/firebase';
import { isOwner } from '../../helpers';
import { cancelDraft, commitDraft, openDeleteModal } from '../../redux/actions';
import { selectParcours } from '../../redux/selectors';

const useStyles = createUseStyles({
  button: {
    '&:disabled': { opacity: 0.25 },
    '&:hover': { background: '#FF5A50' },
    background: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 16,
    color: '#FFFFFF',
    composes: ['ml12'],
    fontSize: 16,
    height: 32,
    transition: 'all 0.2s',
    width: 32,
  },
  buttons: {
    display: 'flex',
  },
});

const ToolbarComponent = React.memo(() => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const draft = useSelector(_ => _.draft);
  const selected = useSelector(selectParcours);
  const createmode = useSelector(_ => _.createmode);

  const commitHandler = useCallback(() => {
    dispatch(commitDraft(draft));
  }, [dispatch, draft]);

  const cancelHandler = useCallback(() => {
    dispatch(cancelDraft());
  }, [dispatch]);

  const favoriteHandler = useCallback(() => {}, []);

  const deleteHandler = useCallback(() => {
    dispatch(openDeleteModal());
  }, [dispatch]);

  return (
    <FirebaseAuthConsumer>
      {({ user }) => (
        <div className={classes.buttons}>
          {createmode && (
            <React.Fragment>
              <button
                className={classes.button}
                type="button"
                onClick={commitHandler}>
                <SaveIcon />
              </button>
              <button
                className={classes.button}
                type="button"
                onClick={cancelHandler}>
                <DeleteIcon />
              </button>
            </React.Fragment>
          )}
          {!createmode && (
            <React.Fragment>
              <button
                disabled
                className={classes.button}
                type="button"
                onClick={favoriteHandler}>
                <FavoriteIcon />
              </button>
              {isOwner(selected, user) && (
                <button
                  className={classes.button}
                  type="button"
                  onClick={deleteHandler}>
                  <DeleteIcon />
                </button>
              )}
            </React.Fragment>
          )}
        </div>
      )}
    </FirebaseAuthConsumer>
  );
});

export default ToolbarComponent;
