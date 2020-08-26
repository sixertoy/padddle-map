import React, { useCallback, useState } from 'react';
import Joyride, { STATUS } from 'react-joyride';
import { useDispatch } from 'react-redux';

import { ZINDEX } from '../../constants';
import { closeDemoMode } from '../../redux/actions';
import Steps from './steps-unauthed.json';
import Tooltip from './tooltip';

function getTourContentFromDocument(steps) {
  const [noscript] = document.getElementsByTagName('noscript');
  const node = document.createElement('div');
  node.innerHTML = noscript.innerHTML;
  document.body.appendChild(node);
  const results = steps.map(obj => {
    const content =
      obj.content.indexOf('#') === 0
        ? document.getElementById(obj.content.slice(1)).innerHTML
        : obj.content;
    return { ...obj, content };
  });
  return results;
}

const RideTourComponent = function RideTourComponent() {
  const STEPS = getTourContentFromDocument(Steps);

  const dispatch = useDispatch();
  const [current, setCurrent] = useState(0);

  const rideCallbackHandler = useCallback(
    data => {
      const { index, status } = data;
      // console.log('data', data);
      const isFinished = [STATUS.FINISHED, STATUS.SKIPPED].includes(status);
      if (isFinished) {
        dispatch(closeDemoMode({ unauthed: false }));
      }
      setCurrent(index);
    },
    [dispatch]
  );

  const count = Steps.length - 1;
  return (
    <Joyride
      continuous
      disableScrolling
      showProgress
      showSkipButton
      callback={rideCallbackHandler}
      disableCloseOnEsc={current !== count}
      disableOverlayClose={current !== count}
      floaterProps={{
        styles: {
          arrow: {
            color: '#FFFFFF',
            display: 'inline-flex',
            length: 8,
            margin: 4,
            position: 'absolute',
            spread: 16,
          },
        },
      }}
      steps={STEPS}
      styles={{
        options: {
          mixBlendColor: 'inherit !important',
          overlayColor: '#364D4C',
          textColor: '#919191',
          zIndex: ZINDEX.WELCOME_TOUR,
        },
      }}
      tooltipComponent={Tooltip}
    />
  );
};

export default RideTourComponent;
