import PropTypes from 'prop-types';
import React from 'react';
import { LayerGroup, Polygon, Polyline } from 'react-leaflet';
import { useMediaQuery } from 'react-responsive';

import { InfosTooltip } from '../../tooltips';

const TrackComponent = ({ data, onClick, onDoubleClick, opacity }) => {
  const { color, points, polygon } = data;
  const isMobile = useMediaQuery({ query: '(max-width: 680px)' });
  return (
    <LayerGroup>
      {polygon && (
        <Polygon
          color={color}
          fill={color}
          opacity={opacity}
          positions={points}
          weight={3}
          onClick={onClick}
          onDblclick={onDoubleClick}>
          {!isMobile && <InfosTooltip data={data} />}
        </Polygon>
      )}
      {!polygon && (
        <Polyline
          color={color}
          opacity={opacity}
          positions={points}
          weight={5}
          onClick={onClick}
          onDblclick={onDoubleClick}>
          {!isMobile && <InfosTooltip data={data} />}
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
