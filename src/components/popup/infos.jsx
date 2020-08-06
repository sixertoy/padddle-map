import React, { useCallback } from 'react';
import { GiPathDistance as DistanceIcon } from 'react-icons/gi';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { distanceCalculation, getDistance } from '../../core';
import { updateDraft, updateParcours } from '../../redux/actions';
import { selectParcours } from '../../redux/selectors';
import Picker from '../commons/color-picker';

const useStyles = createUseStyles({
  distance: {
    background: '#FFFFFF',
    borderRadius: 16,
    color: 'rgba(0, 0, 0, 0.45)',
    composes: [
      'py5',
      'px12',
      'mr24',
      'flex-columns',
      'flex-start',
      'items-center',
    ],
    flex: 0,
    height: 32,
  },
  distanceIcon: {
    color: 'rgba(255, 89, 80, 1)',
    composes: ['mr12', 'fs16'],
  },
  distanceUnit: {
    composes: ['ml5', 'fs14', 'is-light'],
  },
  distanceValue: {
    composes: ['fs20'],
  },
});

const InfosComponent = React.memo(() => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const selected = useSelector(selectParcours);
  const createmode = useSelector(_ => _.createmode);

  const colorHandler = useCallback(
    color => {
      const next = { ...selected, color };
      if (createmode) dispatch(updateDraft(next));
      if (!createmode) dispatch(updateParcours(next));
    },
    [createmode, dispatch, selected]
  );

  const distance = !createmode
    ? getDistance(selected.distance)
    : getDistance(distanceCalculation(selected.points));

  return (
    <React.Fragment>
      <div className={classes.distance}>
        <DistanceIcon className={classes.distanceIcon} />
        <span className={classes.distanceValue}>{distance}</span>
        <span className={classes.distanceUnit}>km</span>
      </div>
      <Picker
        disabled={false}
        value={selected.color || '#800082'}
        onChange={colorHandler}
      />
    </React.Fragment>
  );
});

export default InfosComponent;
