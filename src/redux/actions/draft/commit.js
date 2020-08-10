import get from 'lodash.get';

import { EVENT_TYPES } from '../../../constants';
import { getDistance } from '../../../core';
import { db } from '../../../core/firebase';

const commitDraft = data => dispatch => {
  const id = get(data, 'id', null);
  const mtime = Date.now();
  const [coordinates] = data.points;
  const distance = getDistance(data.points, data.polygon);
  const next = { ...data, coordinates, distance, mtime };
  return db
    .create(id, 'parcours', next)
    .then(() => dispatch({ data: next, type: EVENT_TYPES.DRAFT_COMMIT }))
    .catch(() => {});
};

export default commitDraft;
