import { createSelector } from 'reselect';

import { isOwner } from '../../helpers';

const getUser = _ => _.user;
const getDraft = _ => _.draft;
const getSelected = _ => _.selected;
const getParcours = _ => _.parcours;

const selectParcours = createSelector(
  getDraft,
  getUser,
  getSelected,
  getParcours,
  (draft, user, id, parcours) => {
    if (draft) return draft;
    const data = parcours.find(obj => obj.id === id);
    const owner = isOwner(parcours, user);
    return { ...data, owner };
  }
);

export default selectParcours;
