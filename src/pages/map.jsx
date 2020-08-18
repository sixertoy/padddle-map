import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';
// import { useMediaQuery } from 'react-responsive';
import { useParams } from 'react-router-dom';

import ContextMenu from '../components/context-menu';
import Header from '../components/header';
import Map from '../components/map';
import Modals from '../components/modals';
import Popup from '../components/popup';
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
  const classes = useStyles();
  const dispatch = useDispatch();
  const { mapconfig } = useParams();

  // const isMobile = useMediaQuery({ query: '(max-width: 680px)' });

  const modal = useSelector(_ => _.modal);
  // const draft = useSelector(_ => _.draft);
  // const editmode = useSelector(_ => _.editmode);
  const selected = useSelector(_ => _.selected);
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
    <React.Fragment>
      <div classes={classes.container}>
        {ready && (
          <React.Fragment>
            <Header />
            <ContextMenu />
            <Sidebar />
            <Map config={config} />
          </React.Fragment>
        )}
      </div>
      {modal && <Modals type={modal} />}
      {selected && <Popup />}
    </React.Fragment>
  );
};

export default MapPageComponent;
