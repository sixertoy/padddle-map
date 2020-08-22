import get from 'lodash.get';
import pick from 'lodash.pick';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';

import { checkLoginState } from '../core/facebook';

const FacebookLoginPageComponent = function FacebookLoginPageComponent() {
  const [ready, setReady] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (mounted && !ready) {
      const { search } = pick(window.location, ['search', 'origin']);
      const query = queryString.parse(search);
      const state = get(query, 'state');
      if (state === 'facebookdirect') {
        window.FB.getLoginStatus(response => {
          checkLoginState(response, () => {
            setReady(true);
          });
        });
      }
    }
  }, [mounted, ready]);

  useEffect(() => {
    if (ready) {
      const { origin } = pick(window.location, ['search', 'origin']);
      window.location.href = `${origin}/#/`;
    }
  }, [ready]);

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
    }
  }, [mounted]);

  return <div id="application-page" />;
};

export default FacebookLoginPageComponent;
