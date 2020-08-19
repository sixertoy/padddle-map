import pick from 'lodash.pick';
import PropTypes from 'prop-types';
import React from 'react';
import { Polygon, Polyline } from 'react-leaflet';
import { useMediaQuery } from 'react-responsive';

import { InfosTooltip } from '../../tooltips';

const TrackComponent = ({ data, onClick, onDoubleClick, opacity }) => {
  const { color, points, polygon } = pick(data, ['color', 'points', 'polygon']);
  const isMobile = useMediaQuery({ query: '(max-width: 680px)' });
  const LineComponent = (polygon && Polygon) || Polyline;
  const fill = (polygon && color) || false;
  return (
    <LineComponent
      color={color}
      fill={fill}
      opacity={opacity}
      positions={points}
      weight={3}
      onClick={onClick}
      onDblclick={onDoubleClick}>
      {!isMobile && <InfosTooltip data={data} />}
    </LineComponent>
  );
};

TrackComponent.propTypes = {
  data: PropTypes.shape().isRequired,
  onClick: PropTypes.func.isRequired,
  onDoubleClick: PropTypes.func.isRequired,
  opacity: PropTypes.number.isRequired,
};

export default TrackComponent;
