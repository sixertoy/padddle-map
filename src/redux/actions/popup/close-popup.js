import { EVENT_TYPES } from '../../../constants';

const closePopup = () => {
  return { type: EVENT_TYPES.POPUP_CLOSE };
};

export default closePopup;
