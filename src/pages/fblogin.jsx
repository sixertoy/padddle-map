import get from 'lodash.get';
import queryString from 'query-string';
import React, { useCallback, useEffect, useState } from 'react';

import { checkLoginState } from '../core/facebook';

const FacebookLoginPageComponent = function FacebookLoginPageComponent() {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);
  const [mounted, setMounted] = useState(false);

  const checkFacebookLogin = useCallback(search => {
    const query = queryString.parse(search);
    const state = get(query, 'state');
    if (state === 'facebookdirect') {
      window.FB.getLoginStatus(response => {
        checkLoginState(
          response,
          () => setReady(true),
          err => setError(err)
        );
      });
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      const search = get(window, 'location.search', null);
      if (search) checkFacebookLogin(search);
    }
  }, [checkFacebookLogin, mounted, ready]);

  useEffect(() => {
    if (ready) {
      const origin = get(window, 'location.origin', null);
      window.location.href = `${origin}/#/`;
    }
  }, [ready]);

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
    }
  }, [mounted]);

  return (
    <div id="application-page" style={{ color: '#FFFFFF' }}>
      <div>Facebook Login Debug Page</div>
      <div>{ready && 'ready'}</div>
      <div>{mounted && 'mounted'}</div>
      {error && <div>error : {error}</div>}
    </div>
  );
};

export default FacebookLoginPageComponent;
