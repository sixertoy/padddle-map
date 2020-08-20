import Tippy from '@tippyjs/react';
import pick from 'lodash.pick';
import React, { useCallback } from 'react';
import { IoMdCloudDownload as ExportIcon } from 'react-icons/io';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { AVERAGE_PADDLE_SPEED } from '../../../constants';
import { getKilometers, latlngToGPX, slugify } from '../../../core';
import { getTrackEstimatedMS } from '../../../helpers';
import { selectParcours } from '../../../redux/selectors';

const useStyles = createUseStyles({
  button: {
    '&:hover': {
      background: '#FF5850',
      color: '#FFFFFF',
    },
    background: '#FFFFFF',
    borderRadius: '50%',
    composes: ['fs18', 'mb7'],
    height: 40,
    lineHeight: 0,
    outline: 'none',
    transition: 'all 0.3s',
    width: 40,
  },
});

const ExportButtonComponent = function ExportButtonComponent() {
  const classes = useStyles();

  const parcours = useSelector(selectParcours);

  const downloadTxtFile = useCallback((name, content) => {
    const elt = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain;charset=utf-8' });
    elt.href = URL.createObjectURL(file);
    elt.download = `${name}.gpx`;
    document.body.appendChild(elt);
    elt.click();
  }, []);

  const exportHandler = useCallback(() => {
    const { distance, name } = pick(parcours, ['distance', 'name']);
    const slugified = slugify(name);
    const kms = getKilometers(distance);
    const durationms = getTrackEstimatedMS(kms, AVERAGE_PADDLE_SPEED);
    const gpx = latlngToGPX(parcours, durationms);
    downloadTxtFile(slugified, gpx);
  }, [downloadTxtFile, parcours]);

  return (
    <Tippy content="Export to GPX" placement="left">
      <button
        className={classes.button}
        disabled={!parcours}
        type="button"
        onClick={exportHandler}>
        <ExportIcon />
      </button>
    </Tippy>
  );
};

export default ExportButtonComponent;
