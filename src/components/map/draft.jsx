import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { LayerGroup, Marker, Polyline } from 'react-leaflet';
import { useDispatch } from 'react-redux';

import { noop } from '../../core';
import { commitDraft } from '../../redux/actions';
import { DotMarker } from './icons';

const DraftComponent = ({ data }) => {
  const dispatch = useDispatch();

  const firstClickHandler = useCallback(() => {
    const canCommitPolygon = data.points.length >= 3;
    if (!canCommitPolygon) return;
    dispatch(commitDraft({ ...data, polygon: true }));
  }, [data, dispatch]);

  const hasPoints = data.points && data.points.length >= 1;

  return (
    <LayerGroup>
      <Polyline color={data.color} positions={data.points} />
      <LayerGroup>
        {hasPoints &&
          data.points.map((obj, index) => (
            <Marker
              key={`${obj.lat},${obj.lng}`}
              draggable
              icon={DotMarker(data.color)}
              position={obj}
              onClick={index === 0 ? firstClickHandler : noop}
            />
          ))}
      </LayerGroup>
    </LayerGroup>
  );
};

DraftComponent.propTypes = {
  data: PropTypes.shape({
    color: PropTypes.string,
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
