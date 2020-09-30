import React, {useContext} from 'react';
import {withNavigation} from 'react-navigation';
import {ListItem} from 'react-native-elements';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {AuthContext} from '../../context/AuthContext';
import {splitStrByComma} from '../../helpers/helper';
import TouchableNativeReplacement from '../layout/TouchableNativeReplacement';

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

  return (
    <ScrollView>
      {SavedLocationList}
      {SavedLocationList.length === 0 && (
        <TouchableNativeReplacement onPress={() => console.log('no saved loc')}>
          <View style={styles.container}>
            <Text style={styles.text}>No Saved Location</Text>
          </View>
        </TouchableNativeReplacement>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default withNavigation(SavedLocations);
