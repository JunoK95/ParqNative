import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {withNavigation} from 'react-navigation';

const GoToSearch = props => {
  const redirectToSearch = () => {
    props.navigation.navigate('SearchNavigator');
  };

  return (
    <TouchableOpacity onPress={redirectToSearch} style={styles.container}>
      <Icon style={styles.icon} name="search" size={20} color="#000" />
      <Text>Find Parking</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: 12,
    marginHorizontal: 24,
    borderWidth: 2,
    height: 36,
    borderRadius: 20,
  },
  icon: {
    position: 'absolute',
    left: 12,
  },
});

export default withNavigation(GoToSearch);
