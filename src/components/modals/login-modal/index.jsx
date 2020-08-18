import React from 'react';

import FacebookProvider from './facebook';
import GoogleProvider from './google';

const LoginModalComponent = function LoginModalComponent() {
  const isDevelopment = process.env.NODE_ENV === 'development';
  return (
    <React.Fragment>
      {isDevelopment && <GoogleProvider />}
      {!isDevelopment && <FacebookProvider />}
    </React.Fragment>
  );
};

export default LoginModalComponent;
