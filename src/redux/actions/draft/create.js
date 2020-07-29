import { getName } from 'ikea-name-generator';
import { v1 as uuidv1 } from 'uuid';

import { EVENT_TYPES } from '../../../constants';
import { ucFirst } from '../../../core';

const createDraft = () => {
  const id = uuidv1();
  const color = '#800081';
  const name = ucFirst(getName());
  const data = { color, id, name };
  return { data, type: EVENT_TYPES.DRAFT_CREATE };
};

export default createDraft;
