import React from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { DEBUG_MODE, ZINDEX } from '../../../constants';
import ExportButton from './export-button';
import GeoLocateButton from './geolocate-button';
import ImportButton from './import-button';
import NavigateButton from './navigate-button';
import ShareButton from './share-button';

const MARGIN = 12;
const BUTTONS_SIZE = 40;
const BIGBUTTON_SIZE = 60;
const BOTTOM_POSITION = 16;
const SPACE_BETWEEN_BUTTONS = 7;

const MOBILE_POSITION =
  BIGBUTTON_SIZE + MARGIN + BUTTONS_SIZE + SPACE_BETWEEN_BUTTONS;

const BOTTOM_POSITION_LOGGED =
  BOTTOM_POSITION + BIGBUTTON_SIZE + SPACE_BETWEEN_BUTTONS;

const useStyles = createUseStyles({
  sidebar: ({ user }) => ({
    bottom: user ? BOTTOM_POSITION_LOGGED : BOTTOM_POSITION,
    composes: ['is-absolute'],
    marginRight: MARGIN + BIGBUTTON_SIZE / 2 - BUTTONS_SIZE / 2,
    right: 0,
    transition: 'bottom 0.3s',
    zIndex: ZINDEX.SIDEBAR_TOOLS,
  }),
  wrapper: {
    composes: ['is-relative', 'flex-rows'],
  },
  [`@media (max-width: ${680}px)`]: {
    sidebar: {
      bottom: 'inherit !important',
      marginRight: '8px !important',
      top: `${MOBILE_POSITION}px !important`,
    },
    wrapper: {
      flexDirection: 'column-reverse !important',
    },
  },
});

const ToolsMenuComponent = function ToolsMenuComponent() {
  const user = useSelector(_ => _.user);
  const classes = useStyles({ user });
  return (
    <div className={classes.sidebar}>
      <div className={classes.wrapper}>
        {DEBUG_MODE && <ImportButton />}
        <NavigateButton />
        <ExportButton />
        <ShareButton />
        <GeoLocateButton />
      </div>
    </div>
  );
};

export default ToolsMenuComponent;
