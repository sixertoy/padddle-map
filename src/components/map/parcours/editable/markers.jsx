import PropTypes from 'prop-types';
import React from 'react';
// import React, { useCallback, useState } from 'react';
import { LayerGroup, Marker } from 'react-leaflet';

import { DraggableMarker, TrackEndMarker, TrackStartMarker } from '../../icons';
// import { EditTooltip } from '../../tooltips';
import useDraggable from './use-draggable';
import useRemovable from './use-removable';

const DraggableMarkersComponent = ({ refs }) => {
  // const [isDragging, setIsDragging] = useState(false);
  const {
    dragEndHandler,
    dragHandler,
    markers,
    togglePolygonShape,
  } = useDraggable(refs);
  const removeHandler = useRemovable(refs);

  // const mouseUpHandler = useCallback(() => {
  //   setIsDragging(false);
  // }, []);
  //
  // const mouseDownHandler = useCallback(() => {
  //   setIsDragging(true);
  // }, []);

  return (
    <LayerGroup>
      {markers.start && (
        <Marker
          draggable
          icon={TrackStartMarker('#00FF00')}
          position={markers.start}
          onDblClick={togglePolygonShape}
          onDrag={dragHandler(0)}
          onDragEnd={dragEndHandler}
        />
      )}
      <LayerGroup>
        {markers.waypoints.map((point, index) => {
          const key = `${point.lat},${point.lng}`;
          return (
            <Marker
              key={key}
              draggable
              icon={DraggableMarker('#3388FF')}
              position={point}
              onClick={removeHandler(index + 1)}
              onDrag={dragHandler(index + 1)}
              onDragEnd={dragEndHandler}>
              {/* {!isDragging && <EditTooltip remove />} */}
            </Marker>
          );
        })}
      </LayerGroup>
      {markers.end && (
        <Marker
          draggable
          icon={TrackEndMarker('#FF0000')}
          position={markers.end}
          onDrag={dragHandler(markers.length - 1)}
          onDragEnd={dragEndHandler}
        />
      )}
    </LayerGroup>
  );
};

DraggableMarkersComponent.propTypes = {
  refs: PropTypes.shape({ shape: PropTypes.shape(), track: PropTypes.shape() })
    .isRequired,
};

export default DraggableMarkersComponent;
