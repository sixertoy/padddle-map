// import { closest } from 'leaflet-geometryutil';
// import get from 'lodash.get';
import PropTypes from 'prop-types';
import React from 'react';
import { LayerGroup } from 'react-leaflet';

// import { useSelector } from 'react-redux';
// import { rgba } from '../../../core';
// import { closePopup, openPopup, updateParcours } from '../../../redux/actions';
// import { selectParcours } from '../../../redux/selectors';
import DistanceTrack from './tracks/distance-track';
import EditableTrack from './tracks/editable-track';

const ParcoursComponent = ({ data, editable }) => {
  // const dispatch = useDispatch();
  // const selected = useSelector(selectParcours);
  // const editmode = useSelector(_ => _.editmode);
  // const createmode = useSelector(_ => _.createmode);

  // const [startpoint, ...waypoints] = data.points;
  // const isselected = selected && selected.id === data.id;
  // const showmarker = !selected || isselected;
  return (
    <LayerGroup>
      {!editable && <DistanceTrack data={data} />}
      {editable && <EditableTrack data={data} />}
    </LayerGroup>
  );
};

ParcoursComponent.propTypes = {
  data: PropTypes.shape({
    color: PropTypes.string,
    distance: PropTypes.number,
    id: PropTypes.string,
    name: PropTypes.string,
    points: PropTypes.arrayOf(PropTypes.shape()),
    polygon: PropTypes.bool,
    user: PropTypes.string,
  }).isRequired,
  editable: PropTypes.bool.isRequired,
};

export default ParcoursComponent;
