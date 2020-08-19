import { EVENT_TYPES } from '../../../../constants';
import createDraft from '../create';

describe('src | redux | actions', () => {
  describe('draft', () => {
    describe('createDraft', () => {
      it('should dispatch a new empty draft', () => {
        const uid = '1234';
        const expected = {
          data: {
            color: 0,
            id: expect.any(String),
            name: expect.any(String),
            points: [],
            polygon: false,
            user: uid,
          },
          type: EVENT_TYPES.DRAFT_CREATE,
        };
        expect(createDraft(uid)).toEqual(expected);
      });
    });
  });
});
