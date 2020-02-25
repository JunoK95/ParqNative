import React from 'react';
import {withNavigation} from 'react-navigation';
import DeactivatedCard from './card/DeactivatedCard';
import ActivatedCard from './card/ActivatedCard';

const CarportCard2 = props => {
  const {port, port_id} = props;

  if (!port) {
    return null;
  }

  if (port) {
    if (port.enabled) {
      return <ActivatedCard port={port} port_id={port_id} />;
    } else {
      return <DeactivatedCard port={port} port_id={port_id} />;
    }
  }
  return null;
};

export default withNavigation(CarportCard2);
