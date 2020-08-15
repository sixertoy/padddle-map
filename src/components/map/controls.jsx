import Tippy from '@tippyjs/react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import { FaSatelliteDish as SatelliteIcon } from 'react-icons/fa';
import { MdAdd as PlusIcon, MdRemove as MoinsIcon } from 'react-icons/md';
import { createUseStyles } from 'react-jss';
import { useMediaQuery } from 'react-responsive';

import { ZINDEX } from '../../constants';

const useStyles = createUseStyles({
  button: {
    '&:hover': {
      background: '#FF5950',
      color: '#FFFFFF',
    },
    background: '#FFFFFF',
    composes: ['text-center'],
    height: 32,
    transition: 'all 0.3s',
    width: 32,
  },
  controls: {
    composes: ['is-absolute'],
    right: 22,
    top: 12,
    zIndex: ZINDEX.MAP_CONTROLS,
  },
  viewer: {
    '&.active': {
      background: '#FF5950',
      color: '#FFFFFF',
    },
    borderRadius: 20,
    composes: ['fs18'],
    height: 40,
    width: 40,
  },
  wrapper: {
    composes: ['is-relative', 'flex-rows', 'flex-center', 'items-center'],
  },
  zoomer: {
    borderRadius: 16,
    composes: ['is-relative', 'mb7', 'flex-row', 'flex-start', 'no-overflow'],
    height: 64,
    width: 32,
  },
  [`@media (max-width: ${680}px)`]: {
    button: {
      fontSize: '16px !important',
      height: 35,
      width: 35,
    },
    controls: { right: 12 },
  },
});

const ControlsComponent = ({ map, onChange }) => {
  const classes = useStyles();
  const [satellite, setSatellite] = useState(false);

  const isMobile = useMediaQuery({ query: '(max-width: 680px)' });

  const satelliteHandler = useCallback(() => {
    const next = !satellite;
    setSatellite(next);
    onChange(next);
  }, [onChange, satellite]);

  const zoomHandler = useCallback(() => {
    const lmap = map.current.leafletElement;
    const zoom = lmap.getZoom();
    lmap.setZoom(zoom + 1);
  }, [map]);

  const unzoomHandler = useCallback(() => {
    const lmap = map.current.leafletElement;
    const zoom = lmap.getZoom();
    lmap.setZoom(zoom - 1);
  }, [map]);

  return (
    <div className={classes.controls}>
      <div className={classes.wrapper}>
        {!isMobile && (
          <div className={classes.zoomer}>
            <button
              className={classes.button}
              type="button"
              onClick={zoomHandler}>
              <PlusIcon />
            </button>
            <button
              className={classes.button}
              type="button"
              onClick={unzoomHandler}>
              <MoinsIcon />
            </button>
          </div>
        )}
        <Tippy content="Vue satellite" placement="left">
          <button
            className={classnames(classes.button, classes.viewer, {
              active: satellite,
            })}
            type="button"
            onClick={satelliteHandler}>
            <SatelliteIcon />
          </button>
        </Tippy>
      </div>
    </div>
  );
};

ControlsComponent.propTypes = {
  map: PropTypes.shape().isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ControlsComponent;
