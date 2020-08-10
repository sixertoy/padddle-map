import 'leaflet-geometryutil';

import { GeometryUtil } from 'leaflet';
import PropTypes from 'prop-types';
import React, { useCallback, useRef } from 'react';
import { LayerGroup, Marker, Polygon, Polyline } from 'react-leaflet';
import { useDispatch } from 'react-redux';

import { updateParcours } from '../../../../redux/actions';
import { DotMarker, PinMarker } from '../../icons';
import EditTooltip from '../tooltips/edit';

const EditableTrackComponent = React.memo(({ data }) => {
  const track = useRef();
  const dispatch = useDispatch();

  const editAddHandler = useCallback(
    ({ latlng }) => {
      const elt = track.current.leafletElement;
      const latlngs = elt.getLatLngs();
      const found = latlngs.reduce((acc, point, index, list) => {
        if (index === 0) return acc;
        const prev = list[index - 1];
        const belongsTo = GeometryUtil.belongsSegment(latlng, point, prev);
        if (!belongsTo) return acc;
        return index;
      }, -1);
      const start = data.points.slice(0, found);
      const end = data.points.slice(found);
      const next = [...start, latlng, ...end];
      dispatch(updateParcours({ ...data, points: next }));
    },
    [data, dispatch]
  );

  const editRemoveHandler = useCallback(
    index => {
      if (index === 0) return;
      const latlngs = data.points.filter((obj, i) => index !== i);
      dispatch(updateParcours({ ...data, points: latlngs }));
    },
    [data, dispatch]
  );

  const dragHandler = useCallback(
    (index, latlng) => {
      const latlngs = data.points.map((obj, ind) => {
        if (index !== ind) return obj;
        return latlng;
      });
      const line = track.current.leafletElement;
      line.setLatLngs(latlngs);
      line.redraw();
    },
    [data.points]
  );

  const dragendHandler = useCallback(() => {
    const line = track.current.leafletElement;
    const latlngs = line.getLatLngs();
    dispatch(updateParcours({ ...data, points: latlngs }));
  }, [data, dispatch]);

  return (
    <LayerGroup>
      {(data.polygon && (
        <Polygon
          ref={track}
          interactive
          bubblingMouseEvents={false}
          dashArray="5,10"
          positions={data.points}
          weight={3}
          onClick={editAddHandler}>
          <EditTooltip />
        </Polygon>
      )) || (
        <Polyline
          ref={track}
          interactive
          bubblingMouseEvents={false}
          dashArray="5,10"
          positions={data.points}
          weight={3}
          onClick={editAddHandler}>
          <EditTooltip />
        </Polyline>
      )}
      {data.points.map((point, index, list) => {
        const islast = index === list.length - 1;
        if (islast) return null;
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
