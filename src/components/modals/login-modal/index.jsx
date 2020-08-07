import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { db } from '../../../core/firebase';
import { closeLoginModal, loginUser } from '../../../redux/actions';
import FacebookProvider from './facebook';
import GoogleProvider from './google';

const LoginModalComponent = () => {
  const dispatch = useDispatch();
  const isDevelopment = process.env.NODE_ENV === 'development';

  const onSuccess = useCallback(
    ({ user }) => {
      dispatch(loginUser(user));
      dispatch(closeLoginModal());
    },
    [dispatch]
  );

  const onError = useCallback(({ code, message }) => {
    // @TODO add debug
    const id = Date.now();
    const next = { code, message };
    db.create(id, 'errors', next);
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
