import React, {createContext, useState, useEffect} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {PermissionsAndroid, Platform} from 'react-native';

export const GeolocationContext = createContext();

function GeolocationContextProvider(props) {
  const [location, setlocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [fetch, setfetch] = useState(true);

  useEffect(() => {
    const {latitude, longitude} = location;
    if (latitude && longitude) {
      setfetch(false);
    }
  }, [location]);

  useEffect(() => {
    async function initializeLocation() {
      if (Platform.OS === 'ios') {
        // Get IOS Permission
        const Permission = Geolocation.requestAuthorization('whenInUse');
        console.log('GEOLOCATION PERMISSION =>', Permission);
        Geolocation.getCurrentPosition(
          pos => {
            const {latitude, longitude} = pos.coords;
            setlocation({latitude, longitude});
            console.log('You can use their location iOS =>', location);
          },
          error => {
            console.log('ERROR GETTING LOCATION =>', error.code, error.message);
            setfetch(false);
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 360000,
            desiredAccuracy: 20,
          },
        );
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Request Location',
              message: 'Parq needs access to your Location',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );

          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            Geolocation.getCurrentPosition(
              pos => {
                const {latitude, longitude} = pos.coords;
                setlocation({latitude, longitude});
                console.log('You can use their location context', location);
              },
              error => {
                console.log(error.code, error.message);
              },
              {
                enableHighAccuracy: true,
                timeout: 2000,
                maximumAge: 360000,
                desiredAccuracy: 20,
              },
            );
          } else {
            console.log('location permission denied');
            setfetch(false);
          }
        } catch (err) {
          console.warn(err);
        }
      }
    }

    initializeLocation();
  }, []);

  return (
    <GeolocationContext.Provider
      value={{
        location,
        fetch,
      }}>
      {props.children}
    </GeolocationContext.Provider>
  );
}

export default GeolocationContextProvider;
