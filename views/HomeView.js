import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import HomeOverlay from '../components/home/HomeOverlay';
import {GeolocationContext} from '../context/GeolocationContext';
import DrawerHeaderPadding from '../components/layout/DrawerHeaderPadding';

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
                      }}
                    />
                  </MapView>
                )}
                <DrawerHeaderPadding />
                <HomeOverlay
                  navigation={this.props.navigation}
                  location={(latitude, longitude)}
                />
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
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.45,
  },
});
