import fxp from 'fast-xml-parser';
import get from 'lodash.get';

const options = {
  attrNodeName: false,
  attributeNamePrefix: '',
  ignoreAttributes: false,
  parseAttributeValue: true,
  parseNodeValue: true,
};

const gpxToLatLng = xml => {
  if (!xml || typeof xml !== 'string') return null;
  const validated = fxp.validate(xml);
  if (validated !== true) return null;
  try {
    const obj = fxp.parse(xml, options);
    const name = get(obj, 'gpx.trk.name', null);
    const trkpoint = get(obj, 'gpx.trk.trkseg.trkpt', null);
    const points = trkpoint.map(({ lat, lon }) => {
      const isvalid = Number(lat) && Number(lon);
      if (!isvalid) throw new Error('Invalid cooodinates');
      return { lat, lng: lon };
    });
    return { name, points };
  } catch (err) {
    return null;
  }
};

export default gpxToLatLng;
