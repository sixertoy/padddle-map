import { EVENT_TYPES } from '../../../constants';

const getDistance = points => {
  const distance = points
    .reduce((acc, latlng, index, list) => {
      const prev = list[index - 1] || latlng;
      const next = latlng.distanceTo(prev);
      return [...acc, next];
    }, [])
    .reduce((acc, value) => acc + value, 0);
  return distance;
};

const commitDraft = data => {
  const distance = getDistance(data.points);
  const next = { distance, ...data };
  return { data: next, type: EVENT_TYPES.DRAFT_COMMIT };
};

export default commitDraft;
