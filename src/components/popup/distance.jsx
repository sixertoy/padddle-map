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
    borderRadius: '0 8px 8px 0',
    color: '#FFFFFF',
    composes: ['flex-columns', 'flex-between', 'items-center'],
    flex: '0 !important',
    height: '100%',
    padding: '7px 12px',
  },
  distanceIcon: {
    color: '#FFFFFF',
    composes: ['mr12', 'fs16', 'no-select'],
  },
  distanceUnit: {
    composes: ['ml5', 'fs14', 'is-light', 'no-select'],
  },
  distanceValue: {
    composes: ['fs18', 'no-select'],
  },
  [`@media (max-width: ${680}px)`]: {
    distance: { borderRadius: 0, width: 130 },
    distanceIcon: { fontSize: 16, marginRight: '5px !important' },
    distanceUnit: { fontSize: 16 },
    distanceValue: { fontSize: 16 },
  },
  [`@media (max-width: ${320}px)`]: {
    distance: { width: 100 },
    distanceIcon: { fontSize: 10, marginRight: '5px !important' },
    distanceUnit: { fontSize: 10 },
    distanceValue: { fontSize: 10 },
  },
});

const DistanceComponent = function DistanceComponent() {
  const classes = useStyles();

  const parcours = useSelector(selectParcours);
  const createmode = useSelector(_ => _.createmode);
  const { distance, points } = pick(parcours, ['distance', 'points']);

  const kms = !createmode
    ? getKilometers(distance, false)
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
