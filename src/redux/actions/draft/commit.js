import get from 'lodash.get';

import { EVENT_TYPES } from '../../../constants';
import { getDistance } from '../../../core';
import { db } from '../../../core/firebase';
import { getPathPoints } from '../../../helpers';

const commitDraft = data => dispatch => {
  const { points, polygon } = data;
  const id = get(data, 'id', null);
  const mtime = Date.now();
  const pts = getPathPoints(points);
  const [coordinates] = pts;
  const distance = getDistance(pts, polygon);
  const next = { ...data, coordinates, distance, mtime, points: pts };
  return db
    .create(id, 'parcours', next)
    .then(() => dispatch({ data: next, type: EVENT_TYPES.DRAFT_COMMIT }))
    .catch(() => {});
};

export default commitDraft;
