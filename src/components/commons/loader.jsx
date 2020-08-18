import React from 'react';

import { ReactComponent as SVG } from '../../assets/loader.svg';
import { ZINDEX } from '../../constants';

const LoaderComponent = function LoaderComponent() {
  return (
    <div id="application-loader" style={{ zIndex: ZINDEX.LOADER }}>
      <div className="wrapper">
        <SVG />
      </div>
    </div>
  );
};

export default LoaderComponent;
