import isOwner from '../is-owner';

describe('src | helpers | isOwner', () => {
  it('return false', () => {
    const value = { prop: 'prop' };
    const expected = { prop: 'prop' };
    const result = isOwner(value);
    expect(result).toStrictEqual(expected);
  });
});
