import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { version } from '../../../package.json';
import { ZINDEX } from '../../constants';
import { addPointDraft, closePopup } from '../../redux/actions';
import Controls from './controls';
import { UserPositionMarker } from './icons';
import { DistanceTrack, DraftTrack, EditableTrack } from './parcours';

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
  const editmode = useSelector(_ => _.editmode);
  const position = useSelector(_ => _.userposition);
  const createmode = useSelector(_ => _.createmode);

  const [satellite, setSatellite] = useState(false);

  const satelliteClickHandler = useCallback(show => {
    setSatellite(show);
  }, []);

  const mapClickHandler = useCallback(
    evt => {
      const { latlng } = evt;
      if (selected) dispatch(closePopup());
      if (createmode) dispatch(addPointDraft(latlng));
    },
    [createmode, dispatch, selected]
  );

  const mapDragEndHandler = useCallback(
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
        onClick={mapClickHandler}
        onViewportChanged={mapDragEndHandler}>
        <TileLayer
          attribution={attribution}
          url={(!satellite && OSM_LAYER) || ESRI_LAYER}
        />
        <Controls map={map} onChange={satelliteClickHandler} />
        {parcours.map(item => {
          const iseditable = selected && selected === item.id && editmode;
          const Component = (iseditable && EditableTrack) || DistanceTrack;
          return <Component key={item.id} data={item} />;
        })}
        {createmode && <DraftTrack />}
        {position && (
          <Marker
            draggable={false}
            icon={UserPositionMarker}
            position={position}
          />
        )}
      </Map>
    </div>
  );
});

GeoMap.propTypes = {
  center: PropTypes.oneOfType([PropTypes.shape(), PropTypes.array]).isRequired,
  zoom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default GeoMap;
