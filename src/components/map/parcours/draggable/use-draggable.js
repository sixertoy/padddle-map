import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getPathPoints } from '../../../../helpers';
import { updateParcours } from '../../../../redux/actions';
import { selectParcours } from '../../../../redux/selectors';

const useDraggable = ({ shape, track }) => {
  const dispatch = useDispatch();
  const data = useSelector(selectParcours);
  const { points, polygon } = data;

  const [markers, setMarkers] = useState({
    end: null,
    length: 0,
    start: null,
    waypoints: [],
  });

  const dragHandler = dragIndex => ({ latlng: nextLatLng, target, type }) => {
    const ltrack = track.current.leafletElement;
    const latlngs = getPathPoints(ltrack.getLatLngs());
    if (type === 'dragend') {
      dispatch(updateParcours({ ...data, points: latlngs }));
    } else if (type === 'drag') {
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
    }
  };

  const addHandler = useCallback(() => {
    // const elt = track.current.leafletElement;
    // const latlngs = elt.getLatLngs();
    // const flattend = getPathPoints(latlngs);
    // const found = flattend.reduce((acc, point, index, list) => {
    //   if (index === 0) return acc;
    //   const prev = list[index - 1];
    //   const belongsTo = GeometryUtil.belongsSegment(latlng, point, prev);
    //   if (!belongsTo) return acc;
    //   return index;
    // }, -1);
    // const start = data.points.slice(0, found);
    // const end = data.points.slice(found);
    // const next = [...start, latlng, ...end];
    // dispatch(updateParcours({ ...data, points: next }));
  }, []);

  const removeHandler = index => () => {
    const line = track.current.leafletElement;
    const latlngs = getPathPoints(line.getLatLngs());
    const removeLimit = latlngs.length <= 2;
    if (removeLimit) return;
    const next = latlngs.filter((obj, i) => index !== i);
    const ispolygon = next.length > 2 && data.polygon;
    dispatch(updateParcours({ ...data, points: next, polygon: ispolygon }));
  };

  useEffect(() => {
    const { length } = points;
    const [start] = points.slice(0, 1);
    const [end] = !polygon ? points.slice(-1) : [null];
    const waypoints = !polygon ? points.slice(1, -1) : points.slice(1);
    setMarkers({ end, length, start, waypoints });
  }, [points, polygon]);

  return {
    addHandler,
    dragHandler,
    markers,
    removeHandler,
  };
};

export default useDraggable;
