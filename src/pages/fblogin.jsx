import get from 'lodash.get';
import queryString from 'query-string';
import React, { useCallback, useEffect, useState } from 'react';

import { checkLoginState } from '../core/facebook';

const FacebookLoginPageComponent = function FacebookLoginPageComponent() {
  const [query, setQuery] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);
  const [result, setResult] = useState(false);
  const [mounted, setMounted] = useState(false);

  const checkFacebookLogin = useCallback(search => {
    const parsed = queryString.parse(search);
    const state = get(parsed, 'state');
    if (state === 'facebookdirect') {
      setQuery(state);
      window.FB.getLoginStatus(response => {
        setResult(response);
        checkLoginState(response, () => setReady(true), setError);
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
      <div>Facebook Login Debug Page</div>
      <div>{ready && 'ready'}</div>
      <div>{mounted && 'mounted'}</div>
      {query && <div>query : {query}</div>}
      {(error && <div>error : {error}</div>) || <div>no error</div>}
      {(result && <div>result : {result}</div>) || <div>no result</div>}
    </div>
  );
};

export default FacebookLoginPageComponent;
