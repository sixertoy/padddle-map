import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { LayerGroup, Marker, Polygon, Polyline } from 'react-leaflet';
import { useSelector } from 'react-redux';

import { rgba } from '../../core';
// import { updateParcours } from '../../redux/actions';
import { DotMarker, HiddenMarker, StartMarker } from './markers';
import Popup from './popup';

const ParcoursComponent = ({ data, opacity }) => {
  // const dispatch = useDispatch();
  const editmode = useSelector(_ => _.editmode);
  console.log('editmode', editmode);
  // const [dragging, setDragging] = useState(false);
  // const [visible, setVisibility] = useState(false);

  const clickHandler = useCallback(() => {
    // setVisibility(!visible);
  }, []);

  const dragstartHandler = useCallback(() => {
    // setDragging(true);
  }, []);

  const dragHandler = useCallback(() => {
    // const points = data.points.map((obj, i) => (index !== i ? obj : latlng));
    // const next = { ...data, points };
    // dispatch(updateParcours(next));
  }, []);

  const dragendHandler = useCallback(() => {
    // setDragging(false);
  }, []);

  const [startpoint, ...waypoints] = data.points;

  return (
    <LayerGroup>
      <React.Fragment>
        {(data.polygon && (
          <Polygon
            color={rgba(data.color, opacity)}
            fill={rgba(data.color, opacity)}
            interactive={!editmode}
            positions={data.points}
            weight={1}>
            <Popup data={data} />
          </Polygon>
        )) || (
          <Polyline
            color={rgba(data.color, opacity)}
            interactive={!editmode}
            positions={data.points}
            weight={1}>
            <Popup data={data} />
          </Polyline>
        )}
      </React.Fragment>
      <LayerGroup>
        {startpoint && (
          <Marker
            key={`${startpoint.lat},${startpoint.lng}`}
            draggable={editmode}
            icon={StartMarker(data.color)}
            position={startpoint}
            onClick={clickHandler}
            onDrag={({ latlng }) => dragHandler(0, latlng)}
            onDragEnd={dragendHandler}
            onDragStart={dragstartHandler}>
            <Popup data={data} />
          </Marker>
        )}
        {waypoints &&
          waypoints.map((obj, index) => {
            const Icon = editmode ? DotMarker : HiddenMarker;
            return (
              <Marker
                key={`${obj.lat},${obj.lng}`}
                draggable={editmode}
                icon={Icon(data.color)}
                position={obj}
                onClick={clickHandler}
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
  }).isRequired,
  opacity: PropTypes.number.isRequired,
};

export default ParcoursComponent;
