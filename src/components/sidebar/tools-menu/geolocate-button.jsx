import Tippy from '@tippyjs/react';
import classnames from 'classnames';
import React, { useCallback, useState } from 'react';
import {
  IoIosSync as Loader,
  IoMdNavigate as TargetIcon,
} from 'react-icons/io';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { geolocateMe } from '../../../core';
import { geolocateUser } from '../../../redux/actions';

const useStyles = createUseStyles({
  button: {
    '& .icon': {
      transform: 'rotate(45deg)',
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

const GeolocateButton = function GeolocateButton() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const editmode = useSelector(_ => _.editmode);
  const createmode = useSelector(_ => _.createmode);

  const [loading, setLoading] = useState(false);

  const clickHandler = useCallback(() => {
    setLoading(true);
    geolocateMe().then(({ point }) => {
      setLoading(false);
      dispatch(geolocateUser(point));
    });
  }, [dispatch]);

  return (
    <Tippy content="Ma position" placement="left">
      <button
        className={classnames(classes.button, { createmode, loading })}
        disabled={loading || createmode || editmode}
        type="button"
        onClick={clickHandler}>
        {!loading && <TargetIcon className="icon" />}
        {loading && <Loader className="loader" />}
      </button>
    </Tippy>
  );
};

export default GeolocateButton;
