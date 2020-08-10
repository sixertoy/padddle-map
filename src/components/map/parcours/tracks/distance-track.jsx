import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { createUseStyles } from 'react-jss';
import { LayerGroup, Marker, Polygon } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';

import { DistanceMarkers } from '../../../../core';
import { openPopup } from '../../../../redux/actions';
import { StartMarker } from '../../icons';
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

  const createmode = useSelector(_ => _.createmode);

  const clickHandler = useCallback(() => {
    if (!createmode) {
      dispatch(openPopup(data.id));
    }
  }, [createmode, data.id, dispatch]);

  const [startpoint] = data.points;
  return (
    <LayerGroup>
      {data.polygon && (
        <Polygon
          interactive
          riseOnHover
          bubblingMouseEvents={false}
          color={data.color}
          fill={data.color}
          positions={data.points}
          stroke={data.polygon}
          weight={(data.polygon && 3) || 0}
          onClick={clickHandler}>
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
        opacity={1}
        positions={data.points}
        weight={(!data.polygon && 3) || 0}
        onClick={clickHandler}>
        {!data.polygon && <InfosTooltip data={data} />}
      </DistanceMarkers>
      <Marker
        key={`${startpoint.lat},${startpoint.lng}`}
        bubblingMouseEvents={false}
        icon={StartMarker(data.color)}
        position={startpoint}
        onClick={clickHandler}
      />
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
