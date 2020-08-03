import { EVENT_TYPES } from '../../../constants';

const openPopup = data => {
  return { data, type: EVENT_TYPES.POPUP_OPEN };
};

export default openPopup;
