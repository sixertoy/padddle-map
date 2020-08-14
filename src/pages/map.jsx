import React, { createRef, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import ContextMenu from '../components/context-menu';
import Header from '../components/header';
import Map from '../components/map';
import Sidebar from '../components/sidebar';
import { FRANCE_CENTER } from '../constants';
import { db } from '../core/firebase';
import { appLoaded, loadedParcours } from '../redux/actions';

const useStyles = createUseStyles({
  container: {
    background: '#90CCCB',
    composes: ['is-relative'],
  },
});

const MapPageComponent = () => {
  const map = createRef();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { mapconfig } = useParams();

  const [mounted, setMounted] = useState(false);
  const [config, setConfig] = useState({
    center: FRANCE_CENTER,
    zoom: 6,
  });

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      db.all('parcours').then(results => {
        dispatch(loadedParcours(results));
        dispatch(appLoaded());
      });
      if (mapconfig) {
        const [lat, lng, zoom] = mapconfig.split(',');
        setConfig({ center: { lat, lng }, zoom });
      }
    }
  }, [dispatch, mapconfig, mounted]);

  return (
    <div classes={classes.container} id="app-container">
      <Header />
      <ContextMenu />
      <Sidebar map={map} />
      <Map ref={map} center={config.center} zoom={config.zoom} />
    </div>
  );
};

export default MapPageComponent;
