import Tippy from '@tippyjs/react';
import PropTypes from 'prop-types';
import React from 'react';
import { roundArrow } from 'tippy.js';

const TooltipComponent = ({
  children,
  className,
  component,
  interactive,
  title,
  useHover,
  ...rest
}) => {
  const content = component || title;

  const overrides = {
    hideOnClick: !useHover,
    trigger: (!useHover && 'click') || 'mouseenter focus',
  };
  return (
    <Tippy
      arrow={roundArrow}
      className={className}
      content={content}
      interactive={interactive}
      placement="bottom"
      zIndex={999999999}
      {...overrides}
      {...rest}>
      {children}
    </Tippy>
  );
};

TooltipComponent.defaultProps = {
  className: '',
  component: null,
  interactive: true,
  title: null,
  useHover: false,
};

TooltipComponent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  component: PropTypes.element,
  interactive: PropTypes.bool,
  title: PropTypes.string,
  useHover: PropTypes.bool,
};

export default TooltipComponent;
