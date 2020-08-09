import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { createUseStyles } from 'react-jss';
import { LayerGroup, Marker, Polygon } from 'react-leaflet';
import { useSelector } from 'react-redux';

import { DistanceMarkers } from '../../../../core';
import { StartMarker } from '../../icons';
import InfosTooltip from '../tooltips/infos';

const useStyles = createUseStyles({
  marker: ({ color }) => ({
    background: color,
    color: 'rgba(255, 255, 255, 1)',
  }),
});

const TrackComponent = ({ data }) => {
  const [startpoint] = data.points;

  const createmode = useSelector(_ => _.createmode);

  const classes = useStyles({ color: data.color });

  const clickHandler = useCallback(() => {
    if (createmode) return;
    // if (isselected) dispatch(closePopup());
    // if (!isselected) dispatch(openPopup(data.id));
  }, [createmode]);

  return (
    <LayerGroup>
      <Polygon
        interactive
        bubblingMouseEvents={false}
        color={data.color}
        fill={data.color}
        positions={data.points}
        stroke={false}
        onClick={clickHandler}>
        <InfosTooltip data={data} />
      </Polygon>
      <DistanceMarkers
        interactive
        bubblingMouseEvents={false}
        color={data.color}
        distanceMarkers={{
          cssClass: classnames('leaflet-dist-marker', classes.marker),
          iconSize: [16, 16],
          lazy: false,
          offset: 1000,
          showAll: 13,
        }}
        opacity={1}
        positions={data.points}
        weight={3}
        onClick={clickHandler}
      />
      <Marker
        key={`${startpoint.lat},${startpoint.lng}`}
        draggable
        bubblingMouseEvents={false}
        icon={StartMarker(data.color)}
        position={startpoint}
        onClick={clickHandler}
      />
    </LayerGroup>
  );
};

TrackComponent.propTypes = {
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

export default TrackComponent;
