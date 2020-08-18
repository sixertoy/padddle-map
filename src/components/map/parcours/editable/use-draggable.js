import pick from 'lodash.pick';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getPathPoints } from '../../../../helpers';
import { updateParcours } from '../../../../redux/actions';
import { selectParcours } from '../../../../redux/selectors';

const useDraggable = ({ shape, track }) => {
  const dispatch = useDispatch();
  const parcours = useSelector(selectParcours);
  const { points, polygon } = pick(parcours, ['points', 'polygon']);

  const [isDragging, setIsDragging] = useState(false);
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

  const dragStartHandler = () => () => {
    setIsDragging(true);
  };

  const dragHandler = dragIndex => ({ latlng: nextLatLng }) => {
    try {
      const ltrack = track.current.leafletElement;
      const latlngs = getPathPoints(ltrack.getLatLngs());
      const next = latlngs.map((latlng, index) => {
        if (index !== dragIndex) return latlng;
        return nextLatLng;
      });
      ltrack.setLatLngs(next);
      if (polygon) {
        const lshape = shape.current.leafletElement;
        lshape.setLatLngs(next);
      }
    } catch (err) {
      console.log('dragHandler error => ', err);
    }
  };

  const dragEndHandler = useCallback(() => {
    setIsDragging(false);
    const ltrack = track.current.leafletElement;
    const latlngs = getPathPoints(ltrack.getLatLngs());
    dispatch(updateParcours({ ...parcours, points: latlngs }));
  }, [parcours, dispatch, track]);

  const removeHandler = index => () => {
    if (isDragging) return;
    const line = track.current.leafletElement;
    const latlngs = getPathPoints(line.getLatLngs());
    const removeLimit = latlngs.length <= 2;
    if (removeLimit) return;
    const next = latlngs.filter((obj, i) => index !== i);
    const ispolygon = next.length > 2 && polygon;
    dispatch(updateParcours({ ...parcours, points: next, polygon: ispolygon }));
  };

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
    dragStartHandler,
    isDragging,
    markers,
    removeHandler,
    togglePolygonShape,
  };
};

export default useDraggable;
