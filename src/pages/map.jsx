import React, { createRef, useCallback, useEffect, useState } from 'react';
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
  const map = createRef();
  const classes = useStyles();
  const [mounted, setMounted] = useState(false);
  const [isUserVisible, setUserVisible] = useState(false);

  const moveEndHandler = useCallback(({ userIsVisible }) => {
    setUserVisible(userIsVisible);
  }, []);

  useEffect(() => {
    const lmap = (map && map.current && map.current.leafletElement) || null;
    if (lmap && !mounted) {
      setMounted(true);
      map.current.leafletElement.on('movend', moveEndHandler);
    }
    return () => {
      if (!lmap) return;
      lmap.off('movend', moveEndHandler);
    };
  }, [map, mounted, moveEndHandler]);

  return (
    <LeafletProvider>
      <div classes={classes.container} id="app-container">
        <Sidebar isUserVisible={isUserVisible} map={map} />
        <GeoMap ref={map} onMoveEnd={moveEndHandler} />
      </div>
    </LeafletProvider>
  );
};

export default MapPageComponent;
