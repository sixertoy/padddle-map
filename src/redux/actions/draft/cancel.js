import { EVENT_TYPES } from '../../../constants';

const cancelDraft = () => {
  return { type: EVENT_TYPES.DRAFT_CANCEL };
};

export default cancelDraft;
