import PropTypes from 'prop-types';
import React from 'react';
import { GiPathDistance as DistanceIcon } from 'react-icons/gi';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  button: {},
});

const DistanceButtonComponent = ({ onChange }) => {
  const classes = useStyles();
  return (
    <button
      className={classes.button}
      type="button"
      onClick={() => onChange('distance')}>
      <DistanceIcon />
    </button>
  );
};

DistanceButtonComponent.defaultProps = {};

DistanceButtonComponent.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default DistanceButtonComponent;
