import React from 'react';
import { createUseStyles } from 'react-jss';
import { LeafletProvider } from 'react-leaflet';

import GeoMap from '../components/map';
import Sidebar from '../components/sidebar';

const useStyles = createUseStyles({
  container: {
    background: '#90CCCB',
    composes: ['is-relative'],
  },
  version: {
    bottom: 10,
    composes: ['is-absolute'],
    fontSize: '0.6rem',
    left: 10,
    zIndex: 100000000,
  },
});

const MapPageComponent = () => {
  const classes = useStyles();
  return (
    <LeafletProvider>
      <div classes={classes.container} id="app-container">
        <Sidebar />
        <GeoMap />
      </div>
    </LeafletProvider>
  );
};

export default MapPageComponent;
