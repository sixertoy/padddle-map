import get from 'lodash.get';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';

const forceFacebookRedirect = () => {
  const { origin, search } = window.location;
  const query = queryString.parse(search);
  const state = get(query, 'state');
  if (state === 'facebookdirect') {
    window.location.href = `${origin}/#/`;
    //     window.location.href = `${origin}/#/fblogin/${search}`;
  }
};

const FacebookLoginPageComponent = function FacebookLoginPageComponent() {
  const search = get(window, 'location.search', null);
  if (search) forceFacebookRedirect();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
    }
  }, [mounted]);

  return (
    <div id="application-page" style={{ color: '#FFFFFF' }}>
      Facebook success {search}
    </div>
  );
};

export default FacebookLoginPageComponent;
