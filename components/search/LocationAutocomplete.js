import React from 'react';
import {withNavigation} from 'react-navigation';
import {TextInput, ScrollView, StyleSheet} from 'react-native';
import {GoogleAutoComplete} from 'react-native-google-autocomplete';
import {ListItem} from 'react-native-elements';
import Axios from 'axios';
import CurrentLocationButton from '../home/CurrentLocationButton';
import SavedLocationButton from './SavedLocationButton';

function LocationAutoComplete(props) {
  const apiKey = 'AIzaSyDH_piMcJHJJQLW3WjyLTZo0ICSbHbNXZ0';

  const handlePress = element => {
    const {place_id} = element;
    Axios({
      method: 'GET',
      url: 'https://maps.googleapis.com/maps/api/place/details/json?',
      params: {
        key: apiKey,
        place_id: place_id,
        fields: 'geometry',
      },
    }).then(res => {
      const {lat, lng} = res.data.result.geometry.location;
      props.navigation.navigate('Nearby', {
        location: {
          latitude: lat,
          longitude: lng,
        },
      });
    });
  };

  return (
    <GoogleAutoComplete
      apiKey={apiKey}
      debounce={300}
      queryTypes={'geocode|establishment'}
      minLength={3}
      fetchDetails>
      {({inputValue, handleTextChange, locationResults, fetchDetails}) => (
        <React.Fragment>
          <TextInput
            style={styles.textField}
            value={inputValue}
            onChangeText={handleTextChange}
            placeholder="Enter Location"
          />
          <ScrollView>
            <CurrentLocationButton />
            <SavedLocationButton />
            {locationResults.map((el, i) => (
              <ListItem
                key={i}
                title={el.description}
                onPress={() => handlePress(el)}
                leftIcon={{name: 'place', color: '#000'}}
              />
            ))}
          </ScrollView>
        </React.Fragment>
      )}
    </GoogleAutoComplete>
  );
}

const styles = StyleSheet.create({
  textField: {
    height: 48,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
    margin: 12,
    marginHorizontal: 32,
    borderRadius: 12,
    borderWidth: 1,
  },
});

export default withNavigation(LocationAutoComplete);
