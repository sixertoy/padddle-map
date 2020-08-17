import PropTypes from 'prop-types';
import React from 'react';
import { EmailIcon, EmailShareButton } from 'react-share';

const EmailButtonComponent = ({ url }) => {
  return (
    <EmailShareButton body="" separator={' '} subject="" url={url}>
      <EmailIcon round size={32} />
    </EmailShareButton>
  );
};

EmailButtonComponent.propTypes = {
  url: PropTypes.string.isRequired,
};

export default EmailButtonComponent;
