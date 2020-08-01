import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import { LayerGroup, Marker, Polygon, Polyline } from 'react-leaflet';
import { useSelector } from 'react-redux';

import { noop, rgba } from '../../core';
// import { updateParcours } from '../../redux/actions';
import { DotMarker, HiddenMarker, StartMarker } from './markers';
import Popup from './popup';

const ParcoursComponent = ({ data, opacity }) => {
  // const dispatch = useDispatch();
  const user = useSelector(_ => _.user);
  const editmode = useSelector(_ => _.editmode);
  const [editable, setEditable] = useState(false);
  // const [points, setPoints] = useState(data.points);
  // const [dragging, setDragging] = useState(false);
  // const [visible, setVisibility] = useState(false);

  const clickHandler = useCallback(() => {
    setEditable(!editable);
  }, [editable]);

  const dragstartHandler = useCallback(() => {
    // setDragging(true);
  }, []);

  const dragHandler = useCallback(() => {
    // const points = data.points.map((obj, i) => (index !== i ? obj : latlng));
    // const next = { ...data, points };
  }, []);

  const dragendHandler = useCallback(() => {
    // setDragging(false);
    // dispatch(updateParcours(next));
  }, []);

  const [startpoint, ...waypoints] = data.points;
  const isowner = data.user === user.uid;

  return (
    <LayerGroup>
      <React.Fragment>
        {(data.polygon && (
          <Polygon
            color={rgba(data.color, opacity)}
            fill={rgba(data.color, opacity)}
            interactive={!editmode}
            positions={data.points}
            weight={1}
            onClick={isowner ? clickHandler : noop}
          />
        )) || (
          <Polyline
            color={rgba(data.color, opacity)}
            interactive={!editmode}
            positions={data.points}
            weight={1}
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
            onDragEnd={dragendHandler}
            onDragStart={dragstartHandler}>
            <Popup data={data} />
          </Marker>
        )}
        {waypoints &&
          waypoints.map((obj, index) => {
            const Icon = editable ? DotMarker : HiddenMarker;
            return (
              <Marker
                key={`${obj.lat},${obj.lng}`}
                draggable={editmode}
                icon={Icon(data.color)}
                position={obj}
                onClick={isowner ? clickHandler : noop}
                onDrag={({ latlng }) => dragHandler(index + 1, latlng)}
                onDragEnd={dragendHandler}
                onDragStart={dragstartHandler}
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
