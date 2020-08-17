import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { Polygon, Polyline } from 'react-leaflet';

import Markers from './markers';

const DraggableComponent = ({ data: { color, points, polygon } }) => {
  const shape = useRef();
  const track = useRef();
  return (
    <React.Fragment>
      {(polygon && (
        <React.Fragment>
          <Polygon
            ref={shape}
            interactive
            bubblingMouseEvents={false}
            color={color}
            fill={color}
            positions={points}
            stroke={false}
          />
          <Polygon
            ref={track}
            interactive
            bubblingMouseEvents={false}
            color={color}
            dashArray="5,10"
            fill={false}
            positions={points}
            weight={5}
          />
        </React.Fragment>
      )) || (
        <Polyline
          ref={track}
          interactive
          bubblingMouseEvents={false}
          color={color}
          dashArray="5,10"
          fill={false}
          positions={points}
          weight={5}
        />
      )}
      <Markers refs={{ shape, track }} />
    </React.Fragment>
  );
};

DraggableComponent.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default DraggableComponent;
