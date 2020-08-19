import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Header from '../components/header';
import Map from '../components/map';
import Modals from '../components/modals';
import Popup from '../components/popup';
import { BigButton, ToolsMenu } from '../components/sidebar';
import { FRANCE_CENTER } from '../constants';
import { db, IfFirebaseAuthed } from '../core/firebase';
import { appLoaded, loadedParcours } from '../redux/actions';

const MapPageComponent = function MapPageComponent() {
  const dispatch = useDispatch();
  const { mapconfig } = useParams();

  const modal = useSelector(_ => _.modal);
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
      <div id="application-page">
        {ready && (
          <React.Fragment>
            <Header />
            <ToolsMenu />
            <IfFirebaseAuthed>
              <React.Fragment>
                {/* <ContextMenu /> */}
                <BigButton />
              </React.Fragment>
            </IfFirebaseAuthed>
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
