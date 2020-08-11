import getPathPoints from '../get-path-points';

describe('src | helper | getPathPoint', () => {
  it('return flatten array if source is nested + nested array', () => {
    const value = [
      [[{ lat: 1 }, { lat: 2 }], { lat: 1 }, { lat: 3 }],
      { lat: 1 },
    ];
    const expected = [
      { lat: 1 },
      { lat: 2 },
      { lat: 1 },
      { lat: 3 },
      { lat: 1 },
    ];
    const result = getPathPoints(value);
    expect(result).toStrictEqual(expected);
  });

  it('return flatten array if source is nested array', () => {
    const value = [[{ lat: 1 }, { lat: 2 }, { lat: 3 }]];
    const expected = [{ lat: 1 }, { lat: 2 }, { lat: 3 }];
    const result = getPathPoints(value);
    expect(result).toStrictEqual(expected);
  });

  it('return non flatten array if source is non nested array', () => {
    const value = [{ lat: 1 }, { lat: 2 }, { lat: 3 }];
    const expected = [{ lat: 1 }, { lat: 2 }, { lat: 3 }];
    const result = getPathPoints(value);
    expect(result).toStrictEqual(expected);
  });
});
