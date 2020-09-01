import React, {createContext, useState, useEffect, useCallback} from 'react';
import messaging from '@react-native-firebase/messaging';

export const NotificationsContext = createContext();

function NotificationsContextProvider(props) {
  const [messageAccess, setMessageAccess] = useState(false);
  const [fetching, setFetching] = useState(false);

  const getMessagePermission = useCallback(async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Notifications Enabled');
      setMessageAccess(true);
    }
    return enabled;
  }, []);

  useEffect(() => {
    getMessagePermission();
  }, [getMessagePermission]);

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
