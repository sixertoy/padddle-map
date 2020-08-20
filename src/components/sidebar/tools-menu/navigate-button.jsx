import Tippy from '@tippyjs/react';
import React, { useCallback, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { ReactComponent as MapIcon } from '../../../assets/google-maps.svg';
import { getGoogleMapsLink } from '../../../helpers';
import { selectParcours } from '../../../redux/selectors';

const useStyles = createUseStyles({
  button: {
    '& .icon': { opacity: 1, transition: 'opacity 0.3s', width: 12 },
    '&:disabled .icon': { opacity: 0.25 },
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

const NavigateButton = function NavigateButton() {
  const classes = useStyles();

  const parcours = useSelector(selectParcours);
  const editmode = useSelector(_ => _.editmode);
  const createmode = useSelector(_ => _.createmode);

  const [coords, setCoords] = useState(null);

  const mapNativeAppHandler = useCallback(() => {
    const next = getGoogleMapsLink(coords);
    window.open(next);
  }, [coords]);

  useEffect(() => {
    if (parcours) {
      setCoords(parcours.coordinates);
    } else {
      setCoords(null);
    }
  }, [parcours]);

  return (
    <Tippy content="Google Maps" placement="left">
      <button
        className={classes.button}
        disabled={!coords || createmode || editmode}
        type="button"
        onClick={mapNativeAppHandler}>
        <MapIcon className="icon" />
      </button>
    </Tippy>
  );
};

export default NavigateButton;
