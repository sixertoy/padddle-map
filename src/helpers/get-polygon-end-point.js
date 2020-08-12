// import { countDecimals } from '../core';
// const getLowValueFrom = previous => {
//   const count = countDecimals(previous);
//   const expon = 10 ** count;
//   const reducer = 1 / expon;
//   const less = previous - reducer;
//   return less;
// };

const getLowValueFrom = previous => {
  const str = String(previous);
  const len = str.length;
  const last = str.charAt(len - 1);
  const sliced = str.slice(0, len - 1);
  const less = Number(last) === 0 ? Number(last) + 1 : Number(last) - 1;
  const reduced = Number(`${Number(sliced)}${Number(less)}`);
  return reduced;
};

const getPolygonEndPoint = points => {
  const [{ lat, lng }] = points;
  return { lat: getLowValueFrom(lat), lng: getLowValueFrom(lng) };
};

export default getPolygonEndPoint;
