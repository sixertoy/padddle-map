import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FirebaseAuthConsumer } from '../../core/firebase';
import { isOwner } from '../../helpers';
import { updateDraft, updateParcours } from '../../redux/actions';
import { selectParcours } from '../../redux/selectors';
import Picker from '../commons/color-picker';

const PickerComponent = React.memo(() => {
  const dispatch = useDispatch();

  const selected = useSelector(selectParcours);
  const createmode = useSelector(_ => _.createmode);

  const colorHandler = useCallback(
    color => {
      const next = { ...selected, color };
      if (createmode) {
        dispatch(updateDraft(next));
      } else {
        dispatch(updateParcours(next));
      }
    },
    [createmode, dispatch, selected]
  );

  return (
    <FirebaseAuthConsumer>
      {({ user }) => (
        <Picker
          disabled={!isOwner(selected, user)}
          value={selected.color}
          onChange={colorHandler}
        />
      )}
    </FirebaseAuthConsumer>
  );
});

export default PickerComponent;
