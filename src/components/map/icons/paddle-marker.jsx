import Leaflet from 'leaflet';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import { ReactComponent as SVG } from '../../../assets/marker.svg';

const PaddleMarkerIcon = ({ color }) => {
  return (
    <div
      style={{
        marginLeft: -12,
        marginTop: -32,
        position: 'absolute',
      }}>
      <SVG style={{ color, height: 24, width: 24 }} />
    </div>
  );
};

PaddleMarkerIcon.propTypes = {
  color: PropTypes.string.isRequired,
};

const StartMarker = color => {
  return Leaflet.divIcon({
    className: 'leaflet-div-icon',
    html: ReactDOMServer.renderToString(<PaddleMarkerIcon color={color} />),
  });
};

export default StartMarker;
