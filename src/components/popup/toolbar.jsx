import React, { useCallback } from 'react';
import {
  IoIosSave as SaveIcon,
  IoIosShareAlt as ShareIcon,
  IoIosStar as FavoriteIcon,
  IoMdDownload as ExportIcon,
  IoMdTrash as DeleteIcon,
} from 'react-icons/io';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import {
  cancelDraft,
  commitDraft,
  openDeleteModal,
  openShareModal,
} from '../../redux/actions';

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
    composes: ['flex-columns', 'flex-end', 'items-center'],
  },
});

const ToolbarComponent = React.memo(() => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const createmode = useSelector(_ => _.createmode);

  const commitHandler = useCallback(() => {
    dispatch(commitDraft());
  }, [dispatch]);

  const cancelHandler = useCallback(() => {
    dispatch(cancelDraft());
  }, [dispatch]);

  const exportHandler = useCallback(() => {}, []);

  const favoriteHandler = useCallback(() => {}, []);

  const ShareHandler = useCallback(() => {
    dispatch(openShareModal());
  }, [dispatch]);

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
            onClick={cancelHandler}>
            <DeleteIcon />
          </button>
          <button
            className={classes.button}
            type="button"
            onClick={commitHandler}>
            <SaveIcon />
          </button>
        </React.Fragment>
      )}
      {!createmode && (
        <React.Fragment>
          <button
            className={classes.button}
            type="button"
            onClick={deleteHandler}>
            <DeleteIcon />
          </button>
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
            onClick={ShareHandler}>
            <ShareIcon />
          </button>
          <button
            disabled
            className={classes.button}
            type="button"
            onClick={exportHandler}>
            <ExportIcon />
          </button>
        </React.Fragment>
      )}
    </div>
  );
});

export default ToolbarComponent;
