import { EVENT_TYPES } from '../../../constants';
import { distanceCalculation } from '../../../core';

const commitDraft = data => {
  const mtime = Date.now();
  const distance = distanceCalculation(data.points);
  const next = { distance, mtime, ...data };
  return { data: next, type: EVENT_TYPES.DRAFT_COMMIT };
};

export default commitDraft;
