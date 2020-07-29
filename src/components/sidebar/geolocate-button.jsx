import Tippy from '@tippyjs/react';
import React, { useCallback, useState } from 'react';
import { AiOutlineLoading3Quarters as Loader } from 'react-icons/ai';
import { IoMdLocate as TargetIcon } from 'react-icons/io';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { geolocateMe } from '../../core';
import { setPosition } from '../../redux/actions';

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

const GeolocateButton = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const isGeolocated = useSelector(_ => _.isgeolocated);

  const onClick = useCallback(() => {
    setLoading(true);
    geolocateMe().then(({ point }) => {
      setLoading(false);
      dispatch(setPosition(point));
    });
  }, [dispatch]);

  // const moveEndHandler = useCallback(
  // debounce(() => {
  //   const next = (position && map.getBounds().contains(position)) || false;
  //   setDisabled(next);
  // }, 1000),
  // []
  // );

  return (
    <Tippy content="Ma position" placement="left">
      <button
        className={classes.button}
        disabled={isGeolocated}
        type="button"
        onClick={onClick}>
        {!loading && <TargetIcon className="icon" />}
        {loading && <Loader className="loader" />}
      </button>
    </Tippy>
  );
};

export default GeolocateButton;
