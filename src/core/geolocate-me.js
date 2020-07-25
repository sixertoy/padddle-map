const PARIS_CENTER = {
  lat: 48.8534,
  lng: 2.3488,
};

const getLatLng = position => {
  if (
    !position ||
    !position.coords ||
    !position.coords.latitude ||
    !position.coords.longitude
  ) {
    return PARIS_CENTER;
  }
  const { latitude, longitude } = position.coords;
  const next = { lat: latitude, lng: longitude };
  return next;
};

const geolocateMe = (allowed = true) =>
  new Promise(resolve => {
    try {
      if (!allowed && !navigator.geolocation) {
        resolve({ found: false, pos: PARIS_CENTER });
      } else {
        navigator.geolocation.getCurrentPosition(
          position => resolve({ found: true, pos: getLatLng(position) }),
          () => resolve({ found: false, pos: PARIS_CENTER }),
          { enableHighAccuracy: false, timeout: 5000 }
        );
      }
    } catch (err) {
      resolve({ found: false, pos: PARIS_CENTER });
    }
  });

export default geolocateMe;
