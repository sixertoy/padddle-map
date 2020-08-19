import pick from 'lodash.pick';
import PropTypes from 'prop-types';
import React from 'react';
import { LayerGroup, Marker } from 'react-leaflet';

import { DraggableMarker, PaddleMarker } from '../../icons';
import useParcours from './use-parcours';

const MarkersComponent = function MarkersComponent({ data }) {
  const { color, points, polygon } = pick(data, ['color', 'points', 'polygon']);
  const { editModeHandler, opacity, selectHandler } = useParcours(data);

  const waypoints = {
    end: (!polygon && points[points.length - 1]) || null,
    start: points[0],
  };

  return (
    <LayerGroup>
      {waypoints.start && (
        <Marker
          bubblingMouseEvents={false}
          icon={PaddleMarker(color)}
          opacity={opacity}
          position={waypoints.start}
          onClick={selectHandler}
          onDblclick={editModeHandler}
        />
      )}
      {waypoints.end && (
        <Marker
          bubblingMouseEvents={false}
          icon={DraggableMarker(color)}
          opacity={opacity}
          position={waypoints.end}
          onClick={selectHandler}
          onDblclick={editModeHandler}
        />
      )}
    </LayerGroup>
  );
};

MarkersComponent.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default MarkersComponent;
