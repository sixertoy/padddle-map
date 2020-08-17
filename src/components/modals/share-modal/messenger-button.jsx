import PropTypes from 'prop-types';
import React from 'react';
import {
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
} from 'react-share';

const FacebookButtonComponent = ({ url }) => {
  return (
    <FacebookMessengerShareButton appId="288008652477160" url={url}>
      <FacebookMessengerIcon round size={32} />
    </FacebookMessengerShareButton>
  );
};

FacebookButtonComponent.propTypes = {
  url: PropTypes.string.isRequired,
};

export default FacebookButtonComponent;
