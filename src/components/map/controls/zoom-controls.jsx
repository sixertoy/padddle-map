import React, { useCallback } from 'react';
import { MdAdd as PlusIcon, MdRemove as MoinsIcon } from 'react-icons/md';
import { createUseStyles } from 'react-jss';
import { useLeaflet } from 'react-leaflet';

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
  zoomer: {
    borderRadius: 16,
    composes: ['is-relative', 'mb7', 'flex-row', 'flex-start', 'no-overflow'],
    height: 64,
    width: 32,
  },
});

const ZoomControlsComponent = () => {
  const classes = useStyles();
  const { map: lmap } = useLeaflet();

  const zoomHandler = useCallback(() => {
    const zoom = lmap.getZoom();
    lmap.setZoom(zoom + 1);
  }, [lmap]);

  const unzoomHandler = useCallback(() => {
    const zoom = lmap.getZoom();
    lmap.setZoom(zoom - 1);
  }, [lmap]);

  return (
    <div className={classes.zoomer}>
      <button className={classes.button} type="button" onClick={zoomHandler}>
        <PlusIcon />
      </button>
      <button className={classes.button} type="button" onClick={unzoomHandler}>
        <MoinsIcon />
      </button>
    </div>
  );
};

export default ZoomControlsComponent;
