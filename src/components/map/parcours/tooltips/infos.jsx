import PropTypes from 'prop-types';
import React from 'react';
// import {
//   IoIosStar as FavoriteIcon,
//   IoIosStarOutline as FavoriteIconOutline,
// } from 'react-icons/io';
import { createUseStyles } from 'react-jss';
import { Tooltip } from 'react-leaflet';

import { getDistance } from '../../../../core';

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
    '& > span': { display: 'block' },
    '&::before': {
      borderRightColor: 'rgba(0, 0, 0, 0.7) !important',
    },
    background: 'rgba(0, 0, 0, 0.7)',
    border: '1px solid rgba(0, 0, 0, 0.7) !important',
    color: '#FFF',
  },
});

const TooltipComponent = React.memo(({ data }) => {
  const classes = useStyles();
  const value = getDistance(data.distance);
  return (
    <Tooltip
      sticky
      className={classes.tooltip}
      direction="right"
      offset={[9, 0]}>
      <span className={classes.title}>
        {/* <FavoriteIcon className={classes.icon} /> */}
        <span>{data.name}</span>
      </span>
      <span className={classes.distance}>{value}&nbsp;km</span>
    </Tooltip>
  );
});

TooltipComponent.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default TooltipComponent;
