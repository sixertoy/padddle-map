import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { Polygon, Polyline } from 'react-leaflet';

import { EditTooltip } from '../../tooltips';
import Markers from './markers';
import useMarkerCreator from './use-marker-creator';

const DraggableComponent = ({ data: { points, polygon } }) => {
  const shape = useRef();
  const track = useRef();
  const { addHandler } = useMarkerCreator(track);
  return (
    <React.Fragment>
      {(polygon && (
        <React.Fragment>
          <Polygon
            ref={shape}
            interactive
            bubblingMouseEvents={false}
            positions={points}
            stroke={false}
          />
          <Polygon
            ref={track}
            interactive
            bubblingMouseEvents={false}
            fill={false}
            lineCap="butt"
            lineJoin="miter"
            positions={points}
            weight={3}
            onClick={addHandler}>
            <EditTooltip />
          </Polygon>
        </React.Fragment>
      )) || (
        <Polyline
          ref={track}
          interactive
          bubblingMouseEvents={false}
          fill={false}
          lineCap="butt"
          lineJoin="miter"
          positions={points}
          weight={3}
          onClick={addHandler}>
          <EditTooltip />
        </Polyline>
      )}
      <Markers refs={{ shape, track }} />
    </React.Fragment>
  );
};

DraggableComponent.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default DraggableComponent;
