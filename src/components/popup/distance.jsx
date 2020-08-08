import React from 'react';
import { GiPathDistance as DistanceIcon } from 'react-icons/gi';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { distanceCalculation, getDistance } from '../../core';
import { selectParcours } from '../../redux/selectors';

const useStyles = createUseStyles({
  distance: {
    background: '#FF5950',
    borderRadius: 16,
    color: '#FFFFFF',
    composes: ['py5', 'px12', 'flex-columns', 'flex-between', 'items-center'],
    flex: 0,
    height: 32,
    width: 140,
  },
  distanceIcon: {
    color: '#FFFFFF',
    composes: ['mr12', 'fs16'],
  },
  distanceUnit: {
    composes: ['ml5', 'fs14', 'is-light'],
  },
  distanceValue: {
    composes: ['fs18'],
  },
  [`@media (max-width: ${680}px)`]: {
    distance: {
      justifyContent: 'flex-start',
      width: 'auto',
    },
    distanceIcon: {
      display: 'none',
      visibility: 'hidden',
    },
    distanceUnit: {
      fontSize: '1em',
      marginLeft: 3,
    },
    distanceValue: {
      fontSize: '1em',
    },
  },
});

const DistanceComponent = () => {
  const classes = useStyles();

  const selected = useSelector(selectParcours);
  const createmode = useSelector(_ => _.createmode);

  const distance = !createmode
    ? getDistance(selected.distance)
    : getDistance(distanceCalculation(selected.points));

  return (
    <div className={classes.distance}>
      <DistanceIcon className={classes.distanceIcon} />
      <span className={classes.distanceValue}>{distance || '-'}</span>
      <span className={classes.distanceUnit}>km</span>
    </div>
  );
};

export default DistanceComponent;
