import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { Polygon, Polyline } from 'react-leaflet';
import { useMediaQuery } from 'react-responsive';

import Markers from './markers';
import useAddable from './use-addable';

const DraggableComponent = ({ data: { points, polygon } }) => {
  const track = useRef();
  const foreground = useRef();
  const background = useRef();
  const isMobile = useMediaQuery({ query: '(max-width: 680px)' });
  const addHandler = useAddable({ track });
  const LineComponent = polygon ? Polygon : Polyline;
  return (
    <React.Fragment>
      {polygon && (
        <Polygon
          ref={background}
          bubblingMouseEvents={false}
          fill="#3388FF"
          intereactive={false}
          positions={points}
          stroke={false}
        />
      )}
      <LineComponent
        ref={track}
        bubblingMouseEvents={false}
        color="#3388FF"
        dashArray="5,10"
        fill={false}
        interactive={false}
        lineCap="butt"
        lineJoin="round"
        positions={points}
        weight={3}
      />
      <LineComponent
        ref={foreground}
        bubblingMouseEvents={false}
        color="#3388FF"
        fill={false}
        lineCap="butt"
        lineJoin="round"
        opacity={0.05}
        positions={points}
        weight={isMobile ? 30 : 5}
        onClick={addHandler}
      />
      <Markers refs={{ background, foreground, track }} />
    </React.Fragment>
  );
};

DraggableComponent.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default DraggableComponent;
