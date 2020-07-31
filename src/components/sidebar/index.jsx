import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { createUseStyles } from 'react-jss';

import { ZINDEX } from '../../constants';
import BigButton from './big-button';
import GeoLocateButton from './geolocate-button';
import ShareButton from './share-button';

const useStyles = createUseStyles({
  sidebar: {
    bottom: 32,
    composes: ['is-absolute'],
    right: 12,
    width: 60,
    zIndex: ZINDEX.SIDEBAR,
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
    <div className={classes.sidebar}>
      <ShareButton />
      <GeoLocateButton onGeoLocate={geolocateHandler} />
      <BigButton />
    </div>
  );
};

SidebarComponent.propTypes = {
  map: PropTypes.shape().isRequired,
};

export default SidebarComponent;
