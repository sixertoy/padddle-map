import { EVENT_TYPES } from '../../../constants';

const updateParcours = data => {
  return { data, type: EVENT_TYPES.PARCOURS_UPDATE };
};

export default updateParcours;
