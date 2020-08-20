import React, { useCallback, useEffect, useState } from 'react';
import { ImMap as MapIcon } from 'react-icons/im';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

// import { ReactComponent as MapIcon } from '../../../assets/google-maps.svg';
import { getGoogleMapsLink } from '../../../helpers';
import { closeModal } from '../../../redux/actions';
import { selectParcours } from '../../../redux/selectors';

const PARIS_CENTER = {
  lat: 48.8534,
  lng: 2.3488,
};

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
  const { mapconfig } = useParams();

  const parcours = useSelector(selectParcours);

  const [coords, setCoords] = useState(PARIS_CENTER);

  const mapNativeAppHandler = useCallback(() => {
    const next = getGoogleMapsLink(coords);
    window.open(next);
    dispatch(closeModal());
  }, [coords, dispatch]);

  useEffect(() => {
    if (parcours) {
      setCoords(parcours.coordinates);
    } else {
      // @TODO move modals into a route
      // to get mapconfig by useParams hook
      const [lat, lng] = mapconfig.split(',');
      if (lat && lng) setCoords({ lat, lng });
    }
  }, [parcours, mapconfig]);

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
