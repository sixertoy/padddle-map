import Leaflet from 'leaflet';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import { ReactComponent as SVG } from '../../../assets/pin-marker.svg';

const TrackStartMarkerIcon = React.memo(({ color }) => {
  return (
    <div
      style={{
        marginLeft: -7,
        marginTop: -20,
        position: 'absolute',
      }}>
      <SVG style={{ color, height: 24, width: 24 }} />
    </div>
  );
});

TrackStartMarkerIcon.propTypes = {
  color: PropTypes.string.isRequired,
};

const PinMarker = color => {
  return Leaflet.divIcon({
    className: 'leaflet-div-icon',
    html: ReactDOMServer.renderToString(<TrackStartMarkerIcon color={color} />),
  });
};

export default PinMarker;
