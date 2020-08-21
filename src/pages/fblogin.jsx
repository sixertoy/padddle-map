import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const FacebookLoginPageComponent = function FacebookLoginPageComponent() {
  const { search } = useLocation();

  const [mounted, setMounted] = useState(false);

  const checkLoginState = useCallback(() => {
    // console.log('window.FB', window.FB);
  }, []);

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      try {
        window.FB.getLoginStatus(checkLoginState);
      } catch (err) {
        window.FB.login(checkLoginState, true);
      }
    }
  }, [checkLoginState, mounted]);

  return (
    <div id="application-page" style={{ color: '#FFFFFF' }}>
      Facebook success {search}
    </div>
  );
};

export default FacebookLoginPageComponent;
