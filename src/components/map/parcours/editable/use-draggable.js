import pick from 'lodash.pick';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getPathPoints } from '../../../../helpers';
import { updateParcours } from '../../../../redux/actions';
import { selectParcours } from '../../../../redux/selectors';

const useDraggable = ({ background, foreground, track }) => {
  const dispatch = useDispatch();
  const parcours = useSelector(selectParcours);
  const { points, polygon } = pick(parcours, ['points', 'polygon']);

  const [markers, setMarkers] = useState({
    end: null,
    length: 0,
    start: null,
    waypoints: [],
  });

  const togglePolygonShape = useCallback(() => {
    const next = !polygon;
    dispatch(updateParcours({ ...parcours, polygon: next }));
  }, [polygon, dispatch, parcours]);

  const dragHandler = dragIndex => ({ latlng: nextLatLng }) => {
    const ltrack = track.current.leafletElement;
    const latlngs = getPathPoints(ltrack.getLatLngs());
    const next = latlngs.map((latlng, index) => {
      if (index !== dragIndex) return latlng;
      return nextLatLng;
    });
    ltrack.setLatLngs(next);
    const lforeground = foreground.current.leafletElement;
    lforeground.setLatLngs(next);
    if (polygon) {
      const lbackground = background.current.leafletElement;
      lbackground.setLatLngs(next);
    }
  };

  const dragEndHandler = useCallback(() => {
    const ltrack = track.current.leafletElement;
    const latlngs = getPathPoints(ltrack.getLatLngs());
    dispatch(updateParcours({ ...parcours, points: latlngs }));
  }, [parcours, dispatch, track]);

  useEffect(() => {
    if (points) {
      const { length } = points;
      const [start] = points.slice(0, 1);
      const [end] = !polygon ? points.slice(-1) : [null];
      const waypoints = !polygon ? points.slice(1, -1) : points.slice(1);
      setMarkers({ end, length, start, waypoints });
    }
  }, [points, polygon]);

  return {
    dragEndHandler,
    dragHandler,
    markers,
    togglePolygonShape,
  };
};

export default useDraggable;
