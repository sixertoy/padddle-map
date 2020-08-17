import PropTypes from 'prop-types';
import React from 'react';

import Distances from './distances';
import Markers from './markers';
import Shape from './shape';
import useParcours from './use-parcours';

const TrackComponent = ({ data }) => {
  const {
    opacity,
    selectHandler,
    showDistances,
    toggleEditHandler,
  } = useParcours(data);
  return (
    <React.Fragment>
      <Shape
        data={data}
        opacity={opacity}
        onClick={selectHandler}
        onDoubleClick={toggleEditHandler}
      />
      {showDistances && <Distances data={data} />}
      <Markers
        clickHandler={selectHandler}
        data={data}
        dbClickHandler={toggleEditHandler}
        opacity={opacity}
      />
    </React.Fragment>
  );
};

TrackComponent.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default TrackComponent;
