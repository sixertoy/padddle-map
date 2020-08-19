import pick from 'lodash.pick';
import React, { useCallback } from 'react';
import { LayerGroup, Marker, Polyline } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';

import { noop } from '../../core';
import { commitDraft } from '../../redux/actions';
import { DraggableMarker } from './icons';

const DraftTrackComponent = () => {
  const dispatch = useDispatch();

  const draft = useSelector(_ => _.draft);
  const { points } = pick(draft, ['points']);

  const firstClickHandler = useCallback(() => {
    const canCommitPolygon = points.length > 2;
    if (!canCommitPolygon) return;
    dispatch(commitDraft(true));
  }, [points.length, dispatch]);

  return (
    <LayerGroup>
      <Polyline dashArray="5,10" positions={points} weight={3} />
      <LayerGroup>
        {points.map((obj, index, list) => {
          const isfirst = index === 0;
          const islast = index === list.length - 1;
          const color =
            (isfirst && '#00FF00') || (islast && '#FF0000') || '#3388FF';
          return (
            <Marker
              key={`${obj.lat},${obj.lng}`}
              bubblingMouseEvents={false}
              draggable={false}
              icon={DraggableMarker(color)}
              position={obj}
              onClick={index === 0 ? firstClickHandler : noop}
              onDblClick={noop}
            />
          );
        })}
      </LayerGroup>
    </LayerGroup>
  );
};

export default DraftTrackComponent;
