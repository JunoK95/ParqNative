import React, {useContext} from 'react';
import {GeolocationContext} from '../../context/GeolocationContext';
import {ListItem} from 'react-native-elements';
import {withNavigation} from 'react-navigation';

const CurrentLocationButton = props => {
  const context = useContext(GeolocationContext);
  const {latitude, longitude} = context.location;
  const navigateTo = location => {
    props.navigation.navigate('Nearby', {
      location: location,
    });
  };

  return (
    <ListItem
      title={'Current Location'}
      leftIcon={{name: 'my-location', color: '#000'}}
      onPress={() => navigateTo({latitude, longitude})}
    />
  );
};

export default withNavigation(CurrentLocationButton);
