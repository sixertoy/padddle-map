import Tippy from '@tippyjs/react';
import React, { useCallback, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { ReactComponent as MapIcon } from '../../../assets/google-maps.svg';
import { getGoogleMapsLink } from '../../../helpers';
import { selectParcours } from '../../../redux/selectors';

const useStyles = createUseStyles({
  button: {
    '& .icon': {
      width: 12,
    },
    '&:hover': {
      background: '#FF5850',
      color: '#FFFFFF',
    },
    background: '#FFFFFF',
    borderRadius: '50%',
    composes: ['fs18', 'mb7'],
    height: 40,
    lineHeight: 0,
    outline: 'none',
    transition: 'all 0.3s',
    width: 40,
  },
});

const PARIS_CENTER = {
  lat: 48.8534,
  lng: 2.3488,
};

const NavigateButton = function NavigateButton() {
  const classes = useStyles();
  const { mapconfig } = useParams();

  const parcours = useSelector(selectParcours);
  const editmode = useSelector(_ => _.editmode);
  const createmode = useSelector(_ => _.createmode);

  const [coords, setCoords] = useState(PARIS_CENTER);

  const mapNativeAppHandler = useCallback(() => {
    const next = getGoogleMapsLink(coords);
    window.open(next);
  }, [coords]);

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
    <Tippy content="Google Maps" placement="left">
      <button
        className={classes.button}
        disabled={createmode || editmode}
        type="button"
        onClick={mapNativeAppHandler}>
        <MapIcon className="icon" />
      </button>
    </Tippy>
  );
};

export default NavigateButton;
