import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { createUseStyles } from 'react-jss';

import ContextMenu from './context-menu';

const useStyles = createUseStyles({
  menu: {
    composes: ['is-absolute'],
    right: 12,
    top: 12,
  },
  parcours: {
    background: '#FFF',
    borderRadius: 4,
    composes: ['p12', 'is-relative'],
    marginBottom: 7,
    width: 260,
  },
  title: {
    composes: ['is-bold', 'mb12'],
    fontSize: '1.2rem',
  },
});

const ParcoursComponent = ({ data }) => {
  const classes = useStyles();
  const distance = Math.round(data.distance) / 1000;

  const onSelect = useCallback(() => {}, []);

  return (
    <div className={classes.parcours} data-id={data.id}>
      <div className={classes.menu}>
        <ContextMenu id={data.id} />
      </div>
      <div className={classes.infos}>
        <p>
          <button className={classes.title} type="button" onClick={onSelect}>
            <span>{data.name}</span>
          </button>
        </p>
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
