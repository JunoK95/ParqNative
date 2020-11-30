import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {GeolocationContext} from '../context/GeolocationContext';
import DrawerHeaderPadding from '../components/layout/DrawerHeaderPadding';
import HomeBottomRow from '../components/home/HomeBottomRow';
import HomeCurrentLocationButton from '../components/home/HomeCurrentLocationButton';
import mapicon from '../resources/images/parq_dino64x64.png';
import {AuthContext} from '../context/AuthContext';
import LoadingView from './LoadingView';
import GetPhoneView from './GetPhoneView';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

//CHANGE PHONE!

export default class HomeView extends React.Component {
  render() {
    return (
      <AuthContext.Consumer>
        {authContext => {
          if (!authContext.user_data) {
            console.log('Loading User Data');
            return <LoadingView />;
          }
          if (!authContext.user_data.phone) {
            return (
              <GetPhoneView handlePress={authContext.functions.addPhone} />
            );
          }
          return (
            <GeolocationContext.Consumer>
              {geolocationContext => {
                const {
                  latitude,
                  longitude,
                  refreshLocation,
                } = geolocationContext.location;
                const {fetch} = geolocationContext;
                if (fetch) {
                  return <LoadingView />;
                }
                return (
                  <React.Fragment>
                    <View style={styles.container}>
                      {latitude === null || longitude === null ? (
                        <View style={styles.noMapStyle}>
                          <FontAwesome5Icon
                            name={'search-location'}
                            size={48}
                            color={'#888'}
                          />
                          <TouchableOpacity onPress={refreshLocation}>
                            <Text style={styles.grayText}>
                              Sorry, We Could Not Get Your Location. {'\n'}
                              Click To Refresh
                            </Text>
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <MapView
                          style={styles.mapStyle}
                          initialRegion={{
                            latitude: parseFloat(latitude),
                            longitude: parseFloat(longitude),
                            latitudeDelta: 0.0422,
                            longitudeDelta: 0.0221,
                          }}>
                          <Marker
                            coordinate={{
                              latitude: parseFloat(latitude),
                              longitude: parseFloat(longitude),
                            }}>
                            <Image source={mapicon} />
                          </Marker>
                        </MapView>
                      )}
                      <DrawerHeaderPadding />
                      <HomeBottomRow />
                      <View style={styles.hoverbutton}>
                        <HomeCurrentLocationButton
                          location={(latitude, longitude)}
                          navigation={this.props.navigation}
                        />
                      </View>
                    </View>
                  </React.Fragment>
                );
              }}
            </GeolocationContext.Consumer>
          );
        }}
      </AuthContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1,
    backgroundColor: '#fff',
  },
  hoverbutton: {
    position: 'absolute',
    top: 46,
    alignItems: 'center',
    width: Dimensions.get('window').width,
  },
  grayText: {
    color: '#888',
    fontSize: 18,
    paddingHorizontal: 32,
    paddingVertical: 32,
    textAlign: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  noMapStyle: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieContainer: {
    width: '30%',
  },
});
