import PropTypes from 'prop-types';
import React from 'react';
import { IoIosClose as CloseIcon } from 'react-icons/io';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  button: {
    color: '#919191',
    fontSize: '1.4rem',
  },
  rideTooltipHeader: {
    composes: ['mx12', 'mt12', 'mb0', 'text-right'],
  },
});

const RideTooltipFooterComponent = function RideTooltipFooterComponent({
  skipProps,
}) {
  const classes = useStyles();
  return (
    <div className={classes.rideTooltipHeader}>
      <button className={classes.button} type="button" {...skipProps}>
        <CloseIcon />
      </button>
    </div>
  );
};

RideTooltipFooterComponent.propTypes = {
  skipProps: PropTypes.shape().isRequired,
};

export default RideTooltipFooterComponent;
