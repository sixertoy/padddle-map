import MyHelper from '../myhelper';

describe('src | Helper', () => {
  it('return something', () => {
    const value = { prop: 'prop' };
    const expected = { prop: 'prop' };
    const result = MyHelper(value);
    expect(result).toStrictEqual(expected);
  });
});
