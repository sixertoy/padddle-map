export const checkIsIOS = () => {
  if (
    !navigator ||
    !navigator.plaform ||
    typeof !navigator.plaform !== 'string'
  )
    return false;
  return (
    navigator.platform.indexOf('iPhone') !== -1 ||
    navigator.platform.indexOf('iPad') !== -1 ||
    navigator.platform.indexOf('iPod') !== -1
  );
};

export default checkIsIOS;
