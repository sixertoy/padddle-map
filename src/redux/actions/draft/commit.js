import { getName } from 'ikea-name-generator';
import { v1 as uuidv1 } from 'uuid';

import { EVENT_TYPES } from '../../../constants';
import { ucFirst } from '../../../core';

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
  const id = uuidv1();
  const color = '#D94865';
  const name = ucFirst(getName());
  const distance = getDistance(data.points);
  const next = { color, distance, id, name, ...data };
  return { data: next, type: EVENT_TYPES.DRAFT_COMMIT };
};

export default commitDraft;
