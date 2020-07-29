import { EVENT_TYPES } from '../../../constants';

const updateDraft = data => {
  return { data, type: EVENT_TYPES.DRAFT_UPDATE };
};

export default updateDraft;
