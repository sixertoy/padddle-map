const isFacebookApp = () => {
  const ua = navigator.userAgent || navigator.vendor || window.opera;
  return ua.indexOf('FBAN') !== -1 || ua.indexOf('FBAV') !== -1;
};

export default isFacebookApp;
