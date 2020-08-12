import getPolygonEndPoint from '../get-polygon-end-point';

describe('src | helpers | getPolygonEndPoint', () => {
  it('returns reduced lat/lng exp 9', () => {
    const value = [
      { lat: 0.123456789, lng: 0.987654321 },
      { lat: 1.123456789, lng: 3.987654321 },
      { lat: 2.123456789, lng: 4.987654321 },
    ];
    const expected = { lat: 0.123456788, lng: 0.98765432 };
    const result = getPolygonEndPoint(value);
    expect(result).toStrictEqual(expected);
  });

  it('returns reduced lat/lng exp 14', () => {
    const value = [
      { lat: 0.12345678912345, lng: 0.98765432198765 },
      { lat: 1.12345678912345, lng: 3.98765432198765 },
      { lat: 2.12345678912345, lng: 4.98765432198765 },
    ];
    const expected = { lat: 0.12345678912344, lng: 0.98765432198764 };
    const result = getPolygonEndPoint(value);
    expect(result).toStrictEqual(expected);
  });

  it('returns reduced lat/lng exp 16', () => {
    const value = [
      { lat: 0.1234567891234567, lng: 0.9876543219876543 },
      { lat: 1.1234567891234567, lng: 3.9876543219876543 },
      { lat: 2.1234567891234567, lng: 4.9876543219876543 },
    ];
    const expected = { lat: 0.1234567891234566, lng: 0.9876543219876542 };
    const result = getPolygonEndPoint(value);
    expect(result).toStrictEqual(expected);
  });
});
