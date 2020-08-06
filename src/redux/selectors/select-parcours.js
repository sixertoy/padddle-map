import { createSelector } from 'reselect';

const getDraft = _ => _.draft;
const getSelected = _ => _.selected;
const getParcours = _ => _.parcours;

const selectParcours = createSelector(
  getDraft,
  getSelected,
  getParcours,
  (draft, id, parcours) => {
    if (draft) return draft;
    const result = parcours.find(obj => obj.id === id);
    return result;
  }
);

export default selectParcours;
