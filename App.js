/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './AppNavigator';
import AuthContextProvider, {AuthContext} from './context/AuthContext';
import GeolocationContextProvider from './context/GeolocationContext';
import LoadingView from './views/LoadingView';
import {YellowBox} from 'react-native';
import _ from 'lodash';

function App() {
  YellowBox.ignoreWarnings(['Setting a timer']);
  const _console = _.clone(console);
  console.warn = message => {
    if (message.indexOf('Setting a timer') <= -1) {
      _console.warn(message);
    }
  };
  return (
    <NavigationContainer>
      {
        <GeolocationContextProvider>
          <AuthContextProvider>
            <AuthContext.Consumer>
              {authContext => {
                if (authContext.fetching) {
                  return <LoadingView />;
                } else {
                  return <AppNavigator />;
                }
              }}
            </AuthContext.Consumer>
          </AuthContextProvider>
        </GeolocationContextProvider>
      }
    </NavigationContainer>
  );
}

export default App;
