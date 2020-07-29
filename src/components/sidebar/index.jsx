import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { createUseStyles } from 'react-jss';

import BigButton from './big-button';
import GeoLocateButton from './geolocate-button';

const useStyles = createUseStyles({
  menu: {
    bottom: 40,
    composes: ['is-absolute'],
    height: 60,
    right: 12,
    width: 60,
    zIndex: 99999,
  },
});

const SidebarComponent = ({ isUserVisible, map }) => {
  const classes = useStyles();

  const clickHandler = useCallback(
    point => {
      const { leafletElement: lmap } = map.current;
      lmap.setView(point, lmap.getZoom());
    },
    [map]
  );

  return (
    <div className={classes.container}>
      <div className={classes.menu}>
        <BigButton />
        <GeoLocateButton
          isUserVisible={isUserVisible}
          onGeoLocate={clickHandler}
        />
      </div>
    </div>
  );
};

SidebarComponent.propTypes = {
  isUserVisible: PropTypes.bool.isRequired,
  map: PropTypes.shape().isRequired,
};

export default SidebarComponent;
