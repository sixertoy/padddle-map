import delay from 'lodash.delay';
import React, { useCallback, useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { MdContentCopy as CopyIcon } from 'react-icons/md';
import { createUseStyles } from 'react-jss';
import {
  // EmailIcon,
  // EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';

const useStyles = createUseStyles({
  buttons: {
    composes: ['flex-columns', 'items-center', 'flex-around'],
    margin: '12px auto 0 auto',
    width: 160,
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
  copybutton: {
    background: '#CCC',
    borderRadius: 16,
    color: '#FFF',
    composes: ['text-center'],
    height: 32,
    paddingTop: 4,
    width: 32,
  },
  input: {
    background: 'rgba(0, 0, 0, 0.15)',
    borderRadius: 4,
    color: 'rgba(0, 0, 0, 0.35)',
    composes: ['px7', 'py12', 'is-block', 'no-overflow'],
    cursor: 'pointer',
    maxWidth: '100%',
    textOverflow: 'ellipsis',
  },
});

const ShareModalComponent = () => {
  const classes = useStyles();
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState(window.location.href);

  const copyHandler = useCallback(() => {
    setCopied(true);
    delay(() => setCopied(false), 1000);
  }, []);

  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  return (
    <React.Fragment>
      {copied && (
        <div className={classes.copybubble}>
          <span>Copié dans le presse-papier !</span>
        </div>
      )}
      <CopyToClipboard
        className={classes.input}
        text={shareUrl}
        onCopy={copyHandler}>
        <span>{shareUrl}</span>
      </CopyToClipboard>
      <div className={classes.buttons}>
        <FacebookShareButton url={shareUrl}>
          <FacebookIcon round size={32} />
        </FacebookShareButton>
        <WhatsappShareButton url={shareUrl}>
          <WhatsappIcon round size={32} />
        </WhatsappShareButton>
        {/* <EmailShareButton separator={" "} body={''} subject={""} url={shareUrl}>
          <EmailIcon round size={32} />
        </EmailShareButton> */}
        <CopyToClipboard text={shareUrl} onCopy={copyHandler}>
          <button className={classes.copybutton} type="button">
            <CopyIcon />
          </button>
        </CopyToClipboard>
      </div>
    </React.Fragment>
  );
};

export default ShareModalComponent;
