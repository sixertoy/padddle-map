import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  parcours: {
    background: '#FFF',
    borderRadius: 4,
    composes: ['p12', 'mb7'],
    width: 260,
  },
  title: {
    composes: ['is-bold'],
    fontSize: '1.2rem',
  },
});

const ParcoursComponent = ({ data }) => {
  const classes = useStyles();
  const distance = Math.round(data.distance) / 1000;

  const onClick = useCallback(() => {}, []);

  return (
    <div
      className={classes.parcours}
      data-id={data.id}
      role="button"
      tabIndex={-1}
      onClick={onClick}>
      <h1 className={classes.title}>
        <span>{data.name}</span>
      </h1>
      <div className={classes.infos}>
        <p>
          <span>Distance : </span>
          <span>{distance}</span>
        </p>
      </div>
    </div>
  );
};

ParcoursComponent.defaultProps = {};

ParcoursComponent.propTypes = {
  data: PropTypes.shape({
    distance: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default ParcoursComponent;
