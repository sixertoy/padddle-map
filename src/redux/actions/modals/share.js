import { EVENT_TYPES } from '../../../constants';

export const openShareModal = () => ({ type: EVENT_TYPES.MODAL_SHARE_OPEN });

export const closeShareModal = () => ({ type: EVENT_TYPES.MODAL_SHARE_CLOSE });
