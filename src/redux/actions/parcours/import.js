import { getName } from 'ikea-name-generator';
import { v1 as uuidv1 } from 'uuid';

import { EVENT_TYPES } from '../../../constants';
import { getDistance, ucFirst } from '../../../core';
import { db } from '../../../core/firebase';

const importParcours = ({ name, points }) => (dispatch, getState) => {
  const color = 0;
  const activity = 0;
  const id = uuidv1();
  const mtime = Date.now();
  const { user } = getState();
  const [coordinates] = points;
  const last = points.slice(-1);
  const polygon = coordinates.lat === last.lat && coordinates.lng === last.lng;
  const distance = getDistance(points, polygon);
  const data = {
    activity,
    color,
    coordinates,
    distance,
    id,
    mtime,
    name: name || ucFirst(getName()),
    points,
    polygon,
    user,
  };
  return db.create(id, 'parcours', data).then(() => {
    dispatch({ data, type: EVENT_TYPES.DRAFT_COMMIT });
  });
};

export default importParcours;
