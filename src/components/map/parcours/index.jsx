import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { LayerGroup } from 'react-leaflet';
import { useSelector } from 'react-redux';

import Draggable from './draggable';
import Track from './track';

const ParcoursComponent = React.memo(function ParcoursComponent({ data }) {
  const [editable, setEditable] = useState(false);

  const editmode = useSelector(_ => _.editmode);
  const selected = useSelector(_ => _.selected);

  useEffect(() => {
    const next = editmode && selected === data.id;
    setEditable(next);
  }, [data.id, editmode, selected]);

  return (
    <LayerGroup>
      {!editable && <Track data={data} />}
      {editable && <Draggable data={data} />}
    </LayerGroup>
  );
});

ParcoursComponent.propTypes = {
  data: PropTypes.shape({
    color: PropTypes.string,
    coordinates: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }),
    distance: PropTypes.number,
    id: PropTypes.string,
    name: PropTypes.string,
    points: PropTypes.arrayOf(PropTypes.shape()),
    polygon: PropTypes.bool,
    user: PropTypes.string,
  }).isRequired,
};

export default ParcoursComponent;
