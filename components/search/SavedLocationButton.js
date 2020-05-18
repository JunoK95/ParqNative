import React from 'react';
import {withNavigation} from 'react-navigation';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import TouchableNativeReplacement from '../layout/TouchableNativeReplacement';

const SavedLocationButton = props => {
  return (
    <TouchableNativeReplacement
      color={'secondary'}
      onPress={() => props.navigation.navigate('SavedLocations')}>
      <View style={styles.item}>
        <View style={styles.row}>
          <Icon style={styles.itemicon} name={'star'} size={20} />
          <Text style={styles.itemtext}>{'Your Saved Locations'}</Text>
        </View>
      </View>
    </TouchableNativeReplacement>
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

export default withNavigation(SavedLocationButton);
