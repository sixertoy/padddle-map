import Tippy from '@tippyjs/react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import { IoIosSync as Loader, IoMdLocate as TargetIcon } from 'react-icons/io';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { geolocateMe } from '../../core';
import { setUserPosition } from '../../redux/actions';

const useStyles = createUseStyles({
  button: {
    '&:hover': {
      background: '#FF5850',
      color: '#FFFFFF',
    },
    background: '#FFFFFF',
    borderRadius: '50%',
    fontSize: '1.1rem',
    height: 40,
    lineHeight: 0,
    marginBottom: 5,
    marginLeft: 9,
    outline: 'none',
    transition: 'all 0.3s',
    width: 40,
  },
});

const GeolocateButton = ({ onGeoLocate }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const createmode = useSelector(_ => _.createmode);
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
        className={classnames(classes.button, { createmode, loading })}
        disabled={loading || createmode}
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
