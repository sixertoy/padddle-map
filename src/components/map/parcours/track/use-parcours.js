import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { enableEditMode, openSelected } from '../../../../redux/actions';

const useSelectHandler = data => {
  const { id, user } = data;

  const dispatch = useDispatch();

  const [isSelected, setIsSelected] = useState(false);
  const [showDistances, setShowDistances] = useState(true);

  const uid = useSelector(_ => _.user);
  const editmode = useSelector(_ => _.editmode);
  const selected = useSelector(_ => _.selected);
  const createmode = useSelector(_ => _.createmode);

  const selectHandler = useCallback(() => {
    if (editmode || createmode) return;
    dispatch(openSelected(id));
  }, [createmode, id, dispatch, editmode]);

  const toggleEditHandler = useCallback(() => {
    const isowner = user === uid;
    if (editmode || createmode || !isowner) return;
    dispatch(enableEditMode());
  }, [createmode, dispatch, editmode, uid, user]);

  useEffect(() => {
    const next = selected && selected === id;
    setIsSelected(next);
  }, [id, selected]);

  useEffect(() => {
    const next = !selected || isSelected;
    setShowDistances(next);
  }, [id, isSelected, selected]);

  return {
    opacity: 1,
    selectHandler,
    showDistances,
    toggleEditHandler,
  };
};

export default useSelectHandler;
