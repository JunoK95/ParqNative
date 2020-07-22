import React, {useContext} from 'react';
import {withNavigation} from 'react-navigation';
import {Icon} from 'react-native-elements';
import {AuthContext} from '../context/AuthContext';
import {splitStrByComma} from '../helpers/helper';
import HeaderPadding from '../components/header-padding/HeaderPadding';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import SavedLocationsItem from '../components/saved_locations/SavedLocationsItem';
import TouchableNativeReplacement from '../components/layout/TouchableNativeReplacement';

const SavedLocationView = props => {
  const context = useContext(AuthContext);
  let SavedLocationList = [];

  if (context.saved_locations) {
    SavedLocationList = context.saved_locations.map(location => {
      const address = splitStrByComma(location.data.formatted_address);
      const {title, lat, lng, place_id} = location.data;
      console.log('SAVED LOCATION ID =>', location);
      return (
        <SavedLocationsItem
          key={place_id}
          lat={lat}
          lng={lng}
          address={address}
          location_id={location.id}
        />
      );
    });
  }

  return (
    <View>
      <HeaderPadding
        to={'Search'}
        right={
          <TouchableOpacity
            onPress={() => props.navigation.navigate('SavedLocationsAdd')}>
            <Icon name={'add'} size={30} color={'#000'} />
          </TouchableOpacity>
        }
      />
      <ScrollView>
        {SavedLocationList}
        {SavedLocationList.length === 0 && (
          <TouchableNativeReplacement
            color={'secondary'}
            onPress={() => props.navigation.navigate('SavedLocationsAdd')}>
            <View style={styles.item}>
              <View style={styles.itemleft}>
                <FontAwesome5Icon name={'plus'} size={24} />
              </View>
              <View style={styles.itemright}>
                <Text style={styles.itemtext}>{'No Saved Location'}</Text>
              </View>
            </View>
          </TouchableNativeReplacement>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  listcontainer: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'flex-start',
  },
  text: {
    fontFamily: 'Montserrat-MediumItalic',
  },
  item: {
    flexDirection: 'row',
    paddingVertical: 16,
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
  textshadow: {
    textShadowRadius: 8,
  },
});

export default withNavigation(SavedLocationView);
