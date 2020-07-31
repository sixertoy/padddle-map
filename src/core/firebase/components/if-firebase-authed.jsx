import PropTypes from 'prop-types';
import React from 'react';

import { FirebaseAuthContext, renderWithProps } from '../core';

const IfFirebaseAuthed = React.memo(({ children }) => (
  <FirebaseAuthContext.Consumer>
    {state => {
      const { isSignedIn } = state;
      if (!isSignedIn) return null;
      return renderWithProps(children, state);
    }}
  </FirebaseAuthContext.Consumer>
));

IfFirebaseAuthed.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.elementType,
    PropTypes.func,
  ]).isRequired,
};

IfFirebaseAuthed.displayName = 'IfFirebaseAuthed';

export default IfFirebaseAuthed;
