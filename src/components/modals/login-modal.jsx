import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { closeLoginModal, loginUser } from '../../redux/actions';
import FacebookProvider from './providers/facebook';
import GoogleProvider from './providers/google';

const LoginModalComponent = () => {
  const dispatch = useDispatch();
  const isDevelopment = process.env.NODE_ENV === 'development';

  const onSuccess = useCallback(
    result => {
      dispatch(loginUser(result.user));
      dispatch(closeLoginModal());
    },
    [dispatch]
  );

  const onError = useCallback(() => {
    // @TODO add debug
  }, []);

  return (
    <React.Fragment>
      {isDevelopment && (
        <GoogleProvider onError={onError} onSuccess={onSuccess} />
      )}
      {!isDevelopment && (
        <FacebookProvider onError={onError} onSuccess={onSuccess} />
      )}
    </React.Fragment>
  );
};

export default LoginModalComponent;
