import get from 'lodash.get';
import { createSelector } from 'reselect';

import { PICKER_COLORS } from '../../constants';

const getUser = _ => _.user;
const getParcours = _ => _.parcours;

const selectParcours = createSelector(getUser, getParcours, (uid, parcours) => {
  const result = parcours
    .map(obj => {
      // filter not valid
      const validated = get(obj, 'validated', false);
      if (!validated && !uid) return null;
      const user = get(obj, 'user', false);
      const isowner = user === uid;
      if (!validated && !isowner) return null;

      // results
      const color = get(obj, 'color', 0);
      const hex = get(PICKER_COLORS, color, '#000000');
      return { ...obj, hex };
    })
    .filter(v => v);
  return result;
});

export default selectParcours;
