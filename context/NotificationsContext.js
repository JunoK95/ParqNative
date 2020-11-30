import React, {createContext, useState, useEffect, useCallback} from 'react';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';

export const NotificationsContext = createContext();

function NotificationsContextProvider(props) {
  const [messageAccess, setMessageAccess] = useState(null);
  const [fetching, setFetching] = useState(true);

  const getMessagePermission = useCallback(async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Notifications Enabled');
      return true;
    }
    return false;
  }, []);

  const getFCNToken = useCallback(async () => {
    console.log('FCN TOKEN =>');
    // console.log('FCN TOKEN =>', await messaging().getToken());
  }, []);

  useEffect(() => {
    setMessageAccess(getMessagePermission());
    setFetching(false);
  }, [getMessagePermission]);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (messageAccess) {
      messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('MESSAGE HANDLED IN BG =>', remoteMessage);
      });
    }
    getFCNToken();
  }, [messageAccess]);

  return (
    <NotificationsContext.Provider
      value={{
        messageAccess,
        fetching,
      }}>
      {props.children}
    </NotificationsContext.Provider>
  );
}

export default NotificationsContextProvider;
