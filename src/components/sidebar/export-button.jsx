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
    composes: ['mb7', 'fs18'],
    height: 40,
    lineHeight: 0,
    outline: 'none',
    transition: 'all 0.3s',
    width: 40,
  },
});

// eslint-disable-next-line
const ExportButtonComponent = () => {
  const classes = useStyles();

  const selected = useSelector(selectParcours);
  console.log('selected', selected);

  const exportHandler = useCallback(() => {
    const gpx = toGPX(selected.points);
    console.log('gpx', gpx);
  }, [selected]);

  return (
    <Tippy content="Export GPX" placement="left">
      <button
        className={classes.button}
        disabled={!selected}
        type="button"
        onClick={exportHandler}>
        <ExportIcon />
      </button>
    </Tippy>
  );
};

export default ExportButtonComponent;
