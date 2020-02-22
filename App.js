/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import 'react-native-gesture-handler';
import AppNavigator from './AppNavigator';
import AuthContextProvider, {AuthContext} from './context/AuthContext';
import GeolocationContextProvider from './context/GeolocationContext';
import {ActivityIndicator} from 'react-native';

function App() {
  return (
    <GeolocationContextProvider>
      <AuthContextProvider>
        <AuthContext.Consumer>
          {authContext => {
            if (authContext.fetching) {
              return <ActivityIndicator />;
            } else {
              return <AppNavigator />;
            }
          }}
        </AuthContext.Consumer>
      </AuthContextProvider>
    </GeolocationContextProvider>
  );
}

export default App;
