import React from 'react';
import {withNavigation} from 'react-navigation';
import {DeactivatedCard, ActivatedCard} from './host-card';

const CarportCard2 = props => {
  const {port, port_id, refreshData} = props;

  if (!port) {
    return null;
  }

  if (port) {
    if (port.enabled) {
      return (
        <ActivatedCard
          port={port}
          port_id={port_id}
          refreshData={refreshData}
        />
      );
    } else {
      return (
        <DeactivatedCard
          port={port}
          port_id={port_id}
          refreshData={refreshData}
        />
      );
    }
  }
  return null;
};

export default withNavigation(CarportCard2);
