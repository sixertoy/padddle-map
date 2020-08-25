import PropTypes from 'prop-types';
import React from 'react';
import { createUseStyles } from 'react-jss';
import { useMediaQuery } from 'react-responsive';

import { ZINDEX } from '../../../constants';
import LayerControls from './layer-controls';
import ZoomControls from './zoom-controls';

const useStyles = createUseStyles({
  controls: {
    composes: ['is-absolute'],
    marginRight: 22,
    marginTop: 12,
    right: 0,
    top: 0,
    zIndex: ZINDEX.MAP_CONTROLS,
  },
  wrapper: {
    composes: ['is-relative', 'flex-rows', 'flex-center', 'items-center'],
  },
  [`@media (max-width: ${680}px)`]: {
    controls: {
      marginRight: 8,
    },
  },
});

const MapControlsComponent = React.memo(function MapControlsComponent({
  onChange,
}) {
  const classes = useStyles();
  const isMobile = useMediaQuery({ query: '(max-width: 680px)' });

  return (
    <div className={classes.controls} id="ride-step-mapcontrols">
      <div className={classes.wrapper}>
        {!isMobile && <ZoomControls />}
        <LayerControls onChange={onChange} />
      </div>
    </div>
  );
});

MapControlsComponent.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default MapControlsComponent;
