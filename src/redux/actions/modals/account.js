import { EVENT_TYPES } from '../../../constants';

export const openAccountModal = () => ({
  type: EVENT_TYPES.MODAL_ACCOUNT_OPEN,
});

export const closeAccountModal = () => ({
  type: EVENT_TYPES.MODAL_ACCOUNT_CLOSE,
});
