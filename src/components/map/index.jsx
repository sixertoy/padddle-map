import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { createUseStyles } from 'react-jss';
import { LayerGroup, Map, Marker, TileLayer, ZoomControl } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { ZINDEX } from '../../constants';
import { noop } from '../../core';
import { addPointDraft } from '../../redux/actions';
import {
  selectDraft,
  selectEditMode,
  selectParcours,
} from '../../redux/selectors';
import Draft from './draft';
import { UserMarker } from './markers';
import Parcours from './parcours';

const OSM_LAYER = 'https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';

const useStyles = createUseStyles({
  container: {
    bottom: 0,
    composes: ['is-absolute'],
    left: 0,
    right: 0,
    top: 60,
    zIndex: ZINDEX.MAP,
  },
});

const GeoMap = React.forwardRef(({ center, zoom }, map) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const draft = useSelector(selectDraft);
  const parcours = useSelector(selectParcours);
  const editmode = useSelector(selectEditMode);
  const position = useSelector(_ => _.userposition);

  const onAddPoint = useCallback(
    ({ latlng }) => dispatch(addPointDraft(latlng)),
    [dispatch]
  );

  const dragEndHandler = useCallback(
    ({ center: pCenter, zoom: pZoom }) => {
      history.push(`/${pCenter.join(',')},${pZoom}`);
    },
    [history]
  );

  const hasParcours = parcours && parcours.length > 0;
  const hasDraft = draft && draft.points && draft.points.length > 0;

  return (
    <div className={classes.container}>
      <Map
        ref={map}
        center={center}
        maxZoom={17}
        minZoom={1}
        zoom={zoom}
        onClick={(editmode && onAddPoint) || noop}
        onViewportChanged={dragEndHandler}>
        <TileLayer attribution="Open Street Map" url={OSM_LAYER} />
        <ZoomControl position="topright" />
        {position && (
          <Marker draggable={false} icon={UserMarker} position={position} />
        )}
        <LayerGroup>
          {hasParcours &&
            parcours.map(obj => (
              <Parcours key={obj.id} data={obj} opacity={editmode ? 0.25 : 1} />
            ))}
          {hasDraft && <Draft data={draft} />}
        </LayerGroup>
      </Map>
    </div>
  );
});

GeoMap.propTypes = {
  center: PropTypes.oneOfType([PropTypes.shape(), PropTypes.array]).isRequired,
  zoom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default GeoMap;
