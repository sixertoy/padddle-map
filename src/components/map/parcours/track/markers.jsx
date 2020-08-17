import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { LayerGroup, Marker } from 'react-leaflet';

import { DraggableMarker, PaddleMarker } from '../../icons';

const MarkersComponent = ({ clickHandler, data, dbClickHandler, opacity }) => {
  const { color, points, polygon } = data;

  const [endpoint, setEndpoint] = useState(null);
  const [startpoint, setStartpoint] = useState(null);

  useEffect(() => {
    const index = 0;
    const point = points[index];
    setStartpoint(point);
  }, [points]);

  useEffect(() => {
    const index = points.length - 1;
    const point = (!polygon && points[index]) || null;
    setEndpoint(point);
  }, [polygon, points]);

  return (
    <LayerGroup>
      {startpoint && (
        <Marker
          bubblingMouseEvents={false}
          icon={PaddleMarker(color)}
          opacity={opacity}
          position={startpoint}
          onClick={clickHandler}
          onDblclick={dbClickHandler}
        />
      )}
      {endpoint && (
        <Marker
          bubblingMouseEvents={false}
          icon={DraggableMarker(color)}
          opacity={opacity}
          position={endpoint}
          onClick={clickHandler}
          onDblclick={dbClickHandler}
        />
      )}
    </LayerGroup>
  );
};

MarkersComponent.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  data: PropTypes.shape().isRequired,
  dbClickHandler: PropTypes.func.isRequired,
  opacity: PropTypes.number.isRequired,
};

export default MarkersComponent;
