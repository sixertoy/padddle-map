import React from 'react';
import { useSelector } from 'react-redux';

import { IS_DEVELOPMENT } from '../../../constants';
import FacebookProvider from './facebook';
import FacebookLoginProvider from './facebook-login';
import GoogleProvider from './google';

const LoginModalComponent = function LoginModalComponent() {
  const debugMode = useSelector(_ => _.debugmode);
  return (
    <React.Fragment>
      {debugMode && <FacebookLoginProvider />}
      {!debugMode && IS_DEVELOPMENT && <GoogleProvider />}
      {!debugMode && !IS_DEVELOPMENT && <FacebookProvider />}
    </React.Fragment>
  );
};

export default LoginModalComponent;
