import { EVENT_TYPES } from '../../constants';

const updateParcours = ({ point }) => {
  const data = { point };
  return { data, type: EVENT_TYPES.PARCOURS_UPDATE };
};

export default updateParcours;
