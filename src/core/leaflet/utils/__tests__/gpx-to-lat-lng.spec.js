// @TODO pouvoir charger un fichier qui n'est pas un fichier .spec.js ou .js
import GPXNoLon from '../../../../mocks/gpx-no-lon';
import GPXNoTracks from '../../../../mocks/gpx-no-tracks';
import GPXContent from '../../../../mocks/gpx-valid';
import gpxToLatLng from '../gpx-to-latlng';

describe('src | core | leaflet | utils', () => {
  describe('gpxToLatLng', () => {
    it('argument should be a string', () => {
      let result = gpxToLatLng();
      expect(result).toEqual(null);
      result = gpxToLatLng([]);
      expect(result).toEqual(null);
    });

    it('should return an object', () => {
      const result = gpxToLatLng(GPXContent);
      expect(typeof result).toBe('object');
      expect(Array.isArray(result)).toBe(false);
    });

    it('should contain props "name" et "points"', () => {
      const result = gpxToLatLng(GPXContent);
      expect(result).toEqual(
        expect.objectContaining({
          name: expect.any(String),
          points: expect.any(Array),
        })
      );
    });

    it('return points are not return null', () => {
      const result = gpxToLatLng(GPXNoTracks);
      expect(result).toEqual(null);
    });

    it('return points are not no lon null', () => {
      const result = gpxToLatLng(GPXNoLon);
      expect(result).toEqual(null);
    });
  });
});
