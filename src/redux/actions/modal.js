import { EVENT_TYPES } from '../../constants';

export const openDeleteModal = () => ({
  type: EVENT_TYPES.MODAL_DELETE_OPEN,
});

export const openLoginModal = () => ({
  type: EVENT_TYPES.MODAL_LOGIN_OPEN,
});

export const openShareModal = () => ({
  type: EVENT_TYPES.MODAL_SHARE_OPEN,
});

export const closeModal = () => ({
  type: EVENT_TYPES.MODAL_CLOSE,
});
