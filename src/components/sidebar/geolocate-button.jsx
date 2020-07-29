import Tippy from '@tippyjs/react';
import classnames from 'classnames';
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
    '&:edit': {},
    '&:loading': {},
    background: '#FFFFFF',
    borderRadius: '50%',
    fontSize: '1.1rem',
    height: 40,
    lineHeight: 0,
    marginBottom: 5,
    marginLeft: 9,
    outline: 'none',
    width: 40,
    zIndex: 99999,
  },
});

const GeolocateButton = ({ onGeoLocate }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const edit = useSelector(_ => _.editmode);
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
        className={classnames(classes.button, { edit, loading })}
        disabled={loading || edit}
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
