import { EVENT_TYPES } from '../../../constants';

const loadedParcours = results => {
  return { results, type: EVENT_TYPES.PARCOURS_LOADED };
};

export default loadedParcours;
