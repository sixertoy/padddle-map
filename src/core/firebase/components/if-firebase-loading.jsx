import PropTypes from 'prop-types';
import React from 'react';

import { FirebaseAuthContext, renderWithProps } from '../core';

const IfFirebaseLoading = React.memo(({ loader }) => (
  <FirebaseAuthContext.Consumer>
    {state => {
      const { isReady } = state;
      if (isReady) return null;
      return renderWithProps(loader, state);
    }}
  </FirebaseAuthContext.Consumer>
));

IfFirebaseLoading.propTypes = {
  loader: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired,
};

IfFirebaseLoading.displayName = 'IfFirebaseLoading';

export default IfFirebaseLoading;
