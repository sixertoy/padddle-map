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

const MapPageComponent = function MapPageComponent() {
  const map = createRef();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { mapconfig } = useParams();

  const parcoursLoaded = useSelector(_ => _.parcoursLoaded);

  const [ready, setReady] = useState(false);
  const [config, setConfig] = useState({
    center: FRANCE_CENTER,
    zoom: 6,
  });

  useEffect(() => {
    if (!parcoursLoaded) {
      db.all('parcours').then(results => {
        dispatch(loadedParcours(results));
        dispatch(appLoaded());
      });
    }
  }, [dispatch, parcoursLoaded]);

  useEffect(() => {
    if (parcoursLoaded && !ready) {
      if (mapconfig) {
        const [lat, lng, zoom] = mapconfig.split(',');
        setConfig({ center: { lat, lng }, zoom });
        setReady(true);
      } else {
        setReady(true);
      }
    }
  }, [mapconfig, parcoursLoaded, ready]);

  return (
    <div classes={classes.container}>
      {ready && (
        <React.Fragment>
          <Header />
          <ContextMenu />
          <Sidebar />
          <Map ref={map} config={config} />
        </React.Fragment>
      )}
    </div>
  );
};

export default MapPageComponent;
