import get from 'lodash.get';
import pick from 'lodash.pick';
import PropTypes from 'prop-types';
import React from 'react';
import { LayerGroup, Marker } from 'react-leaflet';

import { PICKER_COLORS } from '../../../../constants';
import { DraggableMarker, PaddleMarker } from '../../icons';
import { InfosTooltip } from '../../tooltips';
import useParcours from './use-parcours';

const MarkersComponent = function MarkersComponent({ data }) {
  const { editModeHandler, opacity, selectHandler, showTooltip } = useParcours(
    data
  );

  const { color, points, polygon } = pick(data, ['color', 'points', 'polygon']);
  const hex = get(PICKER_COLORS, color, '#000000');
  const waypoints = [points[0]];
  if (polygon) {
    waypoints.push(points[points.length - 1]);
  }

  return (
    <LayerGroup>
      {waypoints.map((point, index) => {
        const { lat, lng } = point;
        const key = `${lat},${lng}`;
        const isLast = index > 0;
        const Icon = (isLast && DraggableMarker) || PaddleMarker;
        return (
          <Marker
            key={key}
            bubblingMouseEvents={false}
            icon={Icon(hex)}
            opacity={opacity}
            position={point}
            onClick={selectHandler}
            onDblclick={editModeHandler}>
            {showTooltip && <InfosTooltip data={data} />}
          </Marker>
        );
      })}
    </LayerGroup>
  );
};

MarkersComponent.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default MarkersComponent;
