import React from 'react';
import {ListItem} from 'react-native-elements';
import {withNavigation} from 'react-navigation';

const SavedLocationButton = props => {
  return (
    <ListItem
      title={'Your Saved Locations'}
      leftIcon={{name: 'star-border', color: '#000'}}
      onPress={() => props.navigation.navigate('SavedLocations')}
      chevron
    />
  );
};

export default withNavigation(SavedLocationButton);
