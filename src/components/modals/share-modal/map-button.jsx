import React, { useCallback, useEffect, useState } from 'react';
import { FaMapMarkerAlt as MapIcon } from 'react-icons/fa';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { checkIsNotAppleDevice } from '../../../core';
import { closeModal } from '../../../redux/actions';
import { selectParcours } from '../../../redux/selectors';

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

const MapButtonComponent = function MapButtonComponent() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const parcours = useSelector(selectParcours);

  const [coords, setCoords] = useState({ lat: 0, lng: 0 });

  const mapNativeAppHandler = useCallback(() => {
    const { lat, lng } = coords;
    const baseurl = 'maps.google.com/maps';
    const isAndroid = checkIsNotAppleDevice();
    const query = `q=${lat},${lng}&ll=${lat},${lng}&z=13`;
    const protocol = isAndroid ? 'geo' : 'https';
    const next = `${protocol}://${baseurl}?${query}`;
    window.open(next);
    dispatch(closeModal());
  }, [coords, dispatch]);

  useEffect(() => {
    if (parcours) {
      setCoords(parcours.coordinates);
    } else {
      // @TODO move modals into a route
      // to get mapconfig by useParams hook
      const mapconfig = pathname.slice(1);
      const [lat, lng] = mapconfig.split(',');
      setCoords({ lat, lng });
    }
  }, [pathname, parcours]);

  return (
    <button
      className={classes.button}
      type="button"
      onClick={mapNativeAppHandler}>
      <MapIcon />
    </button>
  );
};

export default MapButtonComponent;
