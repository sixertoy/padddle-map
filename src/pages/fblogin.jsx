import React from 'react';
import { useParams } from 'react-router-dom';

const FacebookPageComponent = function FacebookPageComponent() {
  const { params } = useParams();
  return (
    <div id="application-page" style={{ color: '#FFFFFF' }}>
      Facebook success {params}
    </div>
  );
};

export default FacebookPageComponent;
