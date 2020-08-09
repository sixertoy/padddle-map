import classnames from 'classnames';
import { closest } from 'leaflet-geometryutil';
import get from 'lodash.get';
import PropTypes from 'prop-types';
import React, { useCallback, useRef } from 'react';
import { LayerGroup, Marker, Polygon, Polyline } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';

import { DistanceMarkers, rgba } from '../../../core';
import { FirebaseAuthConsumer } from '../../../core/firebase';
import { isOwner } from '../../../helpers';
import { closePopup, openPopup, updateParcours } from '../../../redux/actions';
import { selectParcours } from '../../../redux/selectors';
import { DotMarker, PinMarker, StartMarker } from '../icons';
import EditTooltip from './edit-tooltip';
import InfoTooltip from './info-tooltip';

const ParcoursComponent = ({ data, map }) => {
  const polygon = useRef();
  const dispatch = useDispatch();

  const selected = useSelector(selectParcours);
  const editmode = useSelector(_ => _.editmode);
  const createmode = useSelector(_ => _.createmode);

  const [startpoint, ...waypoints] = data.points;
  const isselected = selected && selected.id === data.id;
  const showmarker = !selected || isselected;

  const editAddHandler = useCallback(
    latlng => {
      const lmap = map.current.leafletElement;
      const elt = polygon.current.leafletElement;
      const point = closest(lmap, elt, latlng, true);
      console.log('point', point);
      // const target = turf.point([latlng.lng, latlng.lat]);
      // let collection = data.points.map(obj => turf.point([obj.lng, obj.lat]));
      // collection = turf.featureCollection(collection);
      // const point = nearest(target, collection);
      // const index = get(point, 'properties.featureIndex');
      // const start = data.points.slice(0, index);
      // const end = data.points.slice(index);
      // const next = [...start, latlng, ...end];
      // dispatch(updateParcours({ ...data, points: next }));
    },
    [map]
  );

  const editRemoveHandler = useCallback(
    index => {
      const points = data.points.filter((obj, i) => index !== i);
      dispatch(updateParcours({ ...data, points }));
    },
    [data, dispatch]
  );

  const clickHandler = useCallback(() => {
    if (createmode) return;
    if (isselected) dispatch(closePopup());
    if (!isselected) dispatch(openPopup(data.id));
  }, [createmode, data.id, dispatch, isselected]);

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
        const opacity = selected && !isselected ? 0.75 : 1;
        const color = rgba(data.color, opacity);
        const showpolygon =
          data.polygon && (!isselected || (isselected && !editmode));
        return (
          <LayerGroup>
            <React.Fragment>
              {showpolygon && (
                <Polygon
                  ref={polygon}
                  interactive
                  bubblingMouseEvents={false}
                  color={color}
                  dashArray={isselected && editmode ? '5, 10' : '1'}
                  fill={color}
                  positions={data.points}
                  stroke={isselected || (isselected && editmode)}
                  weight={3}
                  onClick={clickHandler}>
                  {!createmode && <InfoTooltip data={data} />}
                </Polygon>
              )}
              {!isselected && (
                <DistanceMarkers
                  ref={polygon}
                  interactive
                  bubblingMouseEvents={false}
                  color={color}
                  distanceMarkers={{
                    cssClass: 'leaflet-dist-marker',
                    iconSize: [24, 24],
                    lazy: false,
                    offset: 1000,
                    showAll: 13,
                  }}
                  opacity={1}
                  positions={data.points}
                  weight={3}
                  onClick={({ latlng }) => {
                    if (!editmode) clickHandler();
                    if (editmode) editAddHandler(latlng);
                  }}>
                  {editmode && !createmode && <EditTooltip />}
                  {!editmode && !createmode && <InfoTooltip data={data} />}
                </DistanceMarkers>
              )}
            </React.Fragment>
            <LayerGroup>
              {!createmode && showmarker && (
                <Marker
                  key={`${startpoint.lat},${startpoint.lng}`}
                  bubblingMouseEvents={false}
                  draggable={isowner && !editmode}
                  icon={
                    isselected ? PinMarker(data.color) : StartMarker(data.color)
                  }
                  position={startpoint}
                  onClick={clickHandler}
                  onDrag={({ latlng }) => dragHandler(0, latlng)}
                  onDragEnd={dragendHandler}>
                  <InfoTooltip data={data} />
                </Marker>
              )}
              {isselected &&
                isowner &&
                waypoints.map((obj, index) => (
                  <Marker
                    key={`${obj.lat},${obj.lng}`}
                    bubblingMouseEvents={false}
                    draggable={!editmode}
                    icon={DotMarker(data.color)}
                    position={obj}
                    onClick={() => {
                      if (!editmode) clickHandler();
                      if (editmode) editRemoveHandler(index + 1);
                    }}
                    onDrag={({ latlng }) => dragHandler(index + 1, latlng)}
                    onDragEnd={dragendHandler}>
                    {editmode && <EditTooltip remove />}
                  </Marker>
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
  map: PropTypes.shape({
    current: PropTypes.shape(),
  }).isRequired,
};

export default ParcoursComponent;
