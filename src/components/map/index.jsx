import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { createUseStyles } from 'react-jss';
import { LayerGroup, Map, Marker, TileLayer, ZoomControl } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';

import { noop } from '../../core';
import { addPointDraft } from '../../redux/actions';
import {
  selectDraft,
  selectEditMode,
  selectParcours,
} from '../../redux/selectors';
import Draft from './draft';
import { UserPositionIcon } from './markers';
import Parcours from './parcours';

const OSM_LAYER = 'https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';
const FRANCE_CENTER = {
  lat: 46.71109,
  lng: 1.7191036,
};

const useStyles = createUseStyles({
  container: {
    composes: ['is-full-layout'],
    zIndex: 999,
  },
});

const GeoMap = React.forwardRef(({ onMoveEnd, useZoomControl }, map) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const draft = useSelector(selectDraft);
  const parcours = useSelector(selectParcours);
  const editmode = useSelector(selectEditMode);
  const position = useSelector(_ => _.userposition);

  const onAddPoint = useCallback(
    ({ latlng }) => dispatch(addPointDraft(latlng)),
    [dispatch]
  );

  const moveEndHandler = useCallback(() => {
    if (!position) return;
    const { leafletElement } = map.current;
    const userIsVisible = leafletElement.getBounds().contains(position);
    onMoveEnd({ userIsVisible });
  }, [map, onMoveEnd, position]);

  const hasParcours = parcours && parcours.length > 0;
  const hasDraft = draft && draft.points && draft.points.length > 0;

  return (
    <div className={classes.container}>
      <Map
        ref={map}
        center={position || FRANCE_CENTER}
        maxZoom={17}
        minZoom={1}
        zoom={6}
        zoomControl={false}
        onClick={(editmode && onAddPoint) || noop}
        onMoveEnd={moveEndHandler}>
        <TileLayer attribution="Open Street Map" url={OSM_LAYER} />
        {position && (
          <Marker
            draggable={false}
            icon={UserPositionIcon}
            position={position}
          />
        )}
        <LayerGroup>
          {hasParcours &&
            parcours.map(obj => (
              <Parcours key={obj.id} data={obj} opacity={editmode ? 0.25 : 1} />
            ))}
          {hasDraft && <Draft data={draft} />}
        </LayerGroup>
        {useZoomControl && <ZoomControl position="topright" />}
      </Map>
    </div>
  );
});

GeoMap.defaultProps = {
  useZoomControl: false,
};

GeoMap.propTypes = {
  onMoveEnd: PropTypes.func.isRequired,
  useZoomControl: PropTypes.bool,
};

export default GeoMap;
