import React, { useCallback } from 'react';
import { LayerGroup, Marker, Polyline } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';

import { commitDraft } from '../../redux/actions';
import { DotMarker } from './icons';

const DraftComponent = () => {
  const dispatch = useDispatch();

  const draft = useSelector(_ => _.draft);

  const firstClickHandler = useCallback(() => {
    const canCommitPolygon = draft.points.length > 2;
    if (!canCommitPolygon) return;
    dispatch(commitDraft({ ...draft, polygon: true }));
  }, [draft, dispatch]);

  return (
    <LayerGroup>
      <Polyline color={draft.color} positions={draft.points} />
      <LayerGroup>
        {draft.points.map(obj => (
          <Marker
            key={`${obj.lat},${obj.lng}`}
            draggable
            icon={DotMarker(draft.color)}
            position={obj}
            onClick={firstClickHandler}
          />
        ))}
      </LayerGroup>
    </LayerGroup>
  );
};

export default DraftComponent;
