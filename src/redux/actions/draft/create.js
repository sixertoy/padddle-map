import { EVENT_TYPES } from '../../../constants';

const createDraft = () => {
  return { type: EVENT_TYPES.DRAFT_CREATE };
};

export default createDraft;
