import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {geofirexQueryPoints} from '../firebase_func/geofirexFunctions';
import TransparentHeaderPadding from '../components/layout/TransparentHeaderPadding';
import NearbyListModal from '../components/nearby/NearbyListModal';
import CustomMapMarker from '../components/map/CustomMapMarker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CarportCard from '../components/map/CarportCard';
import {checkCarportAvailablity} from '../firebase_func/firestoreFunctions';

const NearbyListView = props => {
  const {params} = props.navigation.state;
  const {latitude, longitude} = params.location;
  const [listmode, setlistmode] = useState(false);
  const [state, setstate] = useState({
    lat: latitude,
    lng: longitude,
    carports: [],
    selected: {
      id: 'none',
      data: 'none',
    },
  });
  const [carport2, setcarport2] = useState(null);
  const [select, setselect] = useState(null);
  const [fetching, setfetching] = useState(true);
  const [key, setKey] = useState(Math.floor(Math.random() * 100));
  const [radius, setradius] = useState(1.6);

  const fetchDataGeoX = useCallback(
    async distance => {
      console.log('fetching data');
      const center = {lat: parseFloat(latitude), lng: parseFloat(longitude)};
      console.log(center, distance);
      const nearbyCarports = await geofirexQueryPoints(
        center,
        distance,
        'geopointx',
      )
        .then(res => {
          console.log(res);
          setstate({
            ...state,
            carports: res,
          });
          return res;
        })
        .catch(err => console.error(err));

      let promises = nearbyCarports.map(async (port, i) => {
        const isAvailable = await checkCarportAvailablity(port);
        if (isAvailable) {
          return {...port, isAvailable: true};
        } else {
          return {...port, isAvailable: false};
        }
      });
      const availableCarports = await Promise.all(promises);
      console.log('Available Carports => ', availableCarports);
      setcarport2(availableCarports);
      setradius(parseFloat(distance + 1));
      setfetching(false);
      return;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [latitude, longitude],
  );

  useEffect(() => {
    console.log('in Effect');
    setfetching(true);
    setselect(null);
    fetchDataGeoX(1.6);
    setKey(Math.floor(Math.random() * 100));
  }, [fetchDataGeoX, latitude, longitude]);

  if (fetching) {
    return (
      <View style={styles.bg}>
        <Text style={styles.loadTitle}>Finding Nearby Parking...</Text>
        <ActivityIndicator />
      </View>
    );
  } else {
    const mapMarkers = carport2.map((port, i) => {
      if (port.isAvailable) {
        return (
          <Marker
            key={i}
            coordinate={{
              latitude: port.location.coordinates.lat,
              longitude: port.location.coordinates.lng,
            }}
            onPress={() => setselect(port)}>
            <CustomMapMarker selected={select} port={port} />
          </Marker>
        );
      } else {
        return (
          <Marker
            key={i}
            coordinate={{
              latitude: port.location.coordinates.lat,
              longitude: port.location.coordinates.lng,
            }}
            onPress={() => {}}>
            <CustomMapMarker selected={select} port={port} unavailable />
          </Marker>
        );
      }
    });

    return (
      <View>
        <MapView
          key={key}
          style={styles.mapStyle}
          showsUserLocation={true}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0352,
            longitudeDelta: 0.02,
          }}>
          <Marker coordinate={{latitude, longitude}} />
          {mapMarkers}
        </MapView>
        <View style={styles.overlay}>
          <CarportCard port={select} currentlocation={{latitude, longitude}} />
        </View>
        <TransparentHeaderPadding navigation={props.navigation} to={'Search'} />
        <View style={styles.hoverbutton}>
          <TouchableOpacity
            disabled={radius > 4.5}
            style={radius > 4.5 ? styles.buttondisabled : styles.button}
            onPress={() => fetchDataGeoX(radius)}>
            <Icon name={'search-plus'} size={18} />
            <Text style={styles.text}> Expand Radius</Text>
          </TouchableOpacity>
        </View>
        <TouchableNativeFeedback onPress={() => setlistmode(true)}>
          <View style={styles.listHeader}>
            <Icon name={'bars'} size={18} />
            <Text style={styles.listTitle}> List </Text>
          </View>
        </TouchableNativeFeedback>
        <NearbyListModal
          setlistmode={setlistmode}
          carports={state.carports}
          currentlocation={{latitude, longitude}}
          open={listmode}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1,
    backgroundColor: '#fff',
  },
  bg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffc630',
  },
  overlay: {
    position: 'absolute',
    alignContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    marginBottom: 12,
    width: '100%',
    bottom: 44,
    backgroundColor: 'rgba(0,0,0,0.0)',
    zIndex: 2,
  },
  loadTitle: {
    fontSize: 20,
    paddingVertical: 32,
    fontWeight: '600',
    fontFamily: 'Montserrat-Medium',
    color: '#000',
  },
  mapStyle: {
    top: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 68,
    zIndex: -1,
  },
  listHeader: {
    height: 44,
    backgroundColor: '#ffc630',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Montserrat-Medium',
    color: '#000',
  },
  hoverbutton: {
    position: 'absolute',
    top: 36,
    alignItems: 'center',
    width: Dimensions.get('window').width,
  },
  button: {
    borderRadius: 20,
    backgroundColor: '#11a4ff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    flexDirection: 'row',
    opacity: 0.8,
  },
  buttondisabled: {
    borderRadius: 20,
    backgroundColor: '#ccc',
    paddingVertical: 12,
    paddingHorizontal: 24,
    flexDirection: 'row',
    opacity: 0.3,
  },
  text: {
    textAlignVertical: 'center',
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
  },
});

export default NearbyListView;

//David Mois Director Commuter Services
