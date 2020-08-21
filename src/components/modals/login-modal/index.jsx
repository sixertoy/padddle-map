import React from 'react';

// import { IS_DEVELOPMENT } from '../../../constants';
import FacebookLoginProvider from './facebook-login';
// import GoogleProvider from './google';

const LoginModalComponent = function LoginModalComponent() {
  return (
    <React.Fragment>
      {/* {IS_DEVELOPMENT && <GoogleProvider />} */}
      {/* {!IS_DEVELOPMENT && <FacebookLoginProvider />} */}
      {<FacebookLoginProvider />}
    </React.Fragment>
  );
};

export default LoginModalComponent;
