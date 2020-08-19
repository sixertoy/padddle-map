import pick from 'lodash.pick';
import PropTypes from 'prop-types';
import React from 'react';
import { Polygon, Polyline } from 'react-leaflet';
import { useMediaQuery } from 'react-responsive';

import { InfosTooltip } from '../../tooltips';
import useParcours from './use-parcours';

const TrackComponent = function TrackComponent({ data }) {
  const { color, points, polygon } = pick(data, ['color', 'points', 'polygon']);
  const { editModeHandler, opacity, selectHandler } = useParcours(data);
  const isMobile = useMediaQuery({ query: '(max-width: 680px)' });
  const LineComponent = (polygon && Polygon) || Polyline;
  const fill = (polygon && color) || false;
  return (
    <LineComponent
      bubblingMouseEvents={false}
      color={color}
      fill={fill}
      opacity={opacity}
      positions={points}
      weight={3}
      onClick={selectHandler}
      onDblclick={editModeHandler}>
      {!isMobile && <InfosTooltip data={data} />}
    </LineComponent>
  );
};

TrackComponent.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default TrackComponent;
