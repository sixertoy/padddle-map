import React from 'react';
import { useLocation } from 'react-router-dom';

const FacebookPageComponent = function FacebookPageComponent() {
  const location = useLocation();
  return (
    <div id="application-page" style={{ color: '#FFFFFF' }}>
      Facebook success {location}
    </div>
  );
};

export default FacebookPageComponent;
