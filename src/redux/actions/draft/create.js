import { getName } from 'ikea-name-generator';
import { v1 as uuidv1 } from 'uuid';

import { EVENT_TYPES } from '../../../constants';
import { ucFirst } from '../../../core';

const createDraft = uid => {
  const points = [];
  const id = uuidv1();
  const color = '#800082';
  const name = ucFirst(getName());
  const data = { color, id, name, points, user: uid };
  return { data, type: EVENT_TYPES.DRAFT_CREATE };
};

export default createDraft;
