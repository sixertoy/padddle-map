import uniqBy from 'lodash.uniqby';

const uniqLatLngString = obj => `${obj.lat},${obj.lng}`;

const flattenizer = items =>
  items.reduce((acc, item) => {
    const isarray = Array.isArray(item);
    if (!isarray) return [...acc, item];
    return [...acc, ...flattenizer(item)];
  }, []);

const getPathPoints = points => {
  const flattend = flattenizer(points);
  const uniqs = uniqBy(flattend, uniqLatLngString);
  return uniqs;
};

export default getPathPoints;
