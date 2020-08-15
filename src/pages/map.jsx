import React, { createRef, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';
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
    composes: ['is-relative'],
  },
});

const MapPageComponent = () => {
  const map = createRef();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { mapconfig } = useParams();

  const parcours = useSelector(_ => _.parcours);

  const [mounted, setMounted] = useState(false);
  const [config, setConfig] = useState({
    center: FRANCE_CENTER,
    zoom: 6,
  });

  useEffect(() => {
    if (!parcours || !parcours.length) {
      db.all('parcours').then(results => {
        dispatch(loadedParcours(results));
        dispatch(appLoaded());
        setMounted(true);
      });
    } else {
      dispatch(appLoaded());
      setMounted(true);
    }
  }, [dispatch, mapconfig, mounted, parcours]);

  useEffect(() => {
    if (mounted && parcours) {
      const [lat, lng, zoom] = mapconfig.split(',');
      setConfig({ center: { lat, lng }, zoom });
    }
  }, [mapconfig, mounted, parcours]);

  return (
    <div classes={classes.container}>
      {parcours && (
        <React.Fragment>
          <Header />
          <ContextMenu />
          <Sidebar map={map} />
          <Map ref={map} config={config} />
        </React.Fragment>
      )}
    </div>
  );
};

export default MapPageComponent;
