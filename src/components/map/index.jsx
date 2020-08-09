import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { LayerGroup, Map, Marker, TileLayer } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { version } from '../../../package.json';
import { ZINDEX } from '../../constants';
import { addPointDraft, closePopup } from '../../redux/actions';
import Controls from './controls';
import Draft from './draft';
import { UserMarker } from './icons';
import Parcours from './parcours';

const OSM_LAYER = 'https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';
const ESRI_LAYER =
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
// const SATELLITE_LAYER = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';

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
  const selected = useSelector(_ => _.selected);
  const position = useSelector(_ => _.userposition);
  const createmode = useSelector(_ => _.createmode);

  const [satellite, setSatellite] = useState(false);

  const satelliteHandler = useCallback(show => {
    setSatellite(show);
  }, []);

  const clickHandler = useCallback(
    evt => {
      const { latlng } = evt;
      if (selected) dispatch(closePopup());
      if (createmode) dispatch(addPointDraft(latlng));
    },
    [createmode, dispatch, selected]
  );

  const dragEndHandler = useCallback(
    ({ center: pCenter, zoom: pZoom }) => {
      history.push(`/${pCenter.join(',')},${pZoom}`);
    },
    [history]
  );

  const attribution = !satellite
    ? `OSM | Padddle v${version}`
    : `ESRI | Padddle v${version}`;

  return (
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
        <TileLayer
          attribution={attribution}
          url={(!satellite && OSM_LAYER) || ESRI_LAYER}
        />
        <Controls map={map} onChange={satelliteHandler} />
        {position && (
          <Marker draggable={false} icon={UserMarker} position={position} />
        )}
        <LayerGroup>
          {createmode && <Draft />}
          {parcours.map(obj => (
            <Parcours key={obj.id} data={obj} map={map} />
          ))}
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
