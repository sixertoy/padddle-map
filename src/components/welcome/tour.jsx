import PropTypes from 'prop-types';
import React from 'react';
import Joyride from 'react-joyride';

import { ZINDEX } from '../../constants';

const JOYRIDE_UNAUTHED_STEPS = [
  {
    content: 'Login button',
    disableBeacon: true,
    target: '#tour-step-login',
  },
  {
    content: 'satellite-view',
    target: '#tour-step-satellite',
  },
];

const TOUR_OPTIONS = {
  zIndex: ZINDEX.WELCOME_TOUR,
};

const TourComponent = function TourComponent({ run }) {
  return (
    <Joyride
      continuous
      showProgress
      showSkipButton
      run={run}
      steps={JOYRIDE_UNAUTHED_STEPS}
      styles={{ options: TOUR_OPTIONS }}
    />
  );
};

TourComponent.propTypes = {
  run: PropTypes.bool.isRequired,
};

export default TourComponent;
