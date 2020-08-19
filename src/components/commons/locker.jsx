import React from 'react';

import { ZINDEX } from '../../constants';

const LockerComponent = function LockerComponent() {
  return (
    <div id="application-locker" style={{ zIndex: ZINDEX.LOADER_LOCKER }} />
  );
};

export default LockerComponent;
