import React, { useCallback, useEffect, useState } from 'react';
import { FaMapMarkerAlt as MapIcon } from 'react-icons/fa';
import { createUseStyles } from 'react-jss';
import { useLocation } from 'react-router-dom';

import { checkIsIOS } from '../../../core';

const useStyles = createUseStyles({
  button: {
    background: '#E74B43',
    borderRadius: 16,
    color: '#FFFFFF',
    composes: ['text-center'],
    height: 32,
    maxHeight: 32,
    maxWidth: 32,
    minHeight: 32,
    minWidth: 32,
    width: 32,
  },
});

const MapButtonComponent = React.memo(() => {
  const classes = useStyles();
  const location = useLocation();

  const [coords, setCoords] = useState({ lat: 0, lng: 0, zoom: 1 });

  const mapNativeAppHandler = useCallback(() => {
    const baseurl = 'google.com/maps';
    const protocol = checkIsIOS() ? 'maps' : 'https';
    const { lat, lng, zoom } = coords;
    const next = `${protocol}://${baseurl}/@${lat},${lng},${zoom}z`;
    // https://www.google.com/maps/@43.536312,3.9443311,14z
    window.open(next);
  }, [coords]);

  useEffect(() => {
    const [params] = location.pathname.split('/');
    const splitted = params.split(',');
    const [lat, lng, zoom] = splitted;
    setCoords({ lat, lng, zoom });
  }, [location, location.pathname]);

  return (
    <button
      className={classes.button}
      type="button"
      onClick={mapNativeAppHandler}>
      <MapIcon />
    </button>
  );
});

export default MapButtonComponent;
