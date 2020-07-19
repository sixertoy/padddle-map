import { EVENT_TYPES } from '../../constants';

const deleteParcours = id => {
  return { id, type: EVENT_TYPES.PARCOURS_DELETE };
};

export default deleteParcours;
