import React from 'react';
import { useMediaQuery } from 'react-responsive';

import { IS_DEVELOPMENT } from '../../../constants';
import FacebookProvider from './facebook';
import FacebookLoginProvider from './facebook-login';
import GoogleProvider from './google';

const LoginModalComponent = function LoginModalComponent() {
  const isMobile = useMediaQuery({ query: '(max-width: 680px)' });
  return (
    <React.Fragment>
      {IS_DEVELOPMENT && <GoogleProvider />}
      {!IS_DEVELOPMENT && (
        <React.Fragment>
          {!isMobile && <FacebookProvider />}
          {isMobile && <FacebookLoginProvider />}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default LoginModalComponent;
