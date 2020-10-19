import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {withNavigation} from 'react-navigation';

const CarportRegistrationDemoComplete = props => {
  const handlePress = () => {
    props.navigation.navigate('CarportList');
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        <View style={styles.contentcontainer}>
          <Text style={styles.titletext}>{'CONGRATULATIONS!'}</Text>
        </View>
        <View style={styles.contentcontainer}>
          <Text style={styles.contenttext}>
            You are currently using a demo account! But you would have made a
            new host listing if you have navigated successfully to this page!
          </Text>
        </View>
        <View style={styles.contentcontainer}>
          <Text style={styles.contenttext}>
            Click to navigate to your listing!
          </Text>
        </View>
        <TouchableOpacity onPress={handlePress}>
          <View style={styles.contentcontainer}>
            <FontAwesome5Icon name={'home'} size={48} color={'#11a4ff'} />
          </View>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default withNavigation(CarportRegistrationDemoComplete);

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 32,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
    padding: 32,
    alignSelf: 'center',
  },
  contentcontainer: {
    alignItems: 'center',
    flexDirection: 'column',
    padding: 16,
  },
  titletext: {
    textAlign: 'center',
    fontSize: 20,
    color: '#555',
    fontFamily: 'Montserrat-Bold',
  },
  contenttext: {
    textAlign: 'center',
    fontSize: 17,
    color: '#555',
    fontFamily: 'Montserrat-Medium',
  },
});
