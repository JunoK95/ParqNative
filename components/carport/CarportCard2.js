import React from 'react';
import {withNavigation} from 'react-navigation';
import DeactivatedCard from './card/DeactivatedCard';
import ActivatedCard from './card/ActivatedCard';

const CarportCard2 = props => {
  const {port} = props;

  if (!port) {
    return null;
  }

  if (port) {
    if (port.enabled) {
      return <ActivatedCard port={port} />;
    } else {
      return <DeactivatedCard port={port} />;
    }
  }
  return null;
};

export default withNavigation(CarportCard2);
