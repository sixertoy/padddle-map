import PropTypes from 'prop-types';
import React from 'react';

import { ReactComponent as SVG } from '../../assets/logo.svg';

const LogoImage = React.memo(({ className }) => (
  <div className={className}>
    <SVG style={{ height: '1em', verticalAlign: 'bottom', width: '1em' }} />
  </div>
));

LogoImage.defaultProps = {
  className: '',
};

LogoImage.propTypes = {
  className: PropTypes.string,
};

export default LogoImage;
