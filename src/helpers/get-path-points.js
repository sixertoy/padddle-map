const flattenizer = items =>
  items.reduce((acc, item) => {
    const isarray = Array.isArray(item);
    if (!isarray) return [...acc, item];
    return [...acc, ...flattenizer(item)];
  }, []);

const getPathPoints = points => {
  const pathpoints = flattenizer(points);
  return pathpoints;
};

export default getPathPoints;
