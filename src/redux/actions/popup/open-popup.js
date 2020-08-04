import { EVENT_TYPES } from '../../../constants';

const openPopup = id => {
  return { id, type: EVENT_TYPES.POPUP_OPEN };
};

export default openPopup;
