import Tippy from '@tippyjs/react';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import {
  IoIosRefresh as Loader,
  IoMdLocate as TargetIcon,
} from 'react-icons/io';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { geolocateMe } from '../../core';
import { setUserPosition } from '../../redux/actions';

const useStyles = createUseStyles({
  button: {
    '&:disabled': {
      background: '#CCC',
    },
    background: '#FFFFFF',
    borderRadius: '50%',
    bottom: 67,
    composes: ['is-absolute'],
    fontSize: '1.1rem',
    height: 40,
    lineHeight: 0,
    outline: 'none',
    right: 12,
    width: 40,
    zIndex: 99999,
  },
});

const GeolocateButton = ({ onGeoLocate }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const editMode = useSelector(_ => _.editmode);
  const [loading, setLoading] = useState(false);

  const clickHandler = useCallback(() => {
    setLoading(true);
    geolocateMe().then(({ point }) => {
      setLoading(false);
      dispatch(setUserPosition(point));
      onGeoLocate(point);
    });
  }, [dispatch, onGeoLocate]);

  return (
    <Tippy content="Ma position" placement="left">
      <button
        className={classes.button}
        disabled={editMode}
        type="button"
        onClick={clickHandler}>
        {!loading && <TargetIcon className="icon" />}
        {loading && <Loader className="loader" />}
      </button>
    </Tippy>
  );
};

GeolocateButton.propTypes = {
  onGeoLocate: PropTypes.func.isRequired,
};

export default GeolocateButton;
