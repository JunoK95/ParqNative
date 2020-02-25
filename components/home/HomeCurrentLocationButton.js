import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {GeolocationContext} from '../../context/GeolocationContext';

const HomeCurrentLocationButton = props => {
  const context = useContext(GeolocationContext);
  const {latitude, longitude} = context.location;
  const navigateTo = location => {
    props.navigation.navigate('Nearby', {
      location: location,
    });
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigateTo({latitude, longitude})}>
      <Icon name={'street-view'} size={18} />
      <Text style={styles.text}> Search Nearby</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    backgroundColor: '#ffc630',
    paddingVertical: 12,
    paddingHorizontal: 24,
    flexDirection: 'row',
    opacity: 0.8,
  },
  text: {
    textAlignVertical: 'center',
    fontFamily: 'Montserrat Semi-Bold',
    fontSize: 16,
  },
});

export default HomeCurrentLocationButton;
