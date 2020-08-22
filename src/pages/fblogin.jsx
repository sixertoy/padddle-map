import get from 'lodash.get';
import queryString from 'query-string';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { checkLoginState } from '../core/facebook';

const FacebookLoginPageComponent = function FacebookLoginPageComponent() {
  const debugmode = useSelector(_ => _.debugmode);
  const [query, setQuery] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);
  const [mounted, setMounted] = useState(false);

  const checkFacebookLogin = useCallback(search => {
    const parsed = queryString.parse(search);
    const state = get(parsed, 'state');
    if (state === 'facebookdirect') {
      setQuery(state);
      window.FB.getLoginStatus(response => {
        const authResponse = get(response, 'authResponse', null);
        checkLoginState(authResponse, () => setReady(true), setError);
      });
    }
  }, []);

  useEffect(() => {
    if (mounted && ready) {
      const origin = get(window, 'location.origin', null);
      window.location.href = `${origin}/#/`;
    }
    if (mounted && !ready) {
      const search = get(window, 'location.search', null);
      setQuery(search);
      if (search) checkFacebookLogin(search);
    }
    if (!mounted) {
      setMounted(true);
    }
  }, [checkFacebookLogin, mounted, ready]);

  return (
    <div id="application-page" style={{ color: '#FFFFFF' }}>
      {debugmode && (
        <React.Fragment>
          <div>Facebook Login Debug Page</div>
          <div>{ready && 'ready'}</div>
          <div>{mounted && 'mounted'}</div>
          {query && <div>query : {query}</div>}
          {(error && <div>error : {error}</div>) || <div>no error</div>}
        </React.Fragment>
      )}
    </div>
  );
};

export default FacebookLoginPageComponent;
