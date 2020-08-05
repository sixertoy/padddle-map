import { EVENT_TYPES } from '../../../constants';

const updateDraft = data => {
  const mtime = Date.now();
  const next = { ...data, mtime };
  return { data: next, type: EVENT_TYPES.DRAFT_UPDATE };
};

export default updateDraft;
