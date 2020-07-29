import { EVENT_TYPES } from '../../../constants';

const addPointDraft = latlng => {
  return { latlng, type: EVENT_TYPES.DRAFT_ADD_POINT };
};

export default addPointDraft;
