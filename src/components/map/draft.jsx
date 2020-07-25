import PropTypes from 'prop-types';
import React from 'react';
import { LayerGroup, Marker, Polyline } from 'react-leaflet';

import { DotIcon } from './markers';

const DraftComponent = ({ points }) => {
  return (
    <LayerGroup>
      <Polyline color="#800081" positions={points} />
      {points.map((obj, index) => {
        const isfirst = index === 0 && points.length >= 2;
        const islast = index === points.length - 1 && points.length >= 2;
        const props = {};
        if (isfirst || islast) {
          props.onClick = () => console.log('click click click');
        }
        return (
          <Marker
            key={`${obj.lat},${obj.lng}`}
            draggable
            icon={DotIcon}
            position={obj}
            {...props}
          />
        );
      })}
    </LayerGroup>
  );
};

DraftComponent.propTypes = {
  points: PropTypes.arrayOf(
    PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number,
    })
  ).isRequired,
};

export default DraftComponent;
