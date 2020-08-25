import PropTypes from 'prop-types';
import React from 'react';
import Joyride from 'react-joyride';
import { useSelector } from 'react-redux';

import { ZINDEX } from '../../constants';
import { selectDemoMode } from '../../redux/selectors';

const JOYRIDE_AUTHED_STEPS = [
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
  const demomode = useSelector(selectDemoMode);
  const steps = demomode ? JOYRIDE_UNAUTHED_STEPS : JOYRIDE_AUTHED_STEPS;
  return (
    <Joyride
      continuous
      disableCloseOnEsc
      disableOverlayClose
      showProgress
      showSkipButton
      locale={{
        back: 'Préc.',
        close: 'Fermer',
        last: 'Last',
        next: 'Suiv.',
        skip: 'Passer',
      }}
      run={run}
      steps={steps}
      styles={{ options: TOUR_OPTIONS }}
    />
  );
};

TourComponent.propTypes = {
  run: PropTypes.bool.isRequired,
};

export default TourComponent;
