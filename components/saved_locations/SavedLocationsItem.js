import React from 'react';
import {StyleSheet, Text, View, TouchableNativeFeedback, Dimensions} from 'react-native';
import {withNavigation} from 'react-navigation';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { AuthContext } from '../../context/AuthContext';

const SavedLocationsItem = props => {
  const {lat, lng, address} = props;

  const navigateToResults = (latitude, longitude) => {
    props.navigation.navigate('Nearby', {
      location: {latitude, longitude},
    });
  };

  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple('#ffecb9')}
      onPress={() => navigateToResults(lat, lng)}>
      <View style={styles.item}>
        <View style={styles.itemleft}>
          <FontAwesome5Icon name={'star'} size={24} />
        </View>
        <View style={styles.itemright}>
          <Text style={styles.itemtext}>{address[0]}</Text>
          <Text style={styles.itemsubtext}>{address[1]}</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export default withNavigation(SavedLocationsItem);

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    paddingVertical: 16,
    width: Dimensions.get('window').width,
  },
  itemleft: {
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  itemright: {
    justifyContent: 'center',
  },
  itemtext: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 15,
    paddingRight: 72,
  },
  itemsubtext: {
    fontFamily: 'Montserrat-Medium',
    color: '#555',
    fontSize: 13,
    paddingRight: 72,
  },
  floatright: {
    textAlign: 'right',
  }
});
