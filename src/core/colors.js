// TODO move to nappr-core
const hexToRGB = hex => {
  // const start = hex.indexOf('#') === 0 ? 1 : 0;
  return [
    parseInt(hex.slice(1, 3), 16), // red
    parseInt(hex.slice(3, 5), 16), // blue
    parseInt(hex.slice(5, 7), 16), // green
  ];
};

export const rgb = hex => {
  const [r, g, b] = hexToRGB(hex);
  return `rgb(${r}, ${g}, ${b})`;
};

export const rgba = (hex, alpha) => {
  const [r, g, b] = hexToRGB(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
