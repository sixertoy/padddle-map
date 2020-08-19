import pick from 'lodash.pick';
import PropTypes from 'prop-types';
import React from 'react';
import { Polygon, Polyline } from 'react-leaflet';

import { InfosTooltip } from '../../tooltips';
import useParcours from './use-parcours';

const TrackComponent = React.memo(function TrackComponent({
  data,
  isMobile,
  selected,
}) {
  const { editModeHandler, opacity, selectHandler } = useParcours(data);

  const { color, points, polygon } = pick(data, ['color', 'points', 'polygon']);
  const fill = (polygon && color) || false;
  const LineComponent = (polygon && Polygon) || Polyline;
  const isselected = data.id === selected;
  const showTooltip = !isMobile && !isselected;

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
      {showTooltip && <InfosTooltip data={data} />}
    </LineComponent>
  );
});

TrackComponent.propTypes = {
  data: PropTypes.shape().isRequired,
  isMobile: PropTypes.bool.isRequired,
  selected: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
};

export default TrackComponent;
