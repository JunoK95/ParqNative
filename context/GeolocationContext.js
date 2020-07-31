import React, {createContext, useState, useEffect} from 'react';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid, Platform} from 'react-native';

export const GeolocationContext = createContext();

function GeolocationContextProvider(props) {
  const [location, setlocation] = useState({
    latitude: null,
    location: null,
  });
  const [fetch, setfetch] = useState(true);

  useEffect(() => {
    async function initializeLocation() {
      if (Platform.OS === 'ios') {
        // Get IOS Permission
        await Geolocation.getCurrentPosition(
          pos => {
            const {latitude, longitude} = pos.coords;
            setlocation({latitude, longitude});
            setfetch(false);
            console.log('You can use their location context iOS =>', location);
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
                const latitude = pos.coords.latitude;
                const longitude = pos.coords.longitude;
                setlocation({latitude, longitude});
                setfetch(false);
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
      setfetch(false);
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
