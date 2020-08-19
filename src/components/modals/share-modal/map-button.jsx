import React, { useCallback, useEffect, useState } from 'react';
// import { FaMapMarkerAlt as MapIcon } from 'react-icons/fa';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { ReactComponent as MapIcon } from '../../../assets/google-maps.svg';
import { checkIsNotAppleDevice } from '../../../core';
import { closeModal } from '../../../redux/actions';
import { selectParcours } from '../../../redux/selectors';

const PARIS_CENTER = {
  lat: 48.8534,
  lng: 2.3488,
};

const useStyles = createUseStyles({
  button: {
    '& .icon': {
      width: 12,
    },
    background: '#202124',
    borderRadius: 16,
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

  const [coords, setCoords] = useState(PARIS_CENTER);

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
      if (lat && lng) setCoords({ lat, lng });
    }
  }, [pathname, parcours]);

  return (
    <button
      className={classes.button}
      disabled={!coords}
      type="button"
      onClick={mapNativeAppHandler}>
      <MapIcon className="icon" />
    </button>
  );
};

export default MapButtonComponent;
