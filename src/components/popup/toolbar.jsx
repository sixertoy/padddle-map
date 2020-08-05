import React, { useCallback } from 'react';
import {
  IoIosShareAlt as ShareIcon,
  IoMdDownload as ExportIcon,
  IoMdTrash as DeleteIcon,
} from 'react-icons/io';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import {
  cancelDraft,
  closePopup,
  deleteParcours,
  openShareModal,
} from '../../redux/actions';
import { selectParcours } from '../../redux/selectors';

const useStyles = createUseStyles({
  button: {
    background: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 16,
    color: 'rgba(0, 0, 0, 1)',
    fontSize: 16,
    height: 32,
    width: 32,
  },
  buttons: {
    composes: ['flex-columns', 'flex-around', 'items-center'],
  },
});

const ToolbarComponent = React.memo(() => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const user = useSelector(_ => _.user);
  const selected = useSelector(selectParcours);
  const createmode = useSelector(_ => _.createmode);

  const isowner = user.uid === selected.user;

  const exportHandler = useCallback(() => {}, []);

  const ShareHandler = useCallback(() => {
    dispatch(openShareModal());
  }, [dispatch]);

  const deleteHandler = useCallback(() => {
    if (createmode) dispatch(cancelDraft());
    if (!createmode) dispatch(deleteParcours(selected.id));
    dispatch(closePopup());
  }, [createmode, dispatch, selected.id]);

  return (
    <div className={classes.buttons}>
      {isowner && (
        <button
          className={classes.button}
          type="button"
          onClick={deleteHandler}>
          <DeleteIcon />
        </button>
      )}
      <button className={classes.button} type="button" onClick={ShareHandler}>
        <ShareIcon />
      </button>
      <button className={classes.button} type="button" onClick={ShareHandler}>
        <ShareIcon />
      </button>
      <button className={classes.button} type="button" onClick={exportHandler}>
        <ExportIcon />
      </button>
    </div>
  );
});

export default ToolbarComponent;
