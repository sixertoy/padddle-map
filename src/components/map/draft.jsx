import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { LayerGroup, Marker, Polygon, Polyline } from 'react-leaflet';
import { useDispatch } from 'react-redux';

import { commitDraft } from '../../redux/actions';
import { DotIcon } from './markers';

const DraftComponent = ({ data }) => {
  const dispatch = useDispatch();

  const hasPoints = data.points && data.points.length >= 1;
  const [firstMarker] = (hasPoints && data.points.slice(0, 1)) || null;
  const others = (hasPoints && data.points.slice(1)) || [];

  const onFirstClick = useCallback(() => {
    dispatch(commitDraft({ ...data, polygon: true }));
  }, [data, dispatch]);

  return (
    <LayerGroup>
      {(data.polygon && (
        <Polygon color="#800081" positions={data.points} />
      )) || <Polyline color="#800081" positions={data.points} />}
      <LayerGroup>
        {firstMarker && (
          <Marker
            key={`${firstMarker.lat},${firstMarker.lng}`}
            draggable
            icon={DotIcon}
            position={firstMarker}
            onClick={onFirstClick}
          />
        )}
        {others.map(obj => (
          <Marker
            key={`${obj.lat},${obj.lng}`}
            draggable
            icon={DotIcon}
            position={obj}
          />
        ))}
      </LayerGroup>
    </LayerGroup>
  );
};

DraftComponent.propTypes = {
  data: PropTypes.shape({
    points: PropTypes.arrayOf(
      PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number,
      })
    ),
    polygon: PropTypes.bool,
  }).isRequired,
};

export default DraftComponent;
