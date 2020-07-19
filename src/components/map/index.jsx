import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import { createUseStyles } from 'react-jss';
import {
  LayerGroup,
  Map,
  Marker,
  Polygon,
  TileLayer,
  ZoomControl,
} from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';

import { updateParcours } from '../../redux/actions';
import {
  selectDraft,
  selectEditMode,
  selectParcours,
} from '../../redux/selectors';
import MarkerIcon from './marker';
import Parcours from './parcours';

const OSM_LAYER = 'https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';

const useStyles = createUseStyles({
  container: {
    composes: ['is-full-layout'],
    zIndex: 999,
  },
});

const noop = () => {};

const GeoMap = ({ center, isGeolocated, useZoomControl }) => {
  const clases = useStyles();
  const dispatch = useDispatch();
  const [coords, setCoords] = useState(center);

  const draft = useSelector(selectDraft);
  const parcours = useSelector(selectParcours);
  const editmode = useSelector(selectEditMode);

  const onAddPoint = useCallback(
    ({ latlng }) => {
      dispatch(updateParcours({ point: latlng }));
    },
    [dispatch]
  );

  const onMoveEnd = useCallback(({ target }) => {
    const nextCoords = target.getLatLng();
    setCoords(nextCoords);
  }, []);

  const onMoveStart = useCallback(() => {}, []);

  return (
    <div className={clases.container}>
      <Map
        center={center}
        maxZoom={17}
        minZoom={1}
        zoom={9}
        zoomControl={false}
        onClick={(editmode && onAddPoint) || noop}>
        <TileLayer attribution="Open Street Map" url={OSM_LAYER} />
        {isGeolocated && (
          <Marker
            draggable={false}
            icon={MarkerIcon}
            position={coords}
            onMoveEnd={onMoveEnd}
            onMoveStart={onMoveStart}
          />
        )}
        {draft && draft.length && <Polygon color="purple" positions={draft} />}
        <LayerGroup>
          {parcours &&
            parcours.map(obj => (
              <Parcours key={obj.id} data={obj} opacity={editmode ? 0.25 : 1} />
            ))}
        </LayerGroup>
        {useZoomControl && <ZoomControl position="topright" />}
      </Map>
    </div>
  );
};

GeoMap.defaultProps = {
  useZoomControl: true,
};

GeoMap.propTypes = {
  center: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
  isGeolocated: PropTypes.bool.isRequired,
  useZoomControl: PropTypes.bool,
};

export default GeoMap;
