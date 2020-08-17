import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Polygon, Polyline } from 'react-leaflet';

import { getPathPoints } from '../../../../helpers';
import Markers from './markers';

const DraggableComponent = ({ data: { color, points, polygon } }) => {
  const shape = useRef();
  const track = useRef();
  const [positions, setPositions] = useState(points);

  const dragHandler = useCallback(
    (dragIndex, coords) => {
      const ltrack = track.current.leafletElement;
      const latlngs = getPathPoints(ltrack.getLatLngs());
      const next = latlngs.map((latlng, index) => {
        if (index !== dragIndex) return latlng;
        return coords;
      });
      ltrack.setLatLngs(next);
      if (polygon) {
        const lshape = shape.current.leafletElement;
        lshape.setLatLngs(next);
      }
    },
    [polygon]
  );

  useEffect(() => {
    setPositions(points);
  }, [points]);

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
            positions={positions}
            stroke={false}
          />
          <Polygon
            ref={track}
            interactive
            bubblingMouseEvents={false}
            color={color}
            dashArray="5,10"
            fill={false}
            positions={positions}
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
          positions={positions}
          weight={5}
        />
      )}
      <Markers dragHandler={dragHandler} />
    </React.Fragment>
  );
};

DraggableComponent.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default DraggableComponent;
