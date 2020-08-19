import get from 'lodash.get';

import { EVENT_TYPES } from '../../../constants';
import { getDistance } from '../../../core';
import { db } from '../../../core/firebase';
import { getPathPoints } from '../../../helpers';

const commitDraft = (polygon = false) => (dispatch, getState) => {
  const { draft } = getState();
  const id = get(draft, 'id', null);
  const mtime = Date.now();
  const points = getPathPoints(draft.points);
  const [coordinates] = points;
  const distance = getDistance(points, polygon);
  const next = { ...draft, coordinates, distance, mtime, points, polygon };
  return db
    .create(id, 'parcours', next)
    .then(() => {
      dispatch({ data: next, type: EVENT_TYPES.DRAFT_COMMIT });
    })
    .catch(err => {
      // @TODO show netword error toaster
      // eslint-disable-next-line
      console.error('Firebase error => ', err);
    });
};

export default commitDraft;
