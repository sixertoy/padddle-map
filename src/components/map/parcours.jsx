import PropTypes from 'prop-types';
import React, { useCallback, useRef, useState } from 'react';
import { LayerGroup, Marker, Polygon, Polyline } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';

import { noop, rgba } from '../../core';
import { updateParcours } from '../../redux/actions';
import { DotMarker, HiddenMarker, StartMarker } from './markers';
import Popup from './popup';

const ParcoursComponent = ({ data, opacity }) => {
  const polygon = useRef();
  const dispatch = useDispatch();
  const user = useSelector(_ => _.user);
  const editmode = useSelector(_ => _.editmode);
  const [editable, setEditable] = useState(false);

  const clickHandler = useCallback(() => {
    setEditable(!editable);
  }, [editable]);

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
    const [points] = elt.getLatLngs();
    const next = points.map(({ lat, lng }) => ({ lat, lng }));
    dispatch(updateParcours({ ...data, points: next }));
  }, [data, dispatch]);

  const [startpoint, ...waypoints] = data.points;
  const isowner = data.user === user.uid;

  return (
    <LayerGroup>
      <React.Fragment>
        {(data.polygon && (
          <Polygon
            ref={polygon}
            color={rgba(data.color, opacity)}
            fill={rgba(data.color, opacity)}
            interactive={!editmode}
            positions={data.points}
            onClick={isowner ? clickHandler : noop}
          />
        )) || (
          <Polyline
            ref={polygon}
            color={rgba(data.color, opacity)}
            interactive={!editmode}
            positions={data.points}
            onClick={isowner ? clickHandler : noop}
          />
        )}
      </React.Fragment>
      <LayerGroup>
        {startpoint && (
          <Marker
            key={`${startpoint.lat},${startpoint.lng}`}
            draggable={editable}
            icon={StartMarker(data.color)}
            position={startpoint}
            onClick={isowner ? clickHandler : noop}
            onDrag={({ latlng }) => dragHandler(0, latlng)}
            onDragEnd={dragendHandler}>
            <Popup data={data} />
          </Marker>
        )}
        {waypoints &&
          waypoints.map((obj, index) => {
            const Icon = editable ? DotMarker : HiddenMarker;
            return (
              <Marker
                key={`${obj.lat},${obj.lng}`}
                draggable={editable}
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
