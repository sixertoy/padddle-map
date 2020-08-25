import PropTypes from 'prop-types';
import React from 'react';
import { createUseStyles } from 'react-jss';

import TooltipFooter from './tooltip-footer';
import TooltipHeader from './tooltip-header';
import TooltipTitle from './tooltip-title';

const useStyles = createUseStyles({
  button: {
    background: '#F04F04',
    color: '#FFFFFF',
    marginRight: 0,
    padding: '1.1rem',
  },
  rideTooltipBody: {
    background: '#FFFFFF',
    borderRadius: 8,
    composes: ['is-relative', 'no-overflow'],
    maxWidth: 280,
    minWidth: 280,
  },
  rideTooltipContent: {
    color: '#000000',
    composes: ['mx24', 'my0'],
    lineHeight: '1.1rem',
  },
  [`@media (max-width: ${680}px)`]: {
    rideTooltipContent: {
      fontSize: 12,
    },
  },
});

const RideTooltipComponent = function RideTooltipComponent(props) {
  const classes = useStyles();
  const { index, size, step, tooltipProps } = props;
  return (
    <div className={classes.rideTooltipBody} {...tooltipProps}>
      <TooltipHeader {...props} />
      {step.title && <TooltipTitle isFirst={index === 0} title={step.title} />}
      <div className={classes.rideTooltipContent}>{step.content}</div>
      <TooltipFooter total={size} {...props} />
    </div>
  );
};

RideTooltipComponent.propTypes = {
  index: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  step: PropTypes.shape().isRequired,
  tooltipProps: PropTypes.shape().isRequired,
};

export default RideTooltipComponent;
