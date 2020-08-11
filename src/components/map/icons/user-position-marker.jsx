import Leaflet from 'leaflet';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

const UserPositionMarkerIcon = React.memo(() => (
  <div className="leaflet-marker-divicon-container" style={{ top: '-10%' }}>
    <div className="leaflet-marker-divicon-inner">
      <div className="leaflet-pinmarker" />
      <div className="leaflet-pulsemarker" />
    </div>
  </div>
));

const UserMarker = Leaflet.divIcon({
  className: 'leaflet-marker-divicon',
  html: ReactDOMServer.renderToString(<UserPositionMarkerIcon />),
});

export default UserMarker;
