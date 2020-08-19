import PropTypes from 'prop-types';
import React from 'react';
import { LayerGroup } from 'react-leaflet';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import Distances from './distances';
import Markers from './markers';
import Shape from './shape';

const TrackComponent = React.memo(function TrackComponent({ data }) {
  const isMobile = useMediaQuery({ query: '(max-width: 680px)' });

  const editmode = useSelector(_ => _.editmode);
  const selected = useSelector(_ => _.selected);

  const hidedistances =
    selected !== data.id || (editmode && selected !== data.id);

  return (
    <LayerGroup>
      <Shape data={data} isMobile={isMobile} selected={selected} />
      {!hidedistances && <Distances data={data} />}
      <Markers data={data} />
    </LayerGroup>
  );
});

TrackComponent.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default TrackComponent;
