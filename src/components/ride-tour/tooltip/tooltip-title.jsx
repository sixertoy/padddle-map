import PropTypes from 'prop-types';
import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  rideTooltipTitle: {
    color: '#F04F04',
    composes: ['mx24', 'mt0', 'mb12', 'is-bold'],
  },
  [`@media (max-width: ${680}px)`]: {
    'h2.rideTooltipTitle': { fontSize: 22 },
    'h4.rideTooltipTitle': { fontSize: 14 },
  },
});

const RideTooltipTitleComponent = ({ isFirst, title }) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      {isFirst && (
        <h2 className={classes.rideTooltipTitle}>
          <span>{title}</span>
        </h2>
      )}
      {!isFirst && (
        <h4 className={classes.rideTooltipTitle}>
          <span>{title}</span>
        </h4>
      )}
    </React.Fragment>
  );
};

RideTooltipTitleComponent.propTypes = {
  isFirst: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

export default RideTooltipTitleComponent;
