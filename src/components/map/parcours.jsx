import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import { LayerGroup, Marker, Polygon, Polyline } from 'react-leaflet';
import { useSelector } from 'react-redux';

import { rgba } from '../../core';
import { DotIcon, StartPositionIcon } from './markers';
import Popup from './popup';

const ParcoursComponent = ({ data, opacity }) => {
  const editmode = useSelector(_ => _.editmode);
  const [dragging, setDragging] = useState(false);
  const [visible, setVisibility] = useState(false);

  const clickHandler = useCallback(() => {
    setVisibility(!visible);
  }, [visible]);

  const onMoveStart = useCallback(() => {
    setDragging(true);
  }, []);

  const onMoveEnd = useCallback(() => {
    setDragging(false);
  }, []);

  const markers = data.points.slice(1);
  const [firstMarker] = data.points.slice(0, 1);

  return (
    <LayerGroup>
      {!dragging && (
        <React.Fragment>
          {(data.polygon && (
            <Polygon
              color={rgba(data.color, opacity)}
              fill={rgba(data.color, opacity)}
              interactive={!editmode}
              positions={data.points}>
              <Popup data={data} />
            </Polygon>
          )) || (
            <Polyline
              color={rgba(data.color, opacity)}
              interactive={!editmode}
              positions={data.points}>
              <Popup data={data} />
            </Polyline>
          )}
        </React.Fragment>
      )}
      <LayerGroup>
        <Marker
          key={`${firstMarker.lat},${firstMarker.lng}`}
          draggable={false}
          icon={StartPositionIcon}
          position={firstMarker}
          onClick={clickHandler}
          onMoveEnd={onMoveEnd}
          onMoveStart={onMoveStart}
        />
        {visible &&
          markers.map(obj => (
            <Marker
              key={`${obj.lat},${obj.lng}`}
              draggable={false}
              icon={DotIcon}
              position={obj}
              onClick={() => {}}
              onMoveEnd={onMoveEnd}
              onMoveStart={onMoveStart}
            />
          ))}
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
