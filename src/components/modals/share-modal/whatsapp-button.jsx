import pick from 'lodash.pick';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { WhatsappIcon, WhatsappShareButton } from 'react-share';

import { getKilometers } from '../../../core/leaflet';
import { selectParcours } from '../../../redux/selectors';

const FacebookButtonComponent = function FacebookButtonComponent({ url }) {
  const parcours = useSelector(selectParcours);
  const { distance, name } = pick(parcours, ['name', 'distance']);
  const kms = (distance && getKilometers(distance)) || null;

  const quote = !parcours
    ? `🗺☀️🌴🏄
Crée et découvre les circuits de Stand-up Paddle autour de toi sur padddle.io

`
    : `🗺☀️🗺🏄
${name}, un circuit en Stand-up Paddle de ${kms}Km à découvrir sur padddle.io

`;

  return (
    <WhatsappShareButton separator=" " title={quote} url={url}>
      <WhatsappIcon round size={32} />
    </WhatsappShareButton>
  );
};

FacebookButtonComponent.propTypes = {
  url: PropTypes.string.isRequired,
};

export default FacebookButtonComponent;
