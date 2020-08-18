export const ucFirst = str => {
  const first = str.charAt(0).toUpperCase();
  const rest = str.slice(1).toLowerCase();
  return `${first}${rest}`;
};

export default ucFirst;
