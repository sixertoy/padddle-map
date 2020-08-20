const checkIsValid = (distance, speed) =>
  distance &&
  speed &&
  typeof distance === 'number' &&
  typeof speed === 'number' &&
  !Number.isNaN(distance) &&
  !Number.isNaN(speed);

export const getTrackEstimatedMS = (distance, speed) => {
  const isvalid = checkIsValid(distance, speed);
  if (!isvalid) return null;
  const durationMins = Math.floor((distance * 60) / speed);
  const durationSeconds = durationMins * 60;
  const durationMSeconds = durationSeconds * 1000;
  return durationMSeconds;
};

export const getTrackEstimatedDuration = (distance, speed) => {
  const isvalid = checkIsValid(distance, speed);
  if (!isvalid) return '-:-';
  const durationMins = Math.floor((distance * 60) / speed);
  const hours = Math.floor(durationMins / 60);
  const minutesHours = hours * 60;
  let minutes = durationMins - minutesHours;
  if (minutes < 10) minutes = `0${minutes}`;
  return `${hours}:${minutes}`;
};
