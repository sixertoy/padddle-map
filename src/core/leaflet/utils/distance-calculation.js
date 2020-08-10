import L from 'leaflet';

const distanceCalculation = (points, polygon) => {
  const coords = polygon ? [...points, points[0]] : points;
  const distance = coords
    .reduce((acc, latlng, index, list) => {
      const prev = list[index - 1] || latlng;
      const start = latlng.distanceTo ? latlng : L.latLng(latlng);
      const next = start.distanceTo(prev);
      return [...acc, next];
    }, [])
    .reduce((acc, value) => acc + value, 0);
  return distance;
};

export default distanceCalculation;
