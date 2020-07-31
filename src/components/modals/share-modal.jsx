import delay from 'lodash.delay';
import React, { useCallback, useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { IoMdClose as CloseIcon } from 'react-icons/io';
import { MdContentCopy as CopyIcon } from 'react-icons/md';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  // FacebookMessengerShareButton
} from 'react-share';

import { ZINDEX } from '../../constants';
import { closeShareModal } from '../../redux/actions';

const useStyles = createUseStyles({
  buttons: {
    composes: ['flex-columns', 'items-center', 'flex-around'],
    margin: '12px auto 0 auto',
    width: 160,
  },
  closebutton: {
    color: 'rgba(0, 0, 0, 0.25)',
    composes: ['is-absolute', 'text-center'],
    right: 0,
    top: 0,
  },
  container: {
    bottom: 0,
    composes: ['is-absolute'],
    left: 0,
    right: 0,
    top: 0,
    zIndex: ZINDEX.MODAL,
  },
  copybubble: {
    background: 'rgba(0, 0, 0, 0.45)',
    borderRadius: 14,
    color: '#FFF',
    composes: ['is-absolute', 'fs10', 'p7', 'text-center'],
    fontWeight: 'light',
    left: (272 - 210) / 2,
    lineHeight: '14px',
    top: 162,
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
  innerlay: {
    background: '#FFFFFF',
    borderRadius: 12,
    composes: ['is-absolute', 'px24', 'pb24', 'pt12'],
    height: 170,
    left: '50%',
    marginLeft: -160,
    top: 100,
    width: 320,
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
  overlay: {
    background: 'rgba(0, 0, 0, 0.45)',
    bottom: 0,
    composes: ['is-absolute', 'is-block'],
    left: 0,
    right: 0,
    top: 0,
  },
  title: {
    composes: ['is-bold', 'mb24'],
    fontSize: '1.4rem',
  },
  wrapper: {
    composes: ['is-relative', 'is-full-layout'],
  },
});

const ShareModalComponent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState(window.location.href);

  const copyHandler = useCallback(() => {
    setCopied(true);
    delay(() => setCopied(false), 1000);
  }, []);

  const closeHandler = useCallback(() => {
    dispatch(closeShareModal());
  }, [dispatch]);

  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div
          className={classes.overlay}
          role="button"
          tabIndex="-1"
          onClick={closeHandler}
        />
        <div className={classes.innerlay}>
          <div className={classes.wrapper}>
            {copied && (
              <div className={classes.copybubble}>
                <span>Copié dans le presse-papier !</span>
              </div>
            )}
            <button
              className={classes.closebutton}
              type="button"
              onClick={closeHandler}>
              <CloseIcon />
            </button>
            <h1 className={classes.title}>
              <span>Partager</span>
            </h1>
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
              <EmailShareButton url={shareUrl}>
                <EmailIcon round size={32} />
              </EmailShareButton>
              <CopyToClipboard text={shareUrl} onCopy={copyHandler}>
                <button className={classes.copybutton} type="button">
                  <CopyIcon />
                </button>
              </CopyToClipboard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModalComponent;
