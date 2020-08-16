import classnames from 'classnames';
import React from 'react';
import { createUseStyles } from 'react-jss';
import { useMediaQuery } from 'react-responsive';

import { DEBUG_MODE, ZINDEX } from '../../constants';
import AuthedButtons from '../commons/authed-buttons';
import ExportButton from './export-button';
import GeoLocateButton from './geolocate-button';
import ImportButton from './import-button';
import ShareButton from './share-button';

const useStyles = createUseStyles({
  controls: {
    composes: ['flex-rows', 'items-center'],
    width: 60,
  },
  sidebar: {
    bottom: 32,
    composes: ['is-absolute'],
    right: 12,
    zIndex: ZINDEX.SIDEBAR,
  },
  wrapper: {
    composes: ['is-relative', 'flex-rows', 'items-end'],
  },
  [`@media (max-width: ${680}px)`]: {
    controls: {
      flexDirection: 'column-reverse !important',
      width: 35,
    },
    sidebar: {
      bottom: 'inherit !important',
      right: '12px !important',
      top: '115px !important',
    },
  },
});

const SidebarComponent = React.memo(function SidebarComponent() {
  const classes = useStyles();
  const isMobile = useMediaQuery({ query: '(max-width: 680px)' });

  return (
    <div className={classes.sidebar}>
      <div className={classes.wrapper}>
        <div className={classnames(classes.controls)}>
          {DEBUG_MODE && (
            <React.Fragment>
              <ExportButton />
              <ImportButton />
            </React.Fragment>
          )}
          <ShareButton />
          <GeoLocateButton />
          {!isMobile && <AuthedButtons />}
        </div>
      </div>
    </div>
  );
});

export default SidebarComponent;
