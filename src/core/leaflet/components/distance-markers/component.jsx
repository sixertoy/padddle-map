import L from 'leaflet';
import PropTypes from 'prop-types';
import { Path, withLeaflet } from 'react-leaflet';

class DistanceMarkers extends Path {
  createLeafletElement(props) {
    const { positions, ...rest } = props;
    this.polyline = new L.Polyline(positions, { ...rest });
    return this.polyline;
  }

  addDistanceMarkers = () => {
    this.polyline.addDistanceMarkers();
  };

  removeDistanceMarkers = () => {
    this.polyline.removeDistanceMarkers();
  };
}

DistanceMarkers.defaultProps = {
  className: '',
  positions: [],
};

DistanceMarkers.propTypes = {
  className: PropTypes.string,
  positions: PropTypes.arrayOf(PropTypes.shape()),
};

export default withLeaflet(DistanceMarkers);
