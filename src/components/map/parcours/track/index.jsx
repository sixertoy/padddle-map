import PropTypes from 'prop-types';
import React from 'react';

import Distances from './distances';
import Markers from './markers';
import Shape from './shape';

const TrackComponent = React.memo(function TrackComponent({ data }) {
  const showdistances = true;
  return (
    <React.Fragment>
      <Shape data={data} />
      {showdistances && <Distances data={data} />}
      <Markers data={data} />
    </React.Fragment>
  );
});

TrackComponent.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default TrackComponent;
