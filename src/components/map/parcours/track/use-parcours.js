import { useCallback, useEffect, useState } from 'react';
import { useLeaflet } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';

import { enableEditMode, openSelected } from '../../../../redux/actions';

const useSelectHandler = data => {
  const { coordinates, id } = data;

  const { map } = useLeaflet();
  const dispatch = useDispatch();

  const [editable, setEditable] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [showDistances, setShowDistances] = useState(true);

  const user = useSelector(_ => _.user);
  const editmode = useSelector(_ => _.editmode);
  const selected = useSelector(_ => _.selected);
  const createmode = useSelector(_ => _.createmode);

  const selectHandler = useCallback(() => {
    if (editmode || createmode) return;
    dispatch(openSelected(id));
    map.setView(coordinates);
  }, [createmode, coordinates, id, dispatch, editmode, map]);

  const toggleEditHandler = useCallback(() => {
    const isowner = user === id;
    if (editmode || createmode || !isowner) return;
    dispatch(enableEditMode());
  }, [createmode, id, dispatch, editmode, user]);

  useEffect(() => {
    const next = selected && selected === id;
    setIsSelected(next);
  }, [id, selected]);

  useEffect(() => {
    const next = !selected || isSelected;
    setShowDistances(next);
  }, [id, isSelected, selected]);

  useEffect(() => {
    if (!editable) {
      const next = editmode && selected === data.id;
      setEditable(next);
    }
  }, [data.id, editable, editmode, selected]);

  return {
    editable,
    opacity: 1,
    selectHandler,
    showDistances,
    toggleEditHandler,
  };
};

export default useSelectHandler;
