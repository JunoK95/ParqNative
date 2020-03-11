import React, {useContext} from 'react';
import {GeolocationContext} from '../../context/GeolocationContext';
import {withNavigation} from 'react-navigation';
import {View, Text, TouchableNativeFeedback, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const CurrentLocationButton = props => {
  const context = useContext(GeolocationContext);
  const {latitude, longitude} = context.location;
  const navigateTo = location => {
    props.navigation.navigate('Nearby', {
      location: location,
    });
  };

  if (!latitude || !longitude) {
    return null;
  }
  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple('#c2e8ff')}
      onPress={() => navigateTo({latitude, longitude})}>
      <View style={styles.item}>
        <View style={styles.row}>
          <Icon style={styles.itemicon} name={'street-view'} size={20} />
          <Text style={styles.itemtext}>{'Current Location'}</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  item: {
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  itemtext: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 15,
  },
  itemicon: {
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
  },
});

export default withNavigation(CurrentLocationButton);
