import get from 'lodash.get';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useLocation } from 'react-router-dom';

import { version } from '../../package.json';
import Loader from '../components/commons/loader';
import GeoMap from '../components/map';
import Sidebar from '../components/sidebar';
import { geolocateMe } from '../core';

const useStyles = createUseStyles({
  container: {
    position: 'relative',
  },
  version: {
    bottom: 10,
    fontSize: '0.6rem',
    left: 10,
    position: 'absolute',
    zIndex: 100000000,
  },
});

const MapPageComponent = () => {
  const classes = useStyles();
  const { search } = useLocation();
  const [geoloc, setGeoloc] = useState(false);
  const [position, setPosition] = useState(null);

  useEffect(() => {
    const query = queryString.parse(search);
    const next = get(query, 'geoloc', false) === '1';
    setGeoloc(next);
  }, [search]);

  useEffect(() => {
    geolocateMe(geoloc).then(({ point }) => setPosition(point));
  }, [geoloc, position]);

  return (
    <div classes={classes.container} id="app-container">
      {!position && <Loader />}
      {position && (
        <React.Fragment>
          <div className={classes.version}>
            <small>v{version}</small>
          </div>
          <Sidebar />
          <GeoMap center={position} isGeolocated={geoloc} />
        </React.Fragment>
      )}
    </div>
  );
};

export default MapPageComponent;
