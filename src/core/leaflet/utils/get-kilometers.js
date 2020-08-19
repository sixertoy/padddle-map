const getKilometers = (meters, rounded = true) => {
  const kms = Math.round(meters) / 1000;
  return !rounded ? kms : Math.round(kms);
};

export default getKilometers;
