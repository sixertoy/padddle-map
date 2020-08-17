import { useEffect, useState } from 'react';

const useMarkerPoint = data => {
  const [points, setPoints] = useState(data.points);
  const [endpoint, setEndpoint] = useState();
  const [startpoint, setStartpoint] = useState();

  useEffect(() => {
    setPoints(data.points);
  }, [data.points]);

  useEffect(() => {
    const index = 0;
    const point = points[index];
    setStartpoint(point);
  }, [points]);

  useEffect(() => {
    const index = points.length - 1;
    const point = (!data.polygon && points[index]) || null;
    setEndpoint(point);
  }, [data.polygon, points]);

  return { endpoint, startpoint };
};

export default useMarkerPoint;
