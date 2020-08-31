import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';

const FacebookProvider = function FacebookProvider({ appId, children }) {
  const [ready, setReady] = useState(false);
  const [mounted, setMounted] = useState(false);

  const setFbAsyncInit = useCallback(() => {
    window.fbAsyncInit = () => {
      window.FB.init({
        appId,
        cookie: false,
        version: `v3.1`,
        xfbml: false,
      });
      setReady(true);
    };
  }, [appId]);

  const loadSdkAsynchronously = useCallback(() => {
    ((d, s, id) => {
      const element = d.getElementsByTagName(s)[0];
      const fjs = element;
      let js = element;
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = `https://connect.facebook.net/en_US/sdk.js`;
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }, []);

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      setFbAsyncInit();
      loadSdkAsynchronously();
    }
  }, [loadSdkAsynchronously, mounted, setFbAsyncInit]);

  return (
    <React.Fragment>
      {(ready && children) || null}
      <div id="fb-root" />
    </React.Fragment>
  );
};

FacebookProvider.propTypes = {
  appId: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default FacebookProvider;
