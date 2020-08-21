import React from 'react';
import { useLocation } from 'react-router-dom';

const FacebookLoginPageComponent = function FacebookLoginPageComponent() {
  const { search } = useLocation();
  console.log(window.FB.getLoginStatus);
  return (
    <div id="application-page" style={{ color: '#FFFFFF' }}>
      Facebook success {search}
    </div>
  );
};

export default FacebookLoginPageComponent;
