import PropTypes from 'prop-types';
import React from 'react';
import { createUseStyles } from 'react-jss';
import { Tooltip } from 'react-leaflet';

import { getDistance } from '../../../core';

const useStyles = createUseStyles({
  distance: {
    fontSize: 11,
    fontWeight: 'light',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 7,
  },
  tooltip: {
    '&::before': {
      borderRightColor: 'rgba(0, 0, 0, 0.7) !important',
    },
    background: 'rgba(0, 0, 0, 0.7)',
    border: '1px solid rgba(0, 0, 0, 0.7) !important',
    color: '#FFF',
  },
});

const TooltipComponent = ({ distance, name }) => {
  const classes = useStyles();
  //   distanceCalculation(data.points);
  return (
    <Tooltip
      sticky
      className={classes.tooltip}
      direction="right"
      offset={[9, 0]}>
      <span className={classes.title}>{name}</span>
      <span className={classes.distance}>{getDistance(distance)} km</span>
    </Tooltip>
  );
};

TooltipComponent.defaultProps = {};

TooltipComponent.propTypes = {
  distance: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

export default TooltipComponent;
