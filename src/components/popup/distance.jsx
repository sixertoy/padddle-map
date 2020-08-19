import pick from 'lodash.pick';
import React from 'react';
import { GiPathDistance as DistanceIcon } from 'react-icons/gi';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { getDistance, getKilometers } from '../../core';
import { selectParcours } from '../../redux/selectors';

const useStyles = createUseStyles({
  distance: {
    background: '#FF5950',
    color: '#FFFFFF',
    composes: ['flex-columns', 'flex-between', 'items-center'],
    height: '100%',
    maxWidth: 140,
    padding: '7px 12px',
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
    distanceIcon: { fontSize: 16, marginRight: '5px !important' },
    distanceUnit: { fontSize: 16 },
    distanceValue: { fontSize: 16 },
  },
});

const DistanceComponent = function DistanceComponent() {
  const classes = useStyles();

  const parcours = useSelector(selectParcours);
  const createmode = useSelector(_ => _.createmode);
  const { distance, points } = pick(parcours, ['distance', 'points']);

  const kms = !createmode
    ? getKilometers(distance)
    : getKilometers(getDistance(points, false));

  return (
    <div className={classes.distance}>
      <DistanceIcon className={classes.distanceIcon} />
      <span className={classes.distanceValue}>{kms || '-'}</span>
      <span className={classes.distanceUnit}>km</span>
    </div>
  );
};

export default DistanceComponent;
