import React, {useEffect, useContext} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {AuthContext} from '../../context/AuthContext';

const AuthStatus = props => {
  const context = useContext(AuthContext);
  useEffect(() => {
    console.log(context, 'auth status');
    if (context.logged_in) {
      props.navigation.navigate('App');
    } else {
      props.navigation.navigate('Auth');
    }
  }, [context, props.navigation]);

  return (
    <View style={styles.bg}>
      <ActivityIndicator />
    </View>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#ccc',
  },
});

export default AuthStatus;
