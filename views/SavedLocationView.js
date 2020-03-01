import React, {useContext} from 'react';
import {withNavigation} from 'react-navigation';
import {ListItem} from 'react-native-elements';
import {AuthContext} from '../context/AuthContext';
import {splitStrByComma} from '../helpers/helper';
import HeaderPadding from '../components/layout/HeaderPadding';
import {
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback,
  ScrollView,
} from 'react-native';

const SavedLocationView = props => {
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
          subtitle={address[0]}
          onPress={() => navigateToResults({latitude: lat, longitude: lng})}
          leftIcon={{name: 'star-border', color: '#000'}}
        />
      );
    });
  }

  return (
    <ScrollView contentContainerStyle={styles.listcontainer}>
      <HeaderPadding to={'Search'} />
      {SavedLocationList}
      {SavedLocationList.length === 0 && (
        <TouchableNativeFeedback
          onPress={() => props.navigation.navigate('SavedLocationsAdd')}>
          <View style={styles.container}>
            <Text style={styles.text}>No Saved Location</Text>
          </View>
        </TouchableNativeFeedback>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  listcontainer: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'flex-start',
  },
  container: {
    width: 340,
    height: 48,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
  text: {
    fontFamily: 'Montserrat-MediumItalic',
  },
});

export default withNavigation(SavedLocationView);
