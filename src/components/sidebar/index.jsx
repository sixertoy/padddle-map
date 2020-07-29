import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { createUseStyles } from 'react-jss';

import BigButton from './big-button';
import GeoLocateButton from './geolocate-button';

const useStyles = createUseStyles({
  container: {
    bottom: 40,
    composes: ['is-absolute'],
    height: 60,
    right: 12,
    width: 60,
    zIndex: 99999,
  },
  wrapper: {
    composes: ['is-relative'],
  },
});

const SidebarComponent = ({ map }) => {
  const classes = useStyles();

  const geolocateHandler = useCallback(
    point => {
      const lmap = map.current.leafletElement;
      const zoom = lmap.getZoom() < 12 ? 12 : lmap.getZoom();
      lmap.setView(point, zoom);
    },
    [map]
  );

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <BigButton />
        <GeoLocateButton onGeoLocate={geolocateHandler} />
      </div>
    </div>
  );
};

SidebarComponent.propTypes = {
  map: PropTypes.shape().isRequired,
};

export default SidebarComponent;
