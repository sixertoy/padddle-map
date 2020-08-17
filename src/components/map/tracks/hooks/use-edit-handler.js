import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { enableEditMode } from '../../../../redux/actions';

const useEditHandler = data => {
  const dispatch = useDispatch();
  const user = useSelector(_ => _.user);
  const editmode = useSelector(_ => _.editmode);
  const createmode = useSelector(_ => _.createmode);

  const toggleEditHandler = useCallback(() => {
    const isowner = user === data.id;
    if (editmode || createmode || !isowner) return;
    dispatch(enableEditMode());
  }, [createmode, data.id, dispatch, editmode, user]);

  return toggleEditHandler;
};

export default useEditHandler;
