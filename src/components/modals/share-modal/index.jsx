import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';
import {
  // EmailIcon,
  // EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';

import { selectParcours } from '../../../redux/selectors';
import CopyButton from './copy-button';
import MapButton from './map-button';

const useStyles = createUseStyles({
  buttons: {
    '& > *': { marginLeft: 3, marginRight: 3 },
    composes: ['flex-columns', 'items-center', 'flex-center'],
    margin: '0 auto 12px auto',
  },
  copybubble: {
    background: 'rgba(0, 0, 0, 0.45)',
    borderRadius: 14,
    color: '#FFF',
    composes: ['is-absolute', 'fs10', 'p7', 'text-center'],
    fontWeight: 'light',
    left: (272 - 210) / 2,
    lineHeight: '14px',
    top: 170,
    width: 210,
  },
});

const ShareModalComponent = () => {
  const classes = useStyles();
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState(window.location.href);

  const selected = useSelector(selectParcours);

  useEffect(() => {
    if (selected) {
      const getUrl = window.location;
      const baseUrl = `${getUrl.protocol}//${getUrl.host}`;
      const next = `${baseUrl}/#/share/${selected.id}`;
      setShareUrl(next);
    } else {
      setShareUrl(window.location.href);
    }
  }, [selected]);

  return (
    <React.Fragment>
      {copied && (
        <div className={classes.copybubble}>
          <span>Copié dans le presse-papier !</span>
        </div>
      )}
      <div className={classes.buttons}>
        <FacebookShareButton hashtag="paddle" quote="Super" url={shareUrl}>
          <FacebookIcon round size={32} />
        </FacebookShareButton>
        <WhatsappShareButton separator={' '} title="" url={shareUrl}>
          <WhatsappIcon round size={32} />
        </WhatsappShareButton>
        <MapButton />
        {/* <EmailShareButton separator={" "} body={''} subject={""} url={shareUrl}>
          <EmailIcon round size={32} />
        </EmailShareButton> */}
      </div>
      <CopyButton url={shareUrl} onCopy={setCopied} />
    </React.Fragment>
  );
};

export default ShareModalComponent;
