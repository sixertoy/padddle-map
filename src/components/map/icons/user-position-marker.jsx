import Leaflet from 'leaflet';

export default Leaflet.divIcon({
  className: 'leaflet-marker-divicon',
  html: `<div className="leaflet-marker-divicon-container" style="top: -10%">
    <div className="leaflet-marker-divicon-inner">
      <div className="leaflet-pinmarker" />
      <div className="leaflet-pulsemarker" />
    </div>
  </div>`,
});
