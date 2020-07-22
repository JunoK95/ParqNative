import React, {useContext} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {withNavigation} from 'react-navigation';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import TouchableNativeReplacement from '../layout/TouchableNativeReplacement';
import {AuthContext} from '../../context/AuthContext';

const SavedLocationsItem = props => {
  const context = useContext(AuthContext);
  const {lat, lng, address, location_id} = props;

  const navigateToResults = (latitude, longitude) => {
    props.navigation.navigate('Nearby', {
      location: {latitude, longitude},
    });
  };

  const handleDelete = async () => {
    await context.functions.deleteContextSavedLocation(location_id);
  };

  return (
    <TouchableNativeReplacement
      color={'secondary'}
      onPress={() => navigateToResults(lat, lng)}>
      <View style={styles.item}>
        <View style={styles.itemleft}>
          <FontAwesome5Icon name={'star'} size={24} />
        </View>
        <View style={styles.itemcenter}>
          <Text style={styles.itemtext}>{address[0]}</Text>
          <Text style={styles.itemsubtext}>{address[1]}</Text>
        </View>
        <View style={styles.itemright}>
          <FontAwesome5Icon
            style={styles.floatright}
            name={'trash'}
            size={20}
            color={'#11a4ff'}
            onPress={handleDelete}
          />
        </View>
      </View>
    </TouchableNativeReplacement>
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
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
  },
  itemcenter: {
    flex: 10,
    justifyContent: 'center',
  },
  itemright: {
    flex: 1,
    paddingRight: 20,
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
    justifyContent: 'flex-end',
    textAlign: 'right',
  },
});
