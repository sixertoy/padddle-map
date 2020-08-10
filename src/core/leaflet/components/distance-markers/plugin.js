/* eslint
  no-underscore-dangle: 0
*/
// @NOTE source:
// https://github.com/adoroszlai/leaflet-distance-markers
import 'leaflet-geometryutil';

import L from 'leaflet';
import isEmpty from 'lodash.isempty';

import { getAccumulatedDistances } from '../../utils/distance-calculation';

L.DistanceMarkers = L.LayerGroup.extend({
  initialize(line, map, options) {
    const opts = options || {};
    if (isEmpty(opts)) return;

    const offset = opts.offset || 1000;
    const iconSize = opts.iconSize || [12, 12];
    const cssClass = opts.cssClass || 'leaflet-dist-marker';
    const showAll = Math.min(map.getMaxZoom(), opts.showAll || 12);

    const zoomLayers = {};
    // Get line coords as an array
    const coords = (line.getLatLngs && line.getLatLngs()) || line;

    // Get distances line lengths as well as overall length
    const distances = getAccumulatedDistances(coords);
    const meters = distances.length > 0 ? distances[distances.length - 1] : 0;

    // Position in distances line length array
    let j = 0;
    // Number of distance markers to be added
    const count = Math.floor(meters / offset);
    for (let i = 1; i <= count; i += 1) {
      const distance = offset * i;
      // Find the first distances distance that is greater than the distance of this
      // marker
      while (j < distances.length - 1 && distances[j] < distance) {
        j += 1;
      }
      // Now grab the two nearest points either side of distance marker position and
      // create a simple line to interpolate on
      const p1 = coords[j - 1];
      const p2 = coords[j];
      const mline = L.polyline([p1, p2]);
      const ratio =
        (distance - distances[j - 1]) / (distances[j] - distances[j - 1]);

      const position = L.GeometryUtil.interpolateOnLine(map, mline, ratio);
      const marker = L.marker(position.latLng, {
        icon: L.divIcon({ className: cssClass, html: i, iconSize }),
        title: i,
      });
      if (typeof opts.onClick === 'function') {
        marker.on('click', () => opts.onClick(i - 1));
      }

      // visible only starting at a specific zoom level
      const zoom = this.minimumZoomLevelForItem(i, showAll);
      if (zoomLayers[zoom] === undefined) zoomLayers[zoom] = L.layerGroup();
      zoomLayers[zoom].addLayer(marker);
    }

    let currentZoomLevel = 0;
    const markerLayer = this;
    const updateMarkerVisibility = () => {
      const oldZoom = currentZoomLevel;
      const newZoom = map.getZoom();

      if (newZoom > oldZoom) {
        for (let i = oldZoom + 1; i <= newZoom; i += 1) {
          if (zoomLayers[i] !== undefined) {
            markerLayer.addLayer(zoomLayers[i]);
          }
        }
      } else if (newZoom < oldZoom) {
        for (let i = oldZoom; i > newZoom; i -= 1) {
          if (zoomLayers[i] !== undefined) {
            markerLayer.removeLayer(zoomLayers[i]);
          }
        }
      }
      currentZoomLevel = map.getZoom();
    };
    map.on('zoomend', updateMarkerVisibility);

    // need to initialize before adding markers to this LayerGroup
    this._layers = {};
    updateMarkerVisibility();
  },

  minimumZoomLevelForItem(item, showAllLevel) {
    let zoom = showAllLevel;
    let i = item;
    while (i > 0 && i % 2 === 0) {
      zoom -= 1;
      i = Math.floor(i / 2);
    }
    return zoom;
  },
});

L.Polyline.include({
  _onAdd: L.Polyline.prototype.onAdd,
  _onRemove: L.Polyline.prototype.onRemove,

  addDistanceMarkers() {
    if (!this._map || !this._distanceMarkers) return;
    this._map.addLayer(this._distanceMarkers);
  },

  onAdd(map) {
    this._onAdd(map);
    const opts = this.options.distanceMarkers || {};
    if (!this._distanceMarkers) {
      this._distanceMarkers = new L.DistanceMarkers(this, map, opts);
    }
    if (!opts.lazy) {
      this.addDistanceMarkers();
    }
  },

  onRemove(map) {
    this.removeDistanceMarkers();
    this._onRemove(map);
  },

  removeDistanceMarkers() {
    if (!this._map || !this._distanceMarkers) return;
    this._map.removeLayer(this._distanceMarkers);
  },
});
