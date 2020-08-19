import get from 'lodash.get';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FirebaseAuthConsumer } from '../../core/firebase';
import { isOwner } from '../../helpers';
import { updateDraft, updateParcours } from '../../redux/actions';
import { selectParcours } from '../../redux/selectors';
import Picker from '../commons/color-picker';

const PickerComponent = React.memo(function PickerComponent() {
  const dispatch = useDispatch();

  const parcours = useSelector(selectParcours);
  const createmode = useSelector(_ => _.createmode);
  const color = get(parcours, 'color', '#000000');

  const colorHandler = useCallback(
    value => {
      const next = { ...parcours, color: value };
      const action = createmode ? updateDraft : updateParcours;
      dispatch(action(next));
    },
    [createmode, dispatch, parcours]
  );

  return (
    <FirebaseAuthConsumer>
      {({ user }) => {
        const isowner = isOwner(parcours, user);
        return (
          <Picker disabled={!isowner} value={color} onChange={colorHandler} />
        );
      }}
    </FirebaseAuthConsumer>
  );
});

export default PickerComponent;
