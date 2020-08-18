import delay from 'lodash.delay';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { MdContentCopy as CopyIcon } from 'react-icons/md';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  button: {
    background: '#CCC',
    borderRadius: 16,
    color: '#FFF',
    composes: ['text-center'],
    height: 32,
    marginLeft: 6,
    minWidth: 32,
    paddingTop: 4,
    width: 32,
  },
  container: {
    composes: ['flex-columns', 'flex-between', 'items-center'],
  },
  input: {
    background: 'rgba(0, 0, 0, 0.15)',
    borderRadius: 4,
    color: 'rgba(0, 0, 0, 0.35)',
    composes: ['px7', 'py12', 'is-block', 'no-overflow', 'flex-1'],
    cursor: 'pointer',
    fontSize: '0.7rem',
    maxWidth: '100%',
    textOverflow: 'ellipsis',
  },
});

const CopyButtonComponent = function CopyButtonComponent({ onCopy, url }) {
  const classes = useStyles();

  const copyHandler = useCallback(() => {
    onCopy(true);
    delay(() => onCopy(false), 1000);
  }, [onCopy]);

  return (
    <div className={classes.container}>
      <CopyToClipboard
        className={classes.input}
        text={url}
        onCopy={copyHandler}>
        <span>{url}</span>
      </CopyToClipboard>
      <CopyToClipboard text={url} onCopy={copyHandler}>
        <button className={classes.button} type="button">
          <CopyIcon />
        </button>
      </CopyToClipboard>
    </div>
  );
};

CopyButtonComponent.propTypes = {
  onCopy: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
};

export default CopyButtonComponent;
