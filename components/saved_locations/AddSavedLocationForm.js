import React, {useContext, useState} from 'react';
import {withNavigation} from 'react-navigation';
import {
  TextInput,
  ScrollView,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import {GoogleAutoComplete} from 'react-native-google-autocomplete';
import Axios from 'axios';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {AuthContext} from '../../context/AuthContext';
import TouchableNativeReplacement from '../layout/TouchableNativeReplacement';
import {config} from '../../config';

function AddSavedLocationForm(props) {
  const context = useContext(AuthContext);
  const [load, setload] = useState(false);
  const apiKey = config.googleMaps_key;

  const handlePress = element => {
    const {place_id} = element;
    setload(true);
    Axios({
      method: 'GET',
      url: 'https://maps.googleapis.com/maps/api/place/details/json?',
      params: {
        key: apiKey,
        place_id: place_id,
        fields: ['geometry', 'formatted_address'],
      },
    }).then(async res => {
      const {lat, lng} = res.data.result.geometry.location;
      const {formatted_address} = res.data.result;
      console.log(formatted_address, place_id, context.user_id, lat, lng);
      await context.functions.addContextSavedLocation(
        formatted_address,
        formatted_address,
        place_id,
        lat,
        lng,
      );
      setload(false);
      props.navigation.navigate('SavedLocations');
    });
  };

  if (load) {
    return <ActivityIndicator />;
  }
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
                        name={'star'}
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
    color: '#222',
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

export default withNavigation(AddSavedLocationForm);
