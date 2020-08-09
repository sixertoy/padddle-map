import PropTypes from 'prop-types';
import React, { useCallback, useRef } from 'react';
import { LayerGroup, Marker, Polyline } from 'react-leaflet';

import { DotMarker, PinMarker } from '../../icons';
import EditTooltip from '../tooltips/edit';

const TrackEditableComponent = ({ data }) => {
  const polygon = useRef();
  const editAddHandler = useCallback(() => {
    // const lmap = map.current.leafletElement;
    // const elt = polygon.current.leafletElement;
    // const point = closest(lmap, elt, latlng, true);
    // console.log('point', point);
    // const target = turf.point([latlng.lng, latlng.lat]);
    // let collection = data.points.map(obj => turf.point([obj.lng, obj.lat]));
    // collection = turf.featureCollection(collection);
    // const point = nearest(target, collection);
    // const index = get(point, 'properties.featureIndex');
    // const start = data.points.slice(0, index);
    // const end = data.points.slice(index);
    // const next = [...start, latlng, ...end];
    // dispatch(updateParcours({ ...data, points: next }));
  }, []);

  const editRemoveHandler = useCallback(() => {
    // const points = data.points.filter((obj, i) => index !== i);
    // dispatch(updateParcours({ ...data, points }));
  }, []);

  const dragHandler = useCallback(() => {
    // const points = data.points.map((obj, i) => {
    //   if (index !== i) return obj;
    //   return latlng;
    // });
    // const elt = polygon.current.leafletElement;
    // elt.setLatLngs(points);
  }, []);

  const dragendHandler = useCallback(() => {
    // const elt = polygon.current.leafletElement;
    // let points = elt.getLatLngs();
    // // @NOTE Leaflet.Polygon renvoi un array imbriqué
    // if (data.polygon) [points] = points;
    // dispatch(updateParcours({ ...data, points }));
  }, []);

  return (
    <LayerGroup>
      <Polyline ref={polygon} positions={data.points} onClick={editAddHandler}>
        <EditTooltip />
      </Polyline>
      {data.points.map((obj, index) => {
        const Icon = index === 0 ? PinMarker : DotMarker;
        return (
          <Marker
            key={`${obj.lat},${obj.lng}`}
            draggable
            bubblingMouseEvents={false}
            icon={Icon(data.color)}
            position={obj}
            onClick={() => editRemoveHandler(index)}
            onDrag={({ latlng }) => dragHandler(index, latlng)}
            onDragEnd={dragendHandler}>
            <EditTooltip remove />
          </Marker>
        );
      })}
    </LayerGroup>
  );
};

TrackEditableComponent.propTypes = {
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

export default TrackEditableComponent;
