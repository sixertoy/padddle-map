import Leaflet from 'leaflet';

// L.divIcon({ className: "custom icon", html: ReactDOMServer.renderToString( <MyComponent/> ) })
export const DotIcon = Leaflet.divIcon({
  className: 'leaflet-marker-divicon-dot',
  iconSize: 8,
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

export const StartPositionIcon = Leaflet.divIcon({
  className: 'leaflet-marker-divicon',
  html: `
<div class="leaflet-marker-divicon-container">
  <div class="leaflet-marker-divicon-inner">
    <div class="leaflet-marker-divicon-pin"></div>
  </div>
</div>
`,
});
