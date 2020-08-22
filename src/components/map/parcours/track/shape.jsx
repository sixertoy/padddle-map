import get from 'lodash.get';
import pick from 'lodash.pick';
import PropTypes from 'prop-types';
import React from 'react';
import { Polygon, Polyline } from 'react-leaflet';

import { PICKER_COLORS } from '../../../../constants';
import { InfosTooltip } from '../../tooltips';
import useParcours from './use-parcours';

const TrackComponent = React.memo(function TrackComponent({ data }) {
  const { editModeHandler, opacity, selectHandler, showTooltip } = useParcours(
    data
  );

  const { color, points, polygon } = pick(data, ['color', 'points', 'polygon']);
  const hex = get(PICKER_COLORS, color, '#000000');
  const LineComponent = (polygon && Polygon) || Polyline;

  return (
    <LineComponent
      bubblingMouseEvents={false}
      color={hex}
      fill={false}
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
};

export default TrackComponent;
