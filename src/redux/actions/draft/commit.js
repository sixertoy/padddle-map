import get from 'lodash.get';

import { EVENT_TYPES } from '../../../constants';
import { getDistance } from '../../../core';
import { db } from '../../../core/firebase';
import { getPathPoints } from '../../../helpers';

const commitDraft = data => dispatch => {
  const id = get(data, 'id', null);
  const mtime = Date.now();
  const flattend = getPathPoints(data.points);
  const [coordinates] = flattend;
  const distance = getDistance(flattend);
  const next = { ...data, coordinates, distance, mtime, points: flattend };
  return db
    .create(id, 'parcours', next)
    .then(() => dispatch({ data: next, type: EVENT_TYPES.DRAFT_COMMIT }))
    .catch(() => {});
};

export default commitDraft;
