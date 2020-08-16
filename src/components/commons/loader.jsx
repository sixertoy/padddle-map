import React from 'react';

const LoaderComponent = function LoaderComponent() {
  return (
    <svg className="spinner" viewBox="0 0 50 50">
      <circle
        className="path"
        cx="25"
        cy="25"
        fill="none"
        r="20"
        strokeWidth="5"
      />
    </svg>
  );
};

export default LoaderComponent;
