import React, {useContext} from 'react';
import {withNavigation} from 'react-navigation';
import {ListItem} from 'react-native-elements';
import {StyleSheet} from 'react-native';
import {AuthContext} from '../../context/AuthContext';
import {splitStrByComma} from '../../helpers/helper';

const SavedLocations = props => {
  const context = useContext(AuthContext);

  const navigateToResults = location => {
    console.log(location);
    props.navigation.navigate('Nearby', {
      location,
    });
  };

  let SavedLocationList = [];

  if (context.saved_locations) {
    SavedLocationList = context.saved_locations.map(location => {
      const address = splitStrByComma(location.data.formatted_address);
      const {title, lat, lng, place_id} = location.data;
      console.log(location.data);
      return (
        <ListItem
          key={place_id}
          title={title}
          titleStyle={styles.listTitle}
          subtitle={address[0]}
          onPress={() => navigateToResults({latitude: lat, longitude: lng})}
          leftIcon={{name: 'star-border', color: '#000'}}
        />
      );
    });
  }

  return <React.Fragment>{SavedLocationList}</React.Fragment>;
};

const styles = StyleSheet.create({});

export default withNavigation(SavedLocations);
