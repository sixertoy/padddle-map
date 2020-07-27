import React, { useCallback, useState } from 'react';
import { AiOutlineLoading3Quarters as Loader } from 'react-icons/ai';
import { IoMdLocate as TargetIcon } from 'react-icons/io';
import { createUseStyles } from 'react-jss';
import { useLeaflet } from 'react-leaflet';

import { geolocateMe } from '../../core';

const useStyles = createUseStyles({
  button: {
    background: '#FFFFFF',
    borderRadius: '50%',
    bottom: 107,
    composes: ['is-absolute'],
    fontSize: '1.1rem',
    height: 40,
    lineHeight: 0,
    outline: 'none',
    right: 24,
    width: 40,
    zIndex: 99999,
  },
});

const GeolocateButton = () => {
  const classes = useStyles();
  const { map } = useLeaflet();
  const [loading, setLoading] = useState(false);

  const onClick = useCallback(() => {
    setLoading(true);
    geolocateMe().then(({ point }) => {
      setLoading(false);
      map.flyTo(point);
    });
  }, [map]);

  return (
    <button className={classes.button} type="button" onClick={onClick}>
      {!loading && <TargetIcon />}
      {loading && <Loader className="loader" />}
    </button>
  );
};

GeolocateButton.propTypes = {};

export default GeolocateButton;
