import PropTypes from 'prop-types';
import React from 'react';

import { FirebaseAuthContext } from '../core';

const FirebaseAuthConsumer = ({ children }) => {
  return (
    <FirebaseAuthContext.Consumer>
      {state => children(state)}
    </FirebaseAuthContext.Consumer>
  );
};

FirebaseAuthConsumer.propTypes = {
  children: PropTypes.func.isRequired,
};

FirebaseAuthConsumer.displayName = 'FirebaseAuthConsumer';

export default FirebaseAuthConsumer;
