import { useCallback } from 'react';
import { useLeaflet } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';

import { openSelected } from '../../../../redux/actions';

const useSelectHandler = data => {
  const { map } = useLeaflet();
  const dispatch = useDispatch();

  const editmode = useSelector(_ => _.editmode);
  const createmode = useSelector(_ => _.createmode);

  const selectHandler = useCallback(() => {
    if (editmode || createmode) return;
    dispatch(openSelected(data.id));
    map.setView(data.coordinates);
  }, [createmode, data.coordinates, data.id, dispatch, editmode, map]);

  return selectHandler;
};

export default useSelectHandler;
