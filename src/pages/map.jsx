import get from 'lodash.get';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useParams } from 'react-router-dom';

import Header from '../components/header';
import Map from '../components/map';
import Modals from '../components/modals';
import Popup from '../components/popup';
import RideTour from '../components/ride-tour';
import {
  BigButton,
  ConnectButton,
  ContextMenu,
  ToolsMenu,
} from '../components/sidebar';
import { PARIS_CENTER } from '../constants';
import { db, IfFirebaseAuthed, IfFirebaseUnAuthed } from '../core/firebase';
import { loadedParcours, updateAppReadyState } from '../redux/actions';
import { selectAppReady, selectDemoMode } from '../redux/selectors';

const MapPageComponent = function MapPageComponent() {
  const dispatch = useDispatch();
  const { mapconfig } = useParams();
  const isMobile = useMediaQuery({ query: '(max-width: 680px)' });

  const modal = useSelector(_ => _.modal);
  const ready = useSelector(selectAppReady);
  const demomode = useSelector(selectDemoMode);
  const selected = useSelector(_ => _.selected);

  const [mounted, setMounted] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [config, setConfig] = useState({
    center: PARIS_CENTER,
    zoom: 6,
  });

  useEffect(() => {
    const tracks = get(ready, 'tracks', null);
    if (mounted && !tracks) {
      db.all('parcours').then(result => {
        dispatch(loadedParcours(result));
        dispatch(updateAppReadyState({ tracks: true }));
      });
    }
  }, [dispatch, mounted, ready]);

  useEffect(() => {
    const tracks = get(ready, 'tracks', null);
    if (mounted && tracks && !initialized) {
      if (mapconfig) {
        const [lat, lng, zoom] = mapconfig.split(',');
        setConfig({ center: { lat, lng }, zoom });
      }
      setInitialized(true);
    }
  }, [initialized, mapconfig, mounted, ready]);

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
    }
  }, [mounted]);

  return (
    <React.Fragment>
      {initialized && demomode.unauthed && <RideTour />}
      <div id="application-page">
        <React.Fragment>
          <Header />
          <ToolsMenu />
          <IfFirebaseUnAuthed and={() => isMobile && !selected}>
            <ConnectButton />
          </IfFirebaseUnAuthed>
          <IfFirebaseAuthed>
            <ContextMenu />
            <BigButton />
          </IfFirebaseAuthed>
          <Map config={config} />
        </React.Fragment>
      </div>
      {modal && <Modals type={modal} />}
      {selected && <Popup />}
    </React.Fragment>
  );
};

export default MapPageComponent;
