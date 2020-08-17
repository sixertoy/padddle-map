import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { WhatsappIcon, WhatsappShareButton } from 'react-share';

import { selectParcours } from '../../../redux/selectors';

const FacebookButtonComponent = ({ url }) => {
  const data = useSelector(selectParcours);

  const [quote, setQuote] = useState();

  useEffect(() => {
    if (data) {
      const q = `${data.name}, un circuit en Stand-up Paddle de ${data.distance}Km à découvrir sur www.padddle.io`;
      setQuote(q);
    } else {
      const q =
        'Découvre les circuits de Stand-up Paddle autour de toi sur www.padddle.io';
      setQuote(q);
    }
  }, [data]);

  return (
    <WhatsappShareButton separator={' '} title={quote} url={url}>
      <WhatsappIcon round size={32} />
    </WhatsappShareButton>
  );
};

FacebookButtonComponent.propTypes = {
  url: PropTypes.string.isRequired,
};

export default FacebookButtonComponent;
