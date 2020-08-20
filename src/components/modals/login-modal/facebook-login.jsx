// import firebase from 'firebase/app';
import React, { useCallback } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

const FacebookLoginProviderComponent = function FacebookLoginProviderComponent() {
  const checkLoginState = useCallback(event => {
    console.log('event', event);
  }, []);

  return (
    <FacebookLogin
      autoLoad
      appId="288008652477160"
      callback={checkLoginState}
      render={({ onClick }) => (
        <button type="button" onClick={onClick}>
          This is my custom FB button
        </button>
      )}
    />
  );
};

export default FacebookLoginProviderComponent;
