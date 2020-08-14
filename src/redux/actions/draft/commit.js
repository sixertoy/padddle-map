import get from 'lodash.get';

import { EVENT_TYPES } from '../../../constants';
import { getDistance } from '../../../core';
import { db } from '../../../core/firebase';
import { getPathPoints, getPolygonEndPoint } from '../../../helpers';

const commitDraft = data => dispatch => {
  const id = get(data, 'id', null);
  const mtime = Date.now();
  let points = getPathPoints(data.points);
  if (data.polygon) {
    const lastpoint = getPolygonEndPoint(points);
    points = [...points, lastpoint];
  }
  const [coordinates] = points;
  const distance = getDistance(points);
  const next = { ...data, coordinates, distance, mtime, points };
  return db
    .create(id, 'parcours', next)
    .then(() => dispatch({ data: next, type: EVENT_TYPES.DRAFT_COMMIT }))
    .catch(() => {});
};

export default commitDraft;
