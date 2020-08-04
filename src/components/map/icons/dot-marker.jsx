import Leaflet from 'leaflet';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

const Icon = ({ color }) => (
  <div
    style={{
      background: color,
      borderRadius: 3,
      height: 12,
      width: 12,
    }}
  />
);

Icon.propTypes = {
  color: PropTypes.string.isRequired,
};

export default color =>
  Leaflet.divIcon({
    className: 'leaflet-div-icon',
    html: ReactDOMServer.renderToString(<Icon color={color} />),
  });
