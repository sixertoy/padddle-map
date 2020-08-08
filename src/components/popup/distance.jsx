import React from 'react';
import { GiPathDistance as DistanceIcon } from 'react-icons/gi';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { distanceCalculation, getDistance } from '../../core';
import { selectParcours } from '../../redux/selectors';

const useStyles = createUseStyles({
  distance: {
    background: '#FFFFFF',
    borderRadius: 16,
    color: 'rgba(0, 0, 0, 0.45)',
    composes: ['py5', 'px12', 'flex-columns', 'flex-start', 'items-center'],
    flex: 0,
    height: 32,
  },
  distanceIcon: {
    color: 'rgba(255, 89, 80, 1)',
    composes: ['mr12', 'fs16'],
  },
  distanceUnit: {
    composes: ['ml5', 'fs14', 'is-light'],
  },
  distanceValue: {
    composes: ['fs20'],
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
