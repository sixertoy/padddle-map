import React, { createRef, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useParams } from 'react-router-dom';

import Header from '../components/layout/header';
import Map from '../components/map';
import Sidebar from '../components/sidebar';
import { FRANCE_CENTER } from '../constants';

const useStyles = createUseStyles({
  container: {
    background: '#90CCCB',
    composes: ['is-relative'],
  },
});

const MapPageComponent = () => {
  const map = createRef();
  const classes = useStyles();
  const { mapconfig } = useParams();

  const [mounted, setMounted] = useState(false);
  const [config, setConfig] = useState({
    center: FRANCE_CENTER,
    zoom: 6,
  });

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      if (mapconfig) {
        const [lat, lng, zoom] = mapconfig.split(',');
        setConfig({ center: { lat, lng }, zoom });
      }
    }
  }, [mapconfig, mounted]);

  return (
    <div classes={classes.container} id="app-container">
      <Header />
      <Sidebar map={map} />
      <Map ref={map} center={config.center} zoom={config.zoom} />
    </div>
  );
};

export default MapPageComponent;
