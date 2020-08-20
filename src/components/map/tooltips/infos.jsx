import PropTypes from 'prop-types';
import React from 'react';
import { BsClockFill as TimeIcon } from 'react-icons/bs';
import { IoMdPin as DistanceIcon } from 'react-icons/io';
import { createUseStyles } from 'react-jss';
import { Tooltip } from 'react-leaflet';

import { AVERAGE_PADDLE_SPEED } from '../../../constants';
import { getKilometers } from '../../../core';
import { getTrackEstimatedDuration } from '../../../helpers';

const useStyles = createUseStyles({
  icon: {
    color: '#FF5950',
    marginRight: 5,
  },
  info: {
    composes: ['flex-columns', 'flex-start', 'items-center'],
    marginRight: 12,
  },
  infos: {
    color: 'rgba(0, 0, 0, 0.45)',
    composes: ['flex-columns', 'flex-start', 'items-center'],
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
      borderRightColor: '#FFFFFF !important',
    },
    background: '#FFFFFF',
    border: '1px solid #FFFFFF !important',
    color: '#000000',
    fontFamily: '"Mulish", helvetica, arial, sans-serif !important',
    opacity: '1 !important',
    padding: '6px 12px !important',
  },
});

const TooltipComponent = React.memo(({ data }) => {
  const classes = useStyles();
  const kms = getKilometers(data.distance);
  const time = getTrackEstimatedDuration(kms, AVERAGE_PADDLE_SPEED);
  return (
    <Tooltip
      // permanent
      sticky
      className={classes.tooltip}
      direction="right"
      offset={[9, 0]}>
      <div className={classes.title}>
        <span>{data.name}</span>
      </div>
      <div className={classes.infos}>
        <div className={classes.info}>
          <DistanceIcon className={classes.icon} />
          <span>{kms}&nbsp;km</span>
        </div>
        <div className={classes.info}>
          <TimeIcon className={classes.icon} />
          <span>{time}</span>
        </div>
      </div>
    </Tooltip>
  );
});

TooltipComponent.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default TooltipComponent;
