const getEstimatedDuration = (distance, speed) => {
  const duration = Math.floor((distance * 60) / speed);
  const hours = Math.floor(duration / 60);
  const minuteshours = hours * 60;
  let minutes = duration - minuteshours;
  if (minutes < 10) minutes = `0${minutes}`;
  return `${hours}:${minutes}`;
};

export default getEstimatedDuration;
