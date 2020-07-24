import Leaflet from 'leaflet';

export const DotIcon = Leaflet.divIcon({
  className: 'leaflet-marker-divicon-dot',
});

export const EndIcon = Leaflet.divIcon({
  className: 'leaflet-marker-divicon-dot',
});

export const StartIcon = Leaflet.divIcon({
  className: 'leaflet-marker-divicon-dot',
});

export const UserPositionIcon = Leaflet.divIcon({
  className: 'leaflet-marker-divicon',
  html: `
<div class="leaflet-marker-divicon-container">
  <div class="leaflet-marker-divicon-inner">
    <div class="leaflet-marker-divicon-pin"></div>
    <div class="leaflet-marker-divicon-pulse"></div>
  </div>
</div>
`,
});
