import { createSelector } from 'reselect';

const getSelected = _ => _.selected;
const getParcours = _ => _.parcours;

const selectParcours = createSelector(
  getSelected,
  getParcours,
  (id, parcours) => {
    const result = parcours.find(obj => obj.id === id);
    return result;
  }
);

export default selectParcours;
