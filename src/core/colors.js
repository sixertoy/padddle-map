// TODO move to nappr-core
const hexToRGB = hex => {
  // const start = hex.indexOf('#') === 0 ? 1 : 0;
  return [
    parseInt(hex.slice(1, 3), 16), // red
    parseInt(hex.slice(3, 5), 16), // blue
    parseInt(hex.slice(5, 7), 16), // green
  ];
};

export const hexToLuma = hexstr => {
  const hex = hexstr.replace(/#/, '');
  const red = parseInt(hex.substr(0, 2), 16);
  const green = parseInt(hex.substr(2, 2), 16);
  const blue = parseInt(hex.substr(4, 2), 16);
  const colors = [0.299 * red, 0.587 * green, 0.114 * blue];
  return colors.reduce((a, b) => a + b) / 255;
};

export const rgb = hex => {
  const [r, g, b] = hexToRGB(hex);
  return `rgb(${r}, ${g}, ${b})`;
};

export const rgba = (hex, alpha) => {
  const [r, g, b] = hexToRGB(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
