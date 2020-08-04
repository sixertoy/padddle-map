import { createSelector } from 'reselect';

const getSelected = _ => _.selected;
const getParcours = _ => _.parcours;

const selectParcours = createSelector(
  getSelected,
  getParcours,
  (id, parcours) => parcours.find(obj => obj.id === id)
);

export default selectParcours;
