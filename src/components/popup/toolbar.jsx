import React, { useCallback } from 'react';
import {
  IoMdDownload as ExportIcon,
  IoMdSave as SaveIcon,
  IoMdTrash as DeleteIcon,
} from 'react-icons/io';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { cancelDraft, closePopup, deleteParcours } from '../../redux/actions';
import { selectParcours } from '../../redux/selectors';

const useStyles = createUseStyles({
  container: {},
});

const ToolbarComponent = React.memo(() => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const user = useSelector(_ => _.user);
  const selected = useSelector(selectParcours);
  const createmode = useSelector(_ => _.createmode);

  const isowner = user.uid === selected.user;

  const exportHandler = useCallback(() => {}, []);

  const deleteHandler = useCallback(() => {
    if (createmode) dispatch(cancelDraft());
    if (!createmode) dispatch(deleteParcours(selected.id));
    dispatch(closePopup());
  }, [createmode, dispatch, selected.id]);

  const commitHandler = useCallback(() => {
    // const { uid } = user;
    // console.log('data', data);
    // dispatch(commitDraft({ ...data, user: uid }));
  }, []);

  return (
    <div className={classes.buttons}>
      <button type="button" onClick={exportHandler}>
        <ExportIcon />
      </button>
      <button type="button" onClick={commitHandler}>
        <SaveIcon />
      </button>
      {isowner && (
        <button type="button" onClick={deleteHandler}>
          <DeleteIcon />
        </button>
      )}
    </div>
  );
});

export default ToolbarComponent;
