import React from 'react';
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

const SidebarComponent = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.menu}>
        <BigButton />
        <GeoLocateButton />
      </div>
    </div>
  );
};

export default SidebarComponent;
