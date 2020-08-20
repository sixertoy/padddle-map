import get from 'lodash.get';
import { createSelector } from 'reselect';

import { PICKER_COLORS } from '../../constants';

const getDraft = _ => _.draft;
const getSelected = _ => _.selected;
const getParcours = _ => _.parcours;

const selectParcours = createSelector(
  getDraft,
  getSelected,
  getParcours,
  (draft, id, parcours) => {
    if (draft) return draft;
    const data = parcours.find(obj => obj.id === id);
    if (!data) return null;
    const color = get(data, 'color', 0);
    const hex = get(PICKER_COLORS, color, '#000000');
    return { ...data, hex };
  }
);

export default selectParcours;
