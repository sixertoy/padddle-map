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

  const [markers, setMarkers] = useState({
    end: null,
    length: 0,
    start: null,
    waypoints: [],
  });

  const togglePolygonShape = useCallback(() => {
    const next = !parcours.polygon;
    dispatch(updateParcours({ ...parcours, polygon: next }));
  }, [parcours, dispatch]);

  const dragHandler = dragIndex => ({ latlng: nextLatLng, target }) => {
    const ltrack = track.current.leafletElement;
    const latlngs = getPathPoints(ltrack.getLatLngs());
    target.closeTooltip();
    const next = latlngs.map((latlng, index) => {
      if (index !== dragIndex) return latlng;
      return nextLatLng;
    });
    ltrack.setLatLngs(next);
    if (polygon) {
      const lshape = shape.current.leafletElement;
      lshape.setLatLngs(next);
    }
  };

  const dragEndHandler = useCallback(() => {
    const ltrack = track.current.leafletElement;
    const latlngs = getPathPoints(ltrack.getLatLngs());
    dispatch(updateParcours({ ...parcours, points: latlngs }));
  }, [parcours, dispatch, track]);

  const removeHandler = index => () => {
    const line = track.current.leafletElement;
    const latlngs = getPathPoints(line.getLatLngs());
    const removeLimit = latlngs.length <= 2;
    if (removeLimit) return;
    const next = latlngs.filter((obj, i) => index !== i);
    const ispolygon = next.length > 2 && parcours.polygon;
    dispatch(updateParcours({ ...parcours, points: next, polygon: ispolygon }));
  };

  useEffect(() => {
    const { length } = points;
    const [start] = points.slice(0, 1);
    const [end] = !polygon ? points.slice(-1) : [null];
    const waypoints = !polygon ? points.slice(1, -1) : points.slice(1);
    setMarkers({ end, length, start, waypoints });
  }, [points, polygon]);

  return {
    dragEndHandler,
    dragHandler,
    markers,
    removeHandler,
    togglePolygonShape,
  };
};

export default useDraggable;
