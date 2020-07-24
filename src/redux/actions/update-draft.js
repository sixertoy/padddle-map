import { EVENT_TYPES } from '../../constants';

const updateDraft = latlng => {
  return { latlng, type: EVENT_TYPES.DRAFT_UPDATE };
};

export default updateDraft;
