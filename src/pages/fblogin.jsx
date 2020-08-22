import get from 'lodash.get';
// import queryString from 'query-string';
import React, { useCallback, useEffect, useState } from 'react';

// const forceFacebookRedirect = () => {
//   const { origin, search } = window.location;
//   const query = queryString.parse(search);
//   const state = get(query, 'state');
//   if (state === 'facebookdirect') {
//     window.location.href = `${origin}/#/`;
//   }
// };

const FacebookLoginPageComponent = function FacebookLoginPageComponent() {
  const search = get(window, 'location.search', null);
  // if (search) forceFacebookRedirect();
  const checkUserFacebookLogin = useCallback(() => {
    window.FB.getLoginStatus(response => {
      console.log('response', response);
      // statusChangeCallback(response);
    });
  }, []);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted) {
      checkUserFacebookLogin();
      setMounted(true);
    }
  }, [checkUserFacebookLogin, mounted]);

  return (
    <div id="application-page" style={{ color: '#FFFFFF' }}>
      Facebook success {search}
    </div>
  );
};

export default FacebookLoginPageComponent;
