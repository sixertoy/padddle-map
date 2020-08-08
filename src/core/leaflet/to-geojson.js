const toGeoJSON = points => {
  const geojson = {
    geometry: {
      coordinates: points.map(({ lat, lng }) => [lng, lat]),
      type: 'Polygon',
    },
    type: 'Feature',
  };
  return geojson;
};

export default toGeoJSON;
