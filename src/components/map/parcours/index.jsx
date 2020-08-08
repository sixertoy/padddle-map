import PropTypes from 'prop-types';
import React, { useCallback, useRef } from 'react';
import { LayerGroup, Marker, Polygon, Polyline } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';

import { rgba } from '../../../core';
import { FirebaseAuthConsumer } from '../../../core/firebase';
import { isOwner } from '../../../helpers';
import { closePopup, openPopup, updateParcours } from '../../../redux/actions';
import { selectParcours } from '../../../redux/selectors';
import { DotMarker, PinMarker, StartMarker } from '../icons';
import Tooltip from './tooltip';

const ParcoursComponent = ({ data }) => {
  const polygon = useRef();
  const dispatch = useDispatch();

  const selected = useSelector(selectParcours);
  const createmode = useSelector(_ => _.createmode);

  const [startpoint, ...waypoints] = data.points;
  const isselected = selected && selected.id === data.id;
  const showmarker = !selected || isselected;

  const clickHandler = useCallback(
    evt => {
      evt.originalEvent.preventDefault();
      evt.originalEvent.stopPropagation();
      if (createmode) return;
      if (isselected) dispatch(closePopup());
      if (!isselected) dispatch(openPopup(data.id));
    },
    [createmode, data.id, dispatch, isselected]
  );

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
    // @NOTE Leaflet.Polygon renvoi un array imbriqué
    if (data.polygon) [points] = points;
    dispatch(updateParcours({ ...data, points }));
  }, [data, dispatch]);

  return (
    <FirebaseAuthConsumer>
      {({ user }) => {
        const isowner = isOwner(selected, user);
        const opacity = selected && !isselected ? 0.45 : 1;
        const color = rgba(data.color, opacity);
        return (
          <LayerGroup>
            <React.Fragment>
              {(data.polygon && (
                <Polygon
                  ref={polygon}
                  interactive
                  bubblingMouseEvents={false}
                  color={color}
                  fill={color}
                  positions={data.points}
                  onClick={clickHandler}>
                  {!createmode && <Tooltip data={data} />}
                </Polygon>
              )) || (
                <Polyline
                  ref={polygon}
                  interactive
                  bubblingMouseEvents={false}
                  color={color}
                  positions={data.points}
                  onClick={clickHandler}>
                  {!createmode && <Tooltip data={data} />}
                </Polyline>
              )}
            </React.Fragment>
            <LayerGroup>
              {!createmode && showmarker && (
                <Marker
                  key={`${startpoint.lat},${startpoint.lng}`}
                  bubblingMouseEvents={false}
                  disabled={isowner}
                  draggable={isowner}
                  icon={
                    (isselected && PinMarker(data.color)) ||
                    StartMarker(data.color)
                  }
                  position={startpoint}
                  onClick={clickHandler}
                  onDrag={({ latlng }) => dragHandler(0, latlng)}
                  onDragEnd={dragendHandler}>
                  <Tooltip data={data} />
                </Marker>
              )}
              {isselected &&
                isowner &&
                waypoints.map((obj, index) => (
                  <Marker
                    key={`${obj.lat},${obj.lng}`}
                    draggable
                    bubblingMouseEvents={false}
                    icon={DotMarker(data.color)}
                    position={obj}
                    onClick={clickHandler}
                    onDrag={({ latlng }) => dragHandler(index + 1, latlng)}
                    onDragEnd={dragendHandler}
                  />
                ))}
            </LayerGroup>
          </LayerGroup>
        );
      }}
    </FirebaseAuthConsumer>
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
};

export default ParcoursComponent;
