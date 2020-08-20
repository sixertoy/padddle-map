import {
  getTrackEstimatedDuration,
  getTrackEstimatedMS,
} from '../get-track-estimated-duration';

describe('src | helper | getTrackEstimatedDuration', () => {
  it('return 1 hour in ms', () => {
    const expected = 60 * 60 * 1000;
    const result = getTrackEstimatedMS(3.5, 3.5);
    expect(result).toStrictEqual(expected);
  });

  it('return 1h30mins in ms', () => {
    const expected = 90 * 60 * 1000;
    const result = getTrackEstimatedMS(7.5, 5);
    expect(result).toStrictEqual(expected);
  });
});

describe('src | helper | getTrackEstimatedDuration', () => {
  describe('default value if not valid arguments', () => {
    it('return default value if distance is not defined', () => {
      const result = getTrackEstimatedDuration();
      expect(result).toStrictEqual('-:-');
    });

    it('return default value if distance is not a number', () => {
      const result = getTrackEstimatedDuration('3.5');
      expect(result).toStrictEqual('-:-');
    });

    it('return default value if speed is not defined', () => {
      const result = getTrackEstimatedDuration(3.5);
      expect(result).toStrictEqual('-:-');
    });

    it('return default value if speed is not a number', () => {
      const result = getTrackEstimatedDuration(3.5, '3.5');
      expect(result).toStrictEqual('-:-');
    });
  });

  it('return 1:00', () => {
    const result = getTrackEstimatedDuration(3.5, 3.5);
    expect(result).toStrictEqual('1:00');
  });

  it('return 1:30', () => {
    const result = getTrackEstimatedDuration(7.5, 5);
    expect(result).toStrictEqual('1:30');
  });
});
