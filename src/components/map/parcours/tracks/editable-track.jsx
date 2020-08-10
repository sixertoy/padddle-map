import PropTypes from 'prop-types';
import React, { useCallback, useRef } from 'react';
import { LayerGroup, Marker, Polygon, Polyline } from 'react-leaflet';
import { useDispatch } from 'react-redux';

import { updateParcours } from '../../../../redux/actions';
import { DotMarker, PinMarker } from '../../icons';
import EditTooltip from '../tooltips/edit';

const EditableTrackComponent = React.memo(({ data }) => {
  const polygon = useRef();
  const dispatch = useDispatch();

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

  const editRemoveHandler = useCallback(
    index => {
      if (index === 0) return;
      const points = data.points.filter((obj, i) => index !== i);
      dispatch(updateParcours({ ...data, points }));
    },
    [data, dispatch]
  );

  const dragHandler = useCallback(
    (index, latlng) => {
      const points = data.points.map((obj, i) => {
        if (index !== i) return obj;
        return latlng;
      });
      const elt = polygon.current.leafletElement;
      elt.setLatLngs(points);
      elt.redraw();
    },
    [data.points]
  );

  const dragendHandler = useCallback(() => {
    const elt = polygon.current.leafletElement;
    elt.redraw();
    let points = elt.getLatLngs();
    if (data.polygon) [points] = elt.getLatLngs();
    dispatch(updateParcours({ ...data, points }));
  }, [data, dispatch]);

  return (
    <LayerGroup>
      {data.polygon && (
        <Polygon
          ref={polygon}
          dashArray="5,10"
          positions={data.points}
          onClick={editAddHandler}>
          <EditTooltip />
        </Polygon>
      )}
      {!data.polygon && (
        <Polyline
          ref={polygon}
          dashArray="5,10"
          positions={data.points}
          onClick={editAddHandler}>
          <EditTooltip />
        </Polyline>
      )}
      {data.points.map((point, index) => {
        const isfirst = index === 0;
        const Icon = (isfirst && PinMarker) || DotMarker;
        return (
          <Marker
            key={`${point.lat},${point.lng}`}
            draggable
            bubblingMouseEvents={false}
            icon={Icon(data.color)}
            position={point}
            onClick={() => editRemoveHandler(index)}
            onDrag={({ latlng }) => dragHandler(index, latlng)}
            onDragEnd={dragendHandler}>
            {index !== 0 && <EditTooltip remove />}
          </Marker>
        );
      })}
    </LayerGroup>
  );
});

EditableTrackComponent.propTypes = {
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

export default EditableTrackComponent;
