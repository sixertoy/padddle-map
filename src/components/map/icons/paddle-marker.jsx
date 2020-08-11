import Leaflet from 'leaflet';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import { ReactComponent as SVG } from '../../../assets/pin-paddle.svg';

const PaddleMarkerIcon = React.memo(({ color }) => {
  return (
    <div
      style={{
        marginLeft: -9,
        marginTop: -26,
        position: 'absolute',
      }}>
      <SVG style={{ color, height: 28, width: 28 }} />
    </div>
  );
});

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
