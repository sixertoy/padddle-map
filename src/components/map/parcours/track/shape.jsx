import PropTypes from 'prop-types';
import React from 'react';
import { LayerGroup, Polygon, Polyline } from 'react-leaflet';

import { InfosTooltip } from '../../tooltips';

const TrackComponent = ({ data, onClick, onDoubleClick, opacity }) => {
  const { color, points, polygon } = data;
  return (
    <LayerGroup>
      {polygon && (
        <Polygon
          interactive
          bubblingMouseEvents={false}
          color={color}
          fill={color}
          opacity={opacity}
          positions={points}
          weight={3}
          onClick={onClick}
          onDblclick={onDoubleClick}>
          <InfosTooltip data={data} />
        </Polygon>
      )}
      {!polygon && (
        <Polyline
          interactive
          bubblingMouseEvents={false}
          color={color}
          opacity={opacity}
          positions={points}
          weight={5}
          onClick={onClick}
          onDblclick={onDoubleClick}>
          <InfosTooltip data={data} />
        </Polyline>
      )}
    </LayerGroup>
  );
};

TrackComponent.propTypes = {
  data: PropTypes.shape().isRequired,
  onClick: PropTypes.func.isRequired,
  onDoubleClick: PropTypes.func.isRequired,
  opacity: PropTypes.number.isRequired,
};

export default TrackComponent;
