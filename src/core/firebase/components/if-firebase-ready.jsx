import PropTypes from 'prop-types';
import React from 'react';

import { FirebaseAuthContext, renderWithProps } from '../core';

const IfFirebaseReady = React.memo(({ children, loader }) => (
  <FirebaseAuthContext.Consumer>
    {state => {
      const { isReady } = state;
      if (!isReady) return loader;
      return renderWithProps(children, state);
    }}
  </FirebaseAuthContext.Consumer>
));

IfFirebaseReady.defaultProps = {
  loader: null,
};

IfFirebaseReady.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.elementType,
    PropTypes.func,
  ]).isRequired,
  loader: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
};

IfFirebaseReady.displayName = 'IfFirebaseReady';

export default IfFirebaseReady;
