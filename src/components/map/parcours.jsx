import PropTypes from 'prop-types';
import React, { useCallback, useRef } from 'react';
import { LayerGroup, Marker, Polygon, Polyline } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';

import { noop, rgba } from '../../core';
import { closePopup, openPopup, updateParcours } from '../../redux/actions';
import { DotMarker, HiddenMarker, StartMarker } from './markers';

const ParcoursComponent = ({ data, opacity }) => {
  const polygon = useRef();
  const dispatch = useDispatch();
  const user = useSelector(_ => _.user);
  const selected = useSelector(_ => _.selected);

  const [startpoint, ...waypoints] = data.points;
  const isowner = data.user === user.uid;
  const isselected = selected === data.id;

  const clickHandler = useCallback(() => {
    if (isselected) dispatch(closePopup());
    if (!isselected) dispatch(openPopup(data));
  }, [data, dispatch, isselected]);

  const dragHandler = useCallback(
    (index, latlng) => {
      const points = data.points.map((obj, i) => {
        if (index !== i) return obj;
        return latlng;
      });
      const elt = polygon.current.leafletElement;
      elt.setLatLngs(points);
    },
    [data.points]
  );

  const dragendHandler = useCallback(() => {
    const elt = polygon.current.leafletElement;
    let points = elt.getLatLngs();
    if (data.polygon) [points] = points;
    const next = points.map(({ lat, lng }) => ({ lat, lng }));
    dispatch(updateParcours({ ...data, points: next }));
  }, [data, dispatch]);

  return (
    <LayerGroup>
      <React.Fragment>
        {(data.polygon && (
          <Polygon
            ref={polygon}
            interactive
            color={rgba(data.color, opacity)}
            fill={rgba(data.color, opacity)}
            positions={data.points}
            onClick={isowner ? clickHandler : noop}
          />
        )) || (
          <Polyline
            ref={polygon}
            interactive
            color={rgba(data.color, opacity)}
            positions={data.points}
            onClick={isowner ? clickHandler : noop}
          />
        )}
      </React.Fragment>
      <LayerGroup>
        {startpoint && (
          <Marker
            key={`${startpoint.lat},${startpoint.lng}`}
            draggable={isselected}
            icon={StartMarker(data.color)}
            position={startpoint}
            onClick={isowner ? clickHandler : noop}
            onDrag={({ latlng }) => dragHandler(0, latlng)}
            onDragEnd={dragendHandler}
          />
        )}
        {waypoints &&
          waypoints.map((obj, index) => {
            const Icon = isselected ? DotMarker : HiddenMarker;
            return (
              <Marker
                key={`${obj.lat},${obj.lng}`}
                draggable={isselected}
                icon={Icon(data.color)}
                position={obj}
                onClick={isowner ? clickHandler : noop}
                onDrag={({ latlng }) => dragHandler(index + 1, latlng)}
                onDragEnd={dragendHandler}
              />
            );
          })}
      </LayerGroup>
    </LayerGroup>
  );
};

ParcoursComponent.propTypes = {
  data: PropTypes.shape({
    color: PropTypes.string,
    distance: PropTypes.number,
    id: PropTypes.string,
    name: PropTypes.string,
    points: PropTypes.arrayOf(PropTypes.shape()),
    polygon: PropTypes.bool,
    user: PropTypes.string,
  }).isRequired,
  opacity: PropTypes.number.isRequired,
};

export default ParcoursComponent;
