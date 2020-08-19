import { EVENT_TYPES } from '../../../../constants';
import cancelDraft from '../cancel';

describe('src | redux | actions', () => {
  describe('draft', () => {
    describe('cancelDraft', () => {
      it('should dispatch cancel the draft', () => {
        const expected = { type: EVENT_TYPES.DRAFT_CANCEL };
        expect(cancelDraft()).toEqual(expected);
      });
    });
  });
});
