import React, { useCallback } from 'react';
import { LayerGroup, Marker, Polyline } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';

// import { getPolygonEndPoint } from '../../../helpers';
import { commitDraft } from '../../../redux/actions';
import { DraggableMarker } from '../icons';

const DraftTrackComponent = () => {
  const dispatch = useDispatch();

  const draft = useSelector(_ => _.draft);

  const firstClickHandler = useCallback(() => {
    const canCommitPolygon = draft.points.length > 2;
    if (!canCommitPolygon) return;
    const { points } = draft;
    dispatch(commitDraft({ ...draft, points, polygon: true }));
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
