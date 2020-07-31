import React from 'react';
import {withNavigation} from 'react-navigation';
import {TextInput, ScrollView, StyleSheet, View, Text} from 'react-native';
import {GoogleAutoComplete} from 'react-native-google-autocomplete';
import Axios from 'axios';
import CurrentLocationButton from '../home/CurrentLocationButton';
import SavedLocationButton from './SavedLocationButton';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import TouchableNativeReplacement from '../layout/TouchableNativeReplacement';
import {config} from '../../config';

function LocationAutoComplete(props) {
  const apiKey = config.googleMaps_key;

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
              <TouchableNativeReplacement
                key={i}
                color={'secondary'}
                onPress={() => handlePress(el)}>
                <View style={styles.item}>
                  <View style={styles.row}>
                    <View style={styles.col}>
                      <FontAwesome5Icon
                        style={styles.itemicon}
                        name={'map-marker-alt'}
                        size={20}
                      />
                    </View>
                    <View style={styles.col}>
                      <Text style={styles.itemtext}>{el.description}</Text>
                    </View>
                  </View>
                </View>
              </TouchableNativeReplacement>
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
    elevation: 4,
  },
  item: {
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  itemtext: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 15,
    paddingRight: 72,
  },
  itemicon: {
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
  },
  col: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export default withNavigation(LocationAutoComplete);
