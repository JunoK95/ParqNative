import React from 'react';
import {View, StyleSheet, Dimensions, Image} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {GeolocationContext} from '../context/GeolocationContext';
import DrawerHeaderPadding from '../components/layout/DrawerHeaderPadding';
import HomeBottomRow from '../components/home/HomeBottomRow';
import HomeCurrentLocationButton from '../components/home/HomeCurrentLocationButton';
import mapicon from '../resources/images/parq_dino64x64.png';

export default class HomeView extends React.Component {
  render() {
    return (
      <GeolocationContext.Consumer>
        {geolocationContext => {
          const {latitude, longitude} = geolocationContext.location;
          return (
            <React.Fragment>
              <View style={styles.container}>
                {latitude === null || longitude === null ? (
                  <View style={styles.mapStyle} />
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
    top: 36,
    alignItems: 'center',
    width: Dimensions.get('window').width,
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
