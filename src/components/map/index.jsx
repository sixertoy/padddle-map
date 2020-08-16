import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router-dom';

import { version } from '../../../package.json';
import { ZINDEX } from '../../constants';
import { addPointDraft, closeSelected } from '../../redux/actions';
import Controls from './controls';
import { UserPositionMarker } from './icons';
import { DraftTrack, Track } from './tracks';

// const SATELLITE_LAYER = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
const OSM_LAYER = 'https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';
const ESRI_LAYER =
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';

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

const GeoMap = ({ config }) => {
  const map = useRef();
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const isMobile = useMediaQuery({ query: '(max-width: 680px)' });

  const parcours = useSelector(_ => _.parcours);
  const selected = useSelector(_ => _.selected);
  const editmode = useSelector(_ => _.editmode);
  const createmode = useSelector(_ => _.createmode);
  const userposition = useSelector(_ => _.userposition);

  const [satellite, setSatellite] = useState(false);
  const [attribution, setAttribution] = useState(false);

  const satelliteClickHandler = useCallback(show => {
    setSatellite(show);
  }, []);

  const mapClickHandler = useCallback(
    evt => {
      if (editmode) return;
      const { latlng } = evt;
      if (createmode) {
        dispatch(addPointDraft(latlng));
      } else if (selected) {
        dispatch(closeSelected());
      }
    },
    [createmode, dispatch, editmode, selected]
  );

  const viewportChangedHandler = useCallback(
    ({ center, zoom }) => {
      if (editmode || !center) return;
      history.push(`/${center.join(',')},${zoom}`);
    },
    [editmode, history]
  );

  const mapReadyHandler = useCallback(() => {}, []);

  useEffect(() => {
    if (userposition) {
      const lmap = map.current.leafletElement;
      lmap.setView(userposition);
    }
  }, [userposition]);

  useEffect(() => {
    if (satellite) {
      setAttribution(`ESRI | Padddle.io v${version}`);
    } else {
      setAttribution(`OSM | Padddle.io v${version}`);
    }
  }, [satellite]);

  return (
    <div className={classes.container}>
      <Map
        ref={map}
        attributionControl={!isMobile}
        center={config.center}
        maxZoom={17}
        minZoom={1}
        tap={isMobile}
        whenReady={mapReadyHandler}
        zoom={config.zoom}
        zoomControl={false}
        onClick={mapClickHandler}
        onViewportChanged={viewportChangedHandler}>
        <TileLayer
          attribution={attribution}
          url={(!satellite && OSM_LAYER) || ESRI_LAYER}
        />
        <Controls onChange={satelliteClickHandler} />
        {parcours.map(item => (
          <Track key={item.id} data={item} />
        ))}
        {createmode && <DraftTrack />}
        {userposition && (
          <Marker
            draggable={false}
            icon={UserPositionMarker}
            position={userposition}
          />
        )}
      </Map>
    </div>
  );
};

GeoMap.propTypes = {
  config: PropTypes.shape().isRequired,
};

export default GeoMap;
