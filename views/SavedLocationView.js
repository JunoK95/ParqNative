import React, {useContext} from 'react';
import {withNavigation} from 'react-navigation';
import {Icon} from 'react-native-elements';
import {AuthContext} from '../context/AuthContext';
import {splitStrByComma} from '../helpers/helper';
import HeaderPadding from '../components/layout/HeaderPadding';
import {
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

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
        <TouchableNativeFeedback
          key={place_id}
          background={TouchableNativeFeedback.Ripple('#ffecb9')}
          onPress={() => navigateToResults({latitude: lat, longitude: lng})}>
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
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('#ffecb9')}
            onPress={() => props.navigation.navigate('SavedLocationsAdd')}>
            <View style={styles.item}>
              <View style={styles.itemleft}>
                <FontAwesome5Icon name={'plus'} size={24} />
              </View>
              <View style={styles.itemright}>
                <Text style={styles.itemtext}>{'No Saved Location'}</Text>
              </View>
            </View>
          </TouchableNativeFeedback>
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
  container: {
    width: Dimensions.get('window').width - 64,
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
});

export default withNavigation(SavedLocationView);
