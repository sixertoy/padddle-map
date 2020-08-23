import PropTypes from 'prop-types';
import React from 'react';

import { FirebaseAuthContext, renderWithProps } from '../core';

const IfFirebaseUnAuthed = React.memo(({ and, children }) => (
  <FirebaseAuthContext.Consumer>
    {state => {
      const { isSignedIn } = state;
      if (isSignedIn) return null;
      const isvalid = and ? and(state) : true;
      return isvalid && renderWithProps(children, state);
    }}
  </FirebaseAuthContext.Consumer>
));

IfFirebaseUnAuthed.defaultProps = {
  and: null,
};

IfFirebaseUnAuthed.propTypes = {
  and: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.elementType,
    PropTypes.func,
  ]).isRequired,
};

IfFirebaseUnAuthed.displayName = 'IfFirebaseUnAuthed';

export default IfFirebaseUnAuthed;
