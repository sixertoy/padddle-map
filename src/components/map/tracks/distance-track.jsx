import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { LayerGroup, Marker, Polyline } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';

import { DistanceMarkers, noop } from '../../../core';
import {
  disableEditMode,
  enableEditMode,
  openSelected,
} from '../../../redux/actions';
import { PaddleMarker, TrackEndMarker } from '../icons';
import InfosTooltip from '../tooltips/infos';

const useStyles = createUseStyles({
  marker: ({ color }) => ({
    background: color,
    color: 'rgba(255, 255, 255, 1)',
  }),
});

const DistanceTrackComponent = React.memo(({ data, disabled }) => {
  const dispatch = useDispatch();
  const classes = useStyles({ color: data.color });

  const user = useSelector(_ => _.user);
  const createmode = useSelector(_ => _.createmode);

  const [opacity, setOpacity] = useState(1);
  const [isowner, setIsOwner] = useState(false);
  const [endpoint, setEndpoint] = useState(null);
  const [startpoint, setStartpoint] = useState(null);

  const dblclickHandler = useCallback(() => {
    if (createmode || !isowner) return;
    dispatch(enableEditMode());
  }, [createmode, dispatch, isowner]);

  const clickHandler = useCallback(() => {
    if (createmode) return;
    dispatch(disableEditMode());
    dispatch(openSelected(data.id));
  }, [createmode, data.id, dispatch]);

  useEffect(() => {
    const value = !disabled ? 1 : 0.25;
    setOpacity(value);
  }, [disabled]);

  useEffect(() => {
    const next = user === data.user;
    setIsOwner(next);
  }, [user, data.user]);

  useEffect(() => {
    setStartpoint(data.points[0]);
    setEndpoint(data.points[data.points.length - 1]);
  }, [data, data.points]);

  return (
    <LayerGroup>
      {/* {data.polygon && (
        <Polygon
          interactive
          bubblingMouseEvents={false}
          color={data.color}
          fill={data.color}
          positions={data.points}
          stroke={false}
          onClick={clickHandler}
          onDblclick={dblclickHandler}>
          <InfosTooltip data={data} />
        </Polygon>
      )} */}
      {(!disabled && (
        <DistanceMarkers
          interactive
          bubblingMouseEvents={false}
          color={data.color}
          distanceMarkers={{
            cssClass: classnames('leaflet-dist-marker', classes.marker),
            iconSize: [16, 16],
            lazy: false,
            offset: 1000,
            onClick: clickHandler,
            opacity,
            // polygon: data.polygon,
            showAll: 13,
          }}
          fill={false}
          positions={data.points}
          weight={3}
          onClick={clickHandler}
          onDblclick={dblclickHandler}>
          <InfosTooltip data={data} />
        </DistanceMarkers>
      )) || (
        <Polyline
          color={data.color}
          interactive={false}
          opacity={opacity}
          positions={data.points}
          weight={3}
        />
      )}
      {startpoint && (
        <Marker
          key={`${startpoint.lat},${startpoint.lng}`}
          bubblingMouseEvents={false}
          icon={
            (!disabled && PaddleMarker(data.color)) ||
            TrackEndMarker(data.color)
          }
          opacity={opacity}
          position={startpoint}
          onClick={(!disabled && clickHandler) || noop}
          onDblclick={(!disabled && dblclickHandler) || noop}
        />
      )}
      {!disabled && endpoint && (
        <Marker
          key={`${endpoint.lat},${endpoint.lng}`}
          bubblingMouseEvents={false}
          icon={TrackEndMarker(data.color)}
          opacity={opacity}
          position={endpoint}
          onClick={(!disabled && clickHandler) || noop}
          onDblclick={(!disabled && dblclickHandler) || noop}
        />
      )}
    </LayerGroup>
  );
});

DistanceTrackComponent.propTypes = {
  data: PropTypes.shape({
    color: PropTypes.string,
    distance: PropTypes.number,
    id: PropTypes.string,
    name: PropTypes.string,
    points: PropTypes.arrayOf(PropTypes.shape()),
    polygon: PropTypes.bool,
    user: PropTypes.string,
  }).isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default DistanceTrackComponent;
