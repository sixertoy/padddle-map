import L from 'leaflet';

const distanceCalculation = points => {
  const distance = points
    .reduce((acc, latlng, index, list) => {
      const prev = list[index - 1] || latlng;
      const coords = latlng.distanceTo ? latlng : L.LatLng(latlng);
      const next = coords.distanceTo(prev);
      return [...acc, next];
    }, [])
    .reduce((acc, value) => acc + value, 0);
  return distance;
};

export default distanceCalculation;
