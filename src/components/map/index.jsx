import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { createUseStyles } from 'react-jss';
import { Map, Marker, Polygon, TileLayer, ZoomControl } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';

import { updateParcours } from '../../redux/actions';
import {
  selectDraft,
  selectEditMode,
  selectParcours,
} from '../../redux/selectors';
import { UserPositionIcon } from './markers';
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

  const draft = useSelector(selectDraft);
  const parcours = useSelector(selectParcours);
  const editmode = useSelector(selectEditMode);

  const onAddPoint = useCallback(
    ({ latlng }) => {
      dispatch(updateParcours({ point: latlng }));
    },
    [dispatch]
  );

  const hasParcours = parcours && parcours.length > 0;

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
        {useZoomControl && <ZoomControl position="topright" />}
        {isGeolocated && (
          <Marker draggable={false} icon={UserPositionIcon} position={center} />
        )}
        {hasParcours &&
          parcours.map(obj => (
            <Parcours key={obj.id} data={obj} opacity={editmode ? 0.25 : 1} />
          ))}
        {draft && draft.length && <Polygon color="purple" positions={draft} />}
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
