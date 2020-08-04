import React from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { distanceCalculation, getDistance } from '../../core';
import { selectParcours } from '../../redux/selectors';

const useStyles = createUseStyles({
  distance: {},
});

const DistanceComponent = React.memo(() => {
  const classes = useStyles();

  const selected = useSelector(selectParcours);
  const createmode = useSelector(_ => _.createmode);

  const distance = !createmode
    ? getDistance(selected.distance)
    : getDistance(distanceCalculation(selected.points));

  return (
    <div className={classes.distance}>
      <span>{distance}&nbsp;km</span>
    </div>
  );
});

DistanceComponent.defaultProps = {};

DistanceComponent.propTypes = {};

export default DistanceComponent;
