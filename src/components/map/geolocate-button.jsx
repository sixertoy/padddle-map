import Tippy from '@tippyjs/react';
import debounce from 'lodash.debounce';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { AiOutlineLoading3Quarters as Loader } from 'react-icons/ai';
import { IoMdLocate as TargetIcon } from 'react-icons/io';
import { createUseStyles } from 'react-jss';
import { useLeaflet } from 'react-leaflet';

import { geolocateMe } from '../../core';

const useStyles = createUseStyles({
  button: {
    '&:disabled .icon': {
      opacity: 0.5,
    },
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

const GeolocateButton = ({ onPosition }) => {
  const classes = useStyles();
  const { map } = useLeaflet();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const onClick = useCallback(() => {
    setLoading(true);
    setDisabled(true);
    geolocateMe().then(({ point }) => {
      setPosition(point);
      setDisabled(false);
      setLoading(false);
      onPosition(point);
    });
  }, [onPosition]);

  const moveEndHandler = useCallback(
    debounce(() => {
      const next = (position && map.getBounds().contains(position)) || false;
      setDisabled(next);
    }, 1000),
    [disabled, loading, map, position]
  );

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      map.on('moveend', moveEndHandler);
    }
  }, [map, mounted, moveEndHandler, position]);

  return (
    <Tippy content="Ma position" placement="left">
      <button
        className={classes.button}
        disabled={disabled}
        type="button"
        onClick={onClick}>
        {!loading && <TargetIcon className="icon" />}
        {loading && <Loader className="loader" />}
      </button>
    </Tippy>
  );
};

GeolocateButton.propTypes = {
  onPosition: PropTypes.func.isRequired,
};

export default GeolocateButton;
