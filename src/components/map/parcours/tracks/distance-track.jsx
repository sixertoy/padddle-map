import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { LayerGroup, Marker, Polygon } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';

import { DistanceMarkers } from '../../../../core';
import {
  disableEditMode,
  enableEditMode,
  openPopup,
} from '../../../../redux/actions';
import { PaddleMarker, TrackEndMarker } from '../../icons';
import InfosTooltip from '../tooltips/infos';

const useStyles = createUseStyles({
  marker: ({ color }) => ({
    background: color,
    color: 'rgba(255, 255, 255, 1)',
  }),
});

const DistanceTrackComponent = React.memo(({ data }) => {
  const dispatch = useDispatch();
  const classes = useStyles({ color: data.color });

  const [endPoint, setEndPoint] = useState(null);
  const [startPoint, setStartPoint] = useState(null);

  const createmode = useSelector(_ => _.createmode);

  const dblclickHandler = useCallback(() => {
    if (createmode) return;
    dispatch(enableEditMode());
  }, [createmode, dispatch]);

  const clickHandler = useCallback(() => {
    if (createmode) return;
    dispatch(disableEditMode());
    dispatch(openPopup(data.id));
  }, [createmode, data.id, dispatch]);

  useEffect(() => {
    setStartPoint(data.points[0]);
    if (!data.polygon) {
      setEndPoint(data.points[data.points.length - 1]);
    }
  }, [data.points, data.polygon]);

  return (
    <LayerGroup>
      {data.polygon && (
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
      )}
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
          polygon: data.polygon,
          showAll: 13,
        }}
        fill={false}
        opacity={1}
        positions={data.points}
        weight={3}
        onClick={clickHandler}
        onDblclick={dblclickHandler}>
        {!data.polygon && <InfosTooltip data={data} />}
      </DistanceMarkers>
      {startPoint && (
        <Marker
          key={`${startPoint.lat},${startPoint.lng}`}
          bubblingMouseEvents={false}
          icon={PaddleMarker(data.color)}
          position={startPoint}
          onClick={clickHandler}
          onDblclick={dblclickHandler}
        />
      )}
      {endPoint && (
        <Marker
          key={`${endPoint.lat},${endPoint.lng}`}
          bubblingMouseEvents={false}
          icon={TrackEndMarker(data.color)}
          position={endPoint}
          onClick={clickHandler}
          onDblclick={dblclickHandler}
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
};

export default DistanceTrackComponent;
