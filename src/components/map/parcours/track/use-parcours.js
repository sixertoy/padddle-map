import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { isOwner } from '../../../../helpers';
import { enableEditMode, openSelected } from '../../../../redux/actions';

const useParcours = data => {
  const dispatch = useDispatch();

  const user = useSelector(_ => _.user);
  const selected = useSelector(_ => _.selected);
  const editmode = useSelector(_ => _.editmode);
  const createmode = useSelector(_ => _.createmode);

  const isowner = isOwner(data, user);
  const opacity = (editmode && selected !== data.id) || createmode ? 0.15 : 1;

  const selectHandler = useCallback(() => {
    if (createmode) return;
    dispatch(openSelected(data.id));
  }, [createmode, data.id, dispatch]);

  const editModeHandler = useCallback(() => {
    if (createmode || !isowner) return;
    dispatch(enableEditMode());
  }, [createmode, dispatch, isowner]);

  return {
    editModeHandler,
    opacity,
    selectHandler,
  };
};

export default useParcours;
