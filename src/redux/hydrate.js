import pick from 'lodash.pick';

function hydrateModel(model, action, extend = {}) {
  const keys = Object.keys(model);
  const picked = pick(action, keys);
  const merged = { ...model, ...picked, ...extend };
  const next = Object.entries(merged).reduce((acc, entry) => {
    const [key, value] = entry;
    const processed = typeof value === 'function' ? value(action) : value;
    return { ...acc, [key]: processed };
  }, {});
  return next;
}

export default hydrateModel;
