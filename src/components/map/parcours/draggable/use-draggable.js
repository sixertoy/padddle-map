import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectParcours } from '../../../../redux/selectors';

const useDraggable = () => {
  const data = useSelector(selectParcours);
  const { points, polygon } = data;

  const [markers, setMarkers] = useState({
    end: null,
    length: 0,
    start: null,
    waypoints: [],
  });

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

  const removeHandler = useCallback(() => {
    // console.log('evt', evt);
    // if (index === 0) return;
    // const line = track.current.leafletElement;
    // const latlngs = getPathPoints(line.getLatLngs());
    // const next = latlngs.filter((obj, i) => index !== i);
    // dispatch(updateParcours({ ...data, points: next }));
  }, []);

  useEffect(() => {
    const { length } = points;
    const [start] = points.slice(0, 1);
    const [end] = !polygon ? points.slice(-1) : [null];
    const waypoints = !polygon ? points.slice(1, -1) : points.slice(1);
    setMarkers({ end, length, start, waypoints });
  }, [points, polygon]);

  return { addHandler, markers, removeHandler };
};

export default useDraggable;
