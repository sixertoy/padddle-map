import { EVENT_TYPES } from '../../../constants';
import { distanceCalculation } from '../../../core';

const updateParcours = data => {
  const distance = distanceCalculation(data.points);
  const next = { ...data, distance };
  return { data: next, type: EVENT_TYPES.PARCOURS_UPDATE };
};

export default updateParcours;
