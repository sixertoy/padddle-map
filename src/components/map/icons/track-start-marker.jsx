import Leaflet from 'leaflet';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import { ReactComponent as SVG } from '../../../assets/pin.svg';

const TrackStartMarkerIcon = ({ color }) => {
  return (
    <div
      style={{
        marginLeft: -12,
        marginTop: -24,
        position: 'absolute',
      }}>
      <SVG style={{ color, height: 32, width: 32 }} />
    </div>
  );
};

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
