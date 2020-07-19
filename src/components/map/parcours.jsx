import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { LayerGroup, Polygon, Polyline } from 'react-leaflet';
import { useSelector } from 'react-redux';

import { rgba } from '../../core';
import { selectEditMode } from '../../redux/selectors';

const ParcoursComponent = ({ data, opacity }) => {
  const editmode = useSelector(selectEditMode);

  const onClick = useCallback(() => {
    console.log('onpolygonclick');
  }, []);

  return (
    <LayerGroup>
      {data.polygon && (
        <Polygon
          color={rgba('#D94865', opacity)}
          fill={rgba('#5142A4', opacity)}
          interactive={!editmode}
          positions={data.points}
          onClick={onClick}
        />
      )}
      {!data.polygon && (
        <Polyline
          color={rgba('#D94865', opacity)}
          interactive={!editmode}
          positions={data.points}
          onClick={onClick}
        />
      )}
    </LayerGroup>
  );
};

ParcoursComponent.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    points: PropTypes.arrayOf(PropTypes.shape()),
    polygon: PropTypes.bool,
  }).isRequired,
  opacity: PropTypes.number.isRequired,
};

export default ParcoursComponent;
