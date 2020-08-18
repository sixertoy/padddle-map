import Tippy from '@tippyjs/react';
import React, { useCallback } from 'react';
import { IoMdDownload as ExportIcon } from 'react-icons/io';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { toGPX } from '../../core';
import { selectParcours } from '../../redux/selectors';

const useStyles = createUseStyles({
  button: {
    '&:hover': {
      background: '#FF5850',
      color: '#FFFFFF',
    },
    background: '#FFFFFF',
    borderRadius: '50%',
    composes: ['fs18'],
    height: 40,
    lineHeight: 0,
    marginBottom: 7,
    outline: 'none',
    transition: 'all 0.3s',
    width: 40,
  },
  [`@media (max-width: ${680}px)`]: {
    button: {
      fontSize: '16px !important',
      height: 35,
      width: 35,
    },
  },
});

const ExportButtonComponent = React.memo(function ExportButtonComponent() {
  const classes = useStyles();

  const parcours = useSelector(selectParcours);

  const exportHandler = useCallback(() => {
    const gpx = toGPX(parcours.points);
    return gpx;
  }, [parcours]);

  return (
    <Tippy content="Export GPX" placement="left">
      <button
        className={classes.button}
        disabled={!parcours}
        type="button"
        onClick={exportHandler}>
        <ExportIcon />
      </button>
    </Tippy>
  );
});

export default ExportButtonComponent;
