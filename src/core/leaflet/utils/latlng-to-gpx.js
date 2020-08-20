import pick from 'lodash.pick';

const pointToSegment = ({ lat, lng, time }) =>
  `<trkseg><trkpt lat="${lat}" lon="${lng}"><time>${time}</time></trkpt></trkseg>`;

const latlngToGPX = (parcours, durationms) => {
  const { id, mtime, name, points, polygon } = pick(parcours, [
    'mtime',
    'polygon',
    'points',
    'name',
    'id',
  ]);
  const durationPerPoint = Math.floor(durationms / points.length);
  const start = new Date(mtime);
  const isoDate = start.toISOString();
  const waypoints = (!polygon ? points : [...points, points[0]])
    .reduce((acc, obj, index) => {
      const ms = durationPerPoint * (index + 1);
      const time = new Date(mtime + ms).toISOString();
      return [...acc, { ...obj, time }];
    }, [])
    .map(pointToSegment)
    .join('');
  return `<?xml version="1.0" encoding="UTF-8"?><gpx creator="Garmin Connect" version="1.1" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/11.xsd" xmlns:ns3="http://www.garmin.com/xmlschemas/TrackPointExtension/v1" xmlns="http://www.topografix.com/GPX/1/1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:ns2="http://www.garmin.com/xmlschemas/GpxExtensions/v3"><metadata><link href="https://www.padddle.io/#/share/${id}"><text>Voir le parcours sur padddle.io</text></link><time>${isoDate}</time></metadata><trk><name>${name}</name><type>stand_up_paddleboarding</type>${waypoints}</trk></gpx>`;
};

export default latlngToGPX;
