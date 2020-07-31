import Leaflet from 'leaflet';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

const DotIcon = ({ color, size }) => {
  return (
    <div className="leaflet-marker-divicon-container">
      <div className="leaflet-marker-divicon-inner">
        <div
          className="leaflet-dotmarker"
          style={{
            background: color,
            borderRadius: '50%',
            height: size,
            width: size,
          }}
        />
      </div>
    </div>
  );
};

DotIcon.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};

export default (color, size = 12) =>
  Leaflet.divIcon({
    className: 'leaflet-dotmarker',
    html: ReactDOMServer.renderToString(<DotIcon color={color} size={size} />),
  });
