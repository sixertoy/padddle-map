import Leaflet from 'leaflet';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

const Icon = ({ color }) => {
  return (
    <div
      style={{
        marginLeft: -8,
        marginTop: -28,
        position: 'absolute',
      }}>
      <svg
        aria-hidden="true"
        fill={color}
        fillRule="evenodd"
        height={32}
        stroke={color}
        strokeWidth="0"
        viewBox="0 0 445 512"
        width={27}
        xmlns="http://www.w3.org/2000/svg">
        <path d="M223 0a19456.801 19456.801 0 01221.703 128c.561 85.258.561 170.742 0 256A19456.801 19456.801 0 01223 512 19456.801 19456.801 0 011.297 384c-.561-85.258-.561-170.742 0-256A19456.801 19456.801 0 01223 0zm12.687 256.106l116.19 116.19.846-.846a1.753 1.753 0 012.477 0l2.478 2.478a1.753 1.753 0 010 2.478l-6.156 6.156a1.753 1.753 0 01-2.478 0l-2.478-2.477a1.755 1.755 0 010-2.478l.846-.846-116.19-116.19 4.465-4.465zm37.57-51.712L100.89 376.761l.845.846a1.753 1.753 0 010 2.478l-2.477 2.477a1.745 1.745 0 01-1.155.511l-.084.002c-.449 0-.897-.171-1.239-.513l-6.157-6.156a1.755 1.755 0 010-2.478l2.478-2.478a1.75 1.75 0 011.239-.512c.449 0 .897.171 1.239.512l.846.846 172.362-172.362c-6.363-6.468 21.179-44.853 27.596-51.27l32.728-32.295c6.422-6.422 16.85-6.422 23.272 0l4.308 4.308c6.423 6.422 6.423 16.85 0 23.273l-32.978 33.661c-5.728 5.728-36.379 27.542-47.499 27.638h-.144c-1.141-.01-2.069-.258-2.731-.787l-.082-.068zm-60.643 37.57l-37.564-37.565c-6.468 6.362-44.853-21.179-51.27-27.596l-32.295-32.728c-6.423-6.422-6.423-16.85 0-23.272l4.308-4.309c6.422-6.422 16.85-6.422 23.273 0l33.661 32.979c6.376 6.375 32.681 43.63 26.783 50.456l37.57 37.57-4.466 4.465z" />
      </svg>
    </div>
  );
};

Icon.propTypes = {
  color: PropTypes.string.isRequired,
};

const StartMarker = color => {
  return Leaflet.divIcon({
    className: 'leaflet-div-icon',
    html: ReactDOMServer.renderToString(<Icon color={color} />),
  });
};

export default StartMarker;
