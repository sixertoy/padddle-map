import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { createUseStyles } from 'react-jss';
import { LayerGroup, Marker, Polygon, Polyline } from 'react-leaflet';

import { DistanceMarkers } from '../../../core';
import { DraggableMarker, PaddleMarker } from '../icons';
import InfosTooltip from '../tooltips/infos';
import {
  useEditHandler,
  useMarkerPoint,
  useSelected,
  useSelectHandler,
} from './hooks';

const useStyles = createUseStyles({
  marker: ({ color }) => ({
    background: color,
    color: 'rgba(255, 255, 255, 1)',
  }),
});

const ParcoursComponent = React.memo(function ParcoursComponent({ data }) {
  const classes = useStyles({ color: data.color });

  const toggleEditHandler = useEditHandler(data);
  const selectHandler = useSelectHandler(data);
  const { endpoint, startpoint } = useMarkerPoint(data);
  const { opacity, showdistances } = useSelected(data);

  return (
    <LayerGroup>
      <LayerGroup>
        {data.polygon && (
          <Polygon
            interactive
            bubblingMouseEvents={false}
            color={data.color}
            fill={data.color}
            opacity={opacity}
            positions={data.points}
            weight={5}
            onClick={selectHandler}
            onDblclick={toggleEditHandler}>
            <InfosTooltip data={data} />
          </Polygon>
        )}
        {!data.polygon && (
          <Polyline
            interactive
            bubblingMouseEvents={false}
            color={data.color}
            opacity={opacity}
            positions={data.points}
            weight={5}
            onClick={selectHandler}
            onDblclick={toggleEditHandler}>
            <InfosTooltip data={data} />
          </Polyline>
        )}
      </LayerGroup>
      {showdistances && (
        <DistanceMarkers
          bubblingMouseEvents={false}
          color={data.color}
          distanceMarkers={{
            cssClass: classnames('leaflet-dist-marker', classes.marker),
            iconSize: [16, 16],
            lazy: false,
            offset: 1000,
            showAll: 13,
          }}
          fill={false}
          positions={data.points}
          stroke={false}
          onClick={selectHandler}
          onDblclick={toggleEditHandler}>
          <InfosTooltip data={data} />
        </DistanceMarkers>
      )}
      <LayerGroup>
        {startpoint && (
          <Marker
            bubblingMouseEvents={false}
            icon={PaddleMarker(data.color)}
            opacity={opacity}
            position={startpoint}
            onClick={selectHandler}
            onDblclick={toggleEditHandler}
          />
        )}
        {endpoint && (
          <Marker
            bubblingMouseEvents={false}
            icon={DraggableMarker(data.color)}
            opacity={opacity}
            position={endpoint}
            onClick={selectHandler}
            onDblclick={toggleEditHandler}
          />
        )}
      </LayerGroup>
    </LayerGroup>
  );
});

ParcoursComponent.propTypes = {
  data: PropTypes.shape({
    color: PropTypes.string,
    coordinates: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }),
    distance: PropTypes.number,
    id: PropTypes.string,
    name: PropTypes.string,
    points: PropTypes.arrayOf(PropTypes.shape()),
    polygon: PropTypes.bool,
    user: PropTypes.string,
  }).isRequired,
};

export default ParcoursComponent;
