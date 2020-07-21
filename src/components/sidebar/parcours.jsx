import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { GiPathDistance as DistanceIcon } from 'react-icons/gi';
import { createUseStyles } from 'react-jss';

import ColorPicker from '../commons/color-picker';
import ContextMenu from './context-menu';

const useStyles = createUseStyles({
  color: {
    background: '#D94865',
    borderRadius: 10,
    height: 20,
    width: 20,
  },
  distance: {
    '& .icon': { marginRight: 7 },
    composes: ['flex-columns', 'items-center'],
  },
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
        <div>
          <button className={classes.title} type="button" onClick={onSelect}>
            <span>{data.name}</span>
          </button>
        </div>
        <div>
          <div className={classes.distance}>
            <DistanceIcon className="icon" />
            <span>{distance} Km</span>
          </div>
          <div>
            <ColorPicker color="#000000" onChange={() => {}} />
          </div>
        </div>
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
