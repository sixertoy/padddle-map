import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import {
  IoIosArrowRoundBack as ArrowLeftIcon,
  IoIosArrowRoundForward as ArrowRighIcon,
  IoIosThumbsUp as HandIcon,
} from 'react-icons/io';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  button: {
    '&.active': {
      background: '#FF5B50',
      border: '1px solid #FF5B50',
    },
    '&:hover': {
      background: '#FF5B50',
      border: '1px solid #FF5B50',
    },
    background: 'transparent',
    border: '1px solid #90CCCB',
    borderRadius: 4,
    composes: ['mx3'],
    height: 8,
    transition: 'background 0.3s',
    width: 8,
  },
  buttons: {
    composes: ['flex-columns', 'flex-center', 'items-center', 'mx12'],
    flex: '0 1 0 !important',
  },
  close: {
    '&.icon': { color: '#90CCCB' },
    color: '#FF5B50',
    composes: ['is-bold'],
    fontSize: 12,
  },
  icon: {
    color: 'rgba(0, 0, 0, 0.25)',
    fontSize: 22,
    verticalAlign: 'middle',
  },
  rideTooltipFooter: {
    composes: ['flex-columns', 'flex-center', 'items-center', 'p12'],
  },
});

const RideTooltipFooterComponent = function RideTooltipFooterComponent({
  backProps,
  closeProps,
  index: stepIndex,
  isLastStep,
  primaryProps,
  size,
}) {
  const classes = useStyles();
  return (
    <div className={classes.rideTooltipFooter}>
      <button disabled={stepIndex === 0} type="button" {...backProps}>
        <ArrowLeftIcon className={classes.icon} />
      </button>
      <div className={classes.buttons}>
        {Array.from(Array(size - 1).keys()).map(index => (
          <button
            key={`button_${index}`}
            className={classnames(classes.button, {
              active: index === stepIndex,
            })}
            type="button"
            onClick={() => {}}
          />
        ))}
      </div>
      {!isLastStep && (
        <button type="button" {...primaryProps}>
          <ArrowRighIcon className={classes.icon} />
        </button>
      )}
      {isLastStep && (
        <button className={classes.close} type="button" {...closeProps}>
          <HandIcon className="icon" />
        </button>
      )}
    </div>
  );
};

RideTooltipFooterComponent.propTypes = {
  backProps: PropTypes.shape().isRequired,
  closeProps: PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
  isLastStep: PropTypes.bool.isRequired,
  primaryProps: PropTypes.shape().isRequired,
  size: PropTypes.number.isRequired,
};

export default RideTooltipFooterComponent;
