/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './AppNavigator';
import AuthContextProvider, {AuthContext} from './context/AuthContext';
import GeolocationContextProvider from './context/GeolocationContext';
import LoadingView from './views/LoadingView';
import {GoogleSignin} from '@react-native-community/google-signin';
import {YellowBox} from 'react-native';
import _ from 'lodash';

function App() {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '449904544159-vbb92q2kjngq7q8vvog4rg1dkof1ndlk.apps.googleusercontent.com',
      offlineAccess: true,
      hostedDomain: '',
      forceConsentPrompt: true,
    });
  }, []);

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
