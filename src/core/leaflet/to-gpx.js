const pointToSegment = ({ lat, lng }) => `
<trkseg>
  <trkpt
    lat="${lat}"
    lon="${lng}">
    <time />
    <extensions />
  </trkpt>
</trkseg>
`;

const toGPX = points => `
<?xml version="1.0" encoding="UTF-8"?>
<gpx creator="Garmin Connect" version="1.1"
  xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/11.xsd"
  xmlns:ns3="http://www.garmin.com/xmlschemas/TrackPointExtension/v1"
  xmlns="http://www.topografix.com/GPX/1/1"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:ns2="http://www.garmin.com/xmlschemas/GpxExtensions/v3">
  <metadata>
    <link href="connect.garmin.com">
      <text>Garmin Connect</text>
    </link>
    <time />
  </metadata>
  <trk>
    <name>Palavas-les-Flots SUP</name>
    <type>stand_up_paddleboarding</type>
    ${points.map(pointToSegment).join('')}
  </trk>
</gpx>
`;

export default toGPX;
