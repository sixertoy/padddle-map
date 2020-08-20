import Tippy from '@tippyjs/react';
import get from 'lodash.get';
import pick from 'lodash.pick';
import React, { useCallback } from 'react';
import { GiPathDistance as PathIcon } from 'react-icons/gi';
import { SiGooglemaps as MapIcon } from 'react-icons/si';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import { getDistance, getKilometers } from '../../core';
import { getGoogleMapsLink } from '../../helpers';
import { selectParcours } from '../../redux/selectors';

const useStyles = createUseStyles({
  button: {
    color: '#FFFFFF',
    composes: ['flex-columns', 'flex-between', 'items-center'],
    height: '100%',
    width: '100%',
  },
  distance: {
    background: '#FF5950',
    borderRadius: '0 8px 8px 0',
    flex: '0 !important',
    height: '100%',
    padding: '7px 12px',
  },
  distanceIcon: {
    color: '#FFFFFF',
    composes: ['mr12', 'fs16', 'no-select'],
  },
  distanceUnit: {
    composes: ['ml5', 'fs14', 'is-light', 'no-select'],
  },
  distanceValue: {
    composes: ['fs18', 'no-select'],
  },
  [`@media (max-width: ${680}px)`]: {
    distance: { borderRadius: 0, minWidth: 130, width: 130 },
    distanceIcon: { fontSize: 16, marginRight: '5px !important' },
    distanceUnit: { fontSize: 16 },
    distanceValue: { fontSize: 16 },
  },
  [`@media (max-width: ${320}px)`]: {
    distance: { minWidth: 100, width: 100 },
    distanceIcon: { fontSize: 10, marginRight: '5px !important' },
    distanceUnit: { fontSize: 10 },
    distanceValue: { fontSize: 10 },
  },
});

const DistanceComponent = function DistanceComponent() {
  const classes = useStyles();
  const isMobile = useMediaQuery({ query: '(max-width: 680px)' });

  const parcours = useSelector(selectParcours);
  const createmode = useSelector(_ => _.createmode);
  const { distance, points } = pick(parcours, ['distance', 'points']);

  const onClick = useCallback(() => {
    const coords = get(parcours, ['coordinates'], null);
    if (!coords) return;
    const next = getGoogleMapsLink(coords);
    window.open(next);
  }, [parcours]);

  const kms = !createmode
    ? getKilometers(distance, false)
    : getKilometers(getDistance(points, false));

  // IoIosNavigate
  return (
    <div className={classes.distance}>
      <Tippy content="Ouvrir dans Google Maps" placement="top-end">
        <button className={classes.button} type="button" onClick={onClick}>
          {!isMobile && <PathIcon className={classes.distanceIcon} />}
          {isMobile && <MapIcon className={classes.distanceIcon} />}
          <span className={classes.distanceValue}>{kms || '-'}</span>
          <span className={classes.distanceUnit}>km</span>
        </button>
      </Tippy>
    </div>
  );
};

export default DistanceComponent;
