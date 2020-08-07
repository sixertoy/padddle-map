import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { createUseStyles } from 'react-jss';
import { LayerGroup, Map, Marker, TileLayer, ZoomControl } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { ZINDEX } from '../../constants';
import { FirebaseAuthConsumer } from '../../core/firebase';
import { addPointDraft } from '../../redux/actions';
import Draft from './draft';
import { UserMarker } from './icons';
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

  const parcours = useSelector(_ => _.parcours);
  const position = useSelector(_ => _.userposition);
  const createmode = useSelector(_ => _.createmode);

  const clickHandler = useCallback(
    ({ latlng }) => {
      if (createmode) dispatch(addPointDraft(latlng));
    },
    [dispatch, createmode]
  );

  const dragEndHandler = useCallback(
    ({ center: pCenter, zoom: pZoom }) => {
      history.push(`/${pCenter.join(',')},${pZoom}`);
    },
    [history]
  );

  return (
    <FirebaseAuthConsumer>
      {({ user }) => (
        <div className={classes.container}>
          <Map
            ref={map}
            center={center}
            maxZoom={17}
            minZoom={1}
            zoom={zoom}
            zoomControl={false}
            onClick={clickHandler}
            onViewportChanged={dragEndHandler}>
            <TileLayer attribution="Open Street Map" url={OSM_LAYER} />
            <ZoomControl position="topright" />
            {position && (
              <Marker draggable={false} icon={UserMarker} position={position} />
            )}
            <LayerGroup>
              {createmode && <Draft />}
              {parcours.map(obj => (
                <Parcours key={obj.id} data={obj} user={user} />
              ))}
            </LayerGroup>
          </Map>
        </div>
      )}
    </FirebaseAuthConsumer>
  );
});

GeoMap.propTypes = {
  center: PropTypes.oneOfType([PropTypes.shape(), PropTypes.array]).isRequired,
  zoom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default GeoMap;
