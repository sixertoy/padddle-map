import PropTypes from 'prop-types';
import React from 'react';
import { LayerGroup, Marker } from 'react-leaflet';

import { DraggableMarker, TrackEndMarker, TrackStartMarker } from '../../icons';
import { EditTooltip } from '../../tooltips';
import useDraggable from './use-draggable';

const DraggableMarkersComponent = ({ dragHandler }) => {
  const { markers } = useDraggable();
  return (
    <LayerGroup>
      {markers.start && (
        <Marker
          draggable
          bubblingMouseEvents={false}
          icon={TrackStartMarker('#00FF00')}
          position={markers.start}
          onDrag={({ latlng }) => dragHandler(0, latlng)}
        />
      )}
      {markers.waypoints.map((point, index) => {
        return (
          <Marker
            key={`${point.lat},${point.lng}`}
            draggable
            bubblingMouseEvents={false}
            icon={DraggableMarker('#3388FF')}
            position={point}
            onDrag={({ latlng }) => dragHandler(index + 1, latlng)}>
            <EditTooltip remove />
          </Marker>
        );
      })}
      {markers.end && (
        <Marker
          draggable
          bubblingMouseEvents={false}
          icon={TrackEndMarker('#FF0000')}
          position={markers.end}
          onDrag={({ latlng }) => dragHandler(markers.length - 1, latlng)}
        />
      )}
    </LayerGroup>
  );
};

DraggableMarkersComponent.propTypes = {
  dragHandler: PropTypes.func.isRequired,
};

export default DraggableMarkersComponent;
