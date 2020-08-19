import get from 'lodash.get';
import React, { useCallback } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { isOwner } from '../../helpers';
import { updateDraft, updateParcours } from '../../redux/actions';
import { selectParcours } from '../../redux/selectors';
import Picker from '../commons/color-picker';

const useStyles = createUseStyles({
  picker: ({ size }) => ({
    flex: 0,
    height: size,
    marginLeft: 8,
    width: size,
  }),
});

const PickerComponent = function PickerComponent() {
  const size = 32;
  const classes = useStyles({ size });
  const dispatch = useDispatch();

  const parcours = useSelector(selectParcours);
  const user = useSelector(_ => _.user);
  const createmode = useSelector(_ => _.createmode);

  const color = get(parcours, 'color', '#000000');
  const isowner = isOwner(parcours, user);

  const colorHandler = useCallback(
    value => {
      const next = { ...parcours, color: value };
      const action = createmode ? updateDraft : updateParcours;
      dispatch(action(next));
    },
    [createmode, dispatch, parcours]
  );

  return (
    <div className={classes.picker}>
      <Picker
        disabled={!isowner}
        size={32}
        value={color}
        onChange={colorHandler}
      />
    </div>
  );
};

export default PickerComponent;
