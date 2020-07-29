import { EVENT_TYPES } from '../../../constants';
import { distanceCalculation } from '../../../core';

const commitDraft = data => {
  const distance = distanceCalculation(data.points);
  const next = { distance, ...data };
  return { data: next, type: EVENT_TYPES.DRAFT_COMMIT };
};

export default commitDraft;
