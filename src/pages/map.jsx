import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';

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
  const [position, setPosition] = useState(null);

  useEffect(() => {
    geolocateMe().then(({ point }) => setPosition(point));
  }, [position]);

  return (
    <div classes={classes.container} id="app-container">
      {!position && <Loader />}
      {position && (
        <React.Fragment>
          <div className={classes.version}>
            <small>v{version}</small>
          </div>
          <Sidebar />
          <GeoMap isGeolocated center={position} />
        </React.Fragment>
      )}
    </div>
  );
};

export default MapPageComponent;
