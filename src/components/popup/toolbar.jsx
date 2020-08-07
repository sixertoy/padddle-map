import get from 'lodash.get';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import {
  IoIosSave as SaveIcon,
  IoIosStar as FavoriteIcon,
  IoMdDownload as ExportIcon,
  IoMdTrash as DeleteIcon,
} from 'react-icons/io';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

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

const ToolbarComponent = React.memo(({ user }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const draft = useSelector(_ => _.draft);
  const selected = useSelector(selectParcours);
  const createmode = useSelector(_ => _.createmode);

  const isowner = selected.user === get(user, 'uid', null);

  const commitHandler = useCallback(() => {
    dispatch(commitDraft(draft));
  }, [dispatch, draft]);

  const cancelHandler = useCallback(() => {
    dispatch(cancelDraft());
  }, [dispatch]);

  const exportHandler = useCallback(() => {}, []);

  const favoriteHandler = useCallback(() => {}, []);

  const deleteHandler = useCallback(() => {
    dispatch(openDeleteModal());
  }, [dispatch]);

  return (
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
          <button
            disabled
            className={classes.button}
            type="button"
            onClick={exportHandler}>
            <ExportIcon />
          </button>
          {isowner && (
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
  );
});

ToolbarComponent.defaultProps = {
  user: null,
};

ToolbarComponent.propTypes = {
  user: PropTypes.shape(),
};

export default ToolbarComponent;
