import classnames from 'classnames';
import pick from 'lodash.pick';
import PropTypes from 'prop-types';
import React from 'react';
import { createUseStyles } from 'react-jss';

import { DistanceMarkers } from '../../../../core';
import InfosTooltip from '../../tooltips/infos';
import useParcours from './use-parcours';

const useStyles = createUseStyles({
  marker: ({ color }) => ({
    background: color,
    color: 'rgba(255, 255, 255, 1)',
  }),
});

const DistancesComponent = function DistancesComponent({ data }) {
  const { color, points, polygon } = pick(data, ['color', 'points', 'polygon']);
  const classes = useStyles({ color });
  const { editModeHandler, selectHandler } = useParcours(data);
  return (
    <DistanceMarkers
      bubblingMouseEvents={false}
      color={color}
      distanceMarkers={{
        cssClass: classnames('leaflet-dist-marker', classes.marker),
        iconSize: [16, 16],
        lazy: false,
        offset: 1000,
        onClick: selectHandler,
        onDblClick: editModeHandler,
        polygon,
        showAll: 13,
      }}
      fill={false}
      positions={points}
      stroke={false}>
      <InfosTooltip data={data} />
    </DistanceMarkers>
  );
};

DistancesComponent.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default DistancesComponent;
