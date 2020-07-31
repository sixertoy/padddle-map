import { EVENT_TYPES } from '../../../constants';

export const openLoginModal = () => ({ type: EVENT_TYPES.MODAL_LOGIN_OPEN });

export const closeLoginModal = () => ({ type: EVENT_TYPES.MODAL_LOGIN_CLOSE });
