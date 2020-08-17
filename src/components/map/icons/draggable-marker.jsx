import Leaflet from 'leaflet';

export default color =>
  Leaflet.divIcon({
    className: 'leaflet-div-icon',
    html: `<div style="background: ${color}; border-radius: 3px; height: 14px; width: 14px;"/>`,
  });
