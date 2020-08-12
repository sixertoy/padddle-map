import { EVENT_TYPES } from '../../constants';

export const closeSelected = () => {
  return { type: EVENT_TYPES.SELECTED_CLOSE };
};

export const openSelected = id => {
  return { id, type: EVENT_TYPES.SELECTED_OPEN };
};
