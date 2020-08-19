import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { isOwner } from '../../../../helpers';
import { enableEditMode, openSelected } from '../../../../redux/actions';

const useParcours = data => {
  const dispatch = useDispatch();

  const user = useSelector(_ => _.user);
  const editmode = useSelector(_ => _.editmode);
  const createmode = useSelector(_ => _.createmode);

  const isowner = isOwner(data, user);
  // const selected = useSelector(_ => _.selected);
  // const isselected = data.id === selected;

  const selectHandler = useCallback(() => {
    if (editmode || createmode) return;
    dispatch(openSelected(data.id));
  }, [createmode, data.id, dispatch, editmode]);

  const editModeHandler = useCallback(() => {
    if (createmode || !isowner) return;
    dispatch(enableEditMode());
    // if (!isowner || createmode) return;
    // if (!editmode && isSelected) {
    // } else if (editmode && !isSelected) {
    //   dispatch(disableEditMode());
    //   dispatch(openSelected(parcours.id));
    //   dispatch(enableEditMode());
    // }
  }, [createmode, dispatch, isowner]);

  return {
    editModeHandler,
    selectHandler,
  };
};

export default useParcours;
