import Tippy from '@tippyjs/react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import { FaSatelliteDish as SatelliteIcon } from 'react-icons/fa';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  button: {
    '&.active': {
      background: '#FF5950',
      color: '#FFFFFF',
    },
    '&:hover': {
      background: '#FF5950',
      color: '#FFFFFF',
    },
    background: '#FFFFFF',
    borderRadius: 20,
    composes: ['text-center', 'fs18'],
    height: 40,
    transition: 'all 0.3s',
    width: 40,
  },
});

const LayerControlsComponent = React.memo(function LayerControlsComponent({
  onChange,
}) {
  const classes = useStyles();

  const [satellite, setSatellite] = useState(false);

  const satelliteHandler = useCallback(() => {
    const next = !satellite;
    setSatellite(next);
    onChange(next);
  }, [onChange, satellite]);

  const label = satellite ? 'Vue classique' : 'Vue satellite';
  return (
    <Tippy content={label} placement="left">
      <button
        className={classnames(classes.button, {
          active: satellite,
        })}
        type="button"
        onClick={satelliteHandler}>
        <SatelliteIcon />
      </button>
    </Tippy>
  );
});

LayerControlsComponent.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default LayerControlsComponent;
