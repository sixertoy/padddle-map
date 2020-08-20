import React from 'react';

// import { IS_DEVELOPMENT } from '../../../constants';
import FacebookProvider from './facebook';
// import GoogleProvider from './google';

const LoginModalComponent = function LoginModalComponent() {
  return (
    <React.Fragment>
      <FacebookProvider />
      {/* {IS_DEVELOPMENT && <GoogleProvider />}
      {!IS_DEVELOPMENT && <FacebookProvider />} */}
    </React.Fragment>
  );
};

export default LoginModalComponent;
