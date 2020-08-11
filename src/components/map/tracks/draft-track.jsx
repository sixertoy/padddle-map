import React, { useCallback } from 'react';
import { LayerGroup, Marker, Polyline } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';

import { commitDraft } from '../../../redux/actions';
import { DraggableMarker } from '../icons';

const getLastPoint = point => {
  const { lat, lng } = point;

  const strlat = String(lat);
  let digitlat = Number(strlat.substring(strlat.length - 1));
  digitlat = digitlat === 0 ? 9 : digitlat - 1;
  const nextlat = Number(
    `${strlat.substring(0, strlat.length - 1)}${digitlat}`
  );

  const strlng = String(lng);
  let digitlng = Number(strlng.substring(strlng.length - 1));
  digitlng = digitlng === 0 ? 9 : digitlng - 1;
  const nextlng = Number(
    `${strlng.substring(0, strlng.length - 1)}${digitlng}`
  );

  return { lat: nextlat, lng: nextlng };
};

const DraftTrackComponent = () => {
  const dispatch = useDispatch();

  const draft = useSelector(_ => _.draft);

  const firstClickHandler = useCallback(() => {
    const canCommitPolygon = draft.points.length > 2;
    if (!canCommitPolygon) return;
    const { points } = draft;
    const last = getLastPoint(points[0]);
    const next = [...points, last];
    dispatch(commitDraft({ ...draft, points: next, polygon: true }));
  }, [draft, dispatch]);

  return (
    <LayerGroup>
      <Polyline dashArray="5,10" positions={draft.points} weight={3} />
      <LayerGroup>
        {draft.points.map((obj, index, list) => {
          const isfirst = index === 0;
          const islast = index === list.length - 1;
          const color =
            (isfirst && '#00FF00') || (islast && '#FF0000') || '#3388FF';
          return (
            <Marker
              key={`${obj.lat},${obj.lng}`}
              draggable={false}
              icon={DraggableMarker(color)}
              position={obj}
              onClick={firstClickHandler}
            />
          );
        })}
      </LayerGroup>
    </LayerGroup>
  );
};

export default DraftTrackComponent;
