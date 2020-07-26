import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import { AiOutlineLoading3Quarters as Loader } from 'react-icons/ai';
import { IoMdLocate as TargetIcon } from 'react-icons/io';

const GeolocateButton = () => {
  const [loading, setLoading] = useState(false);
  const onClick = useCallback(() => {
    setLoading(false);
  }, []);
  return (
    <button type="button" onClick={onClick}>
      {!loading && <TargetIcon />}
      {loading && <Loader className="loader" />}
    </button>
  );
};

GeolocateButton.propTypes = {};

export default GeolocateButton;
