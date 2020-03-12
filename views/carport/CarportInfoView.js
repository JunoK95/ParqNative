import React from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import HeaderPadding from '../../components/layout/HeaderPadding';
import {ListItem} from 'react-native-elements';
import storeLogo from '../../resources/images/112.png';
import {splitStrByComma} from '../../helpers/helper';

const CarportInfoView = props => {
  const {port} = props.navigation.state.params;
  const splitAddress = splitStrByComma(port.location.address);
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <HeaderPadding to={'Nearby'} />
      <View style={styles.container}>
        <View style={styles.avatarcontainer}>
          <Image style={styles.avatar} source={storeLogo} />
        </View>
        <View style={styles.addresscontainer}>
          <Text style={styles.address}>{splitAddress[0]}</Text>
          <Text style={styles.address}>
            {`${splitAddress[1]},${splitAddress[2]}`}
          </Text>
        </View>
        <View>
          <Text>Accomodations</Text>
        </View>
      </View>
      <ListItem title={port.location.address} subtitle={'address'} />
      <ListItem title={port.available_spaces} subtitle={'spaces available'} />
      <ListItem title={port.description} subtitle={'description'} />
      <ListItem title={port.schedule.start} subtitle={'start time'} />
      <ListItem title={port.schedule.end} subtitle={'end time'} />
      <ListItem title={port.schedule.allday.toString()} subtitle={'24h'} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
  },
  container: {
    width: Dimensions.get('window').width - 64,
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
  },
  avatarcontainer: {
    paddingVertical: 12,
    paddingTop: 36,
  },
  avatar: {
    width: 96,
    height: 96,
  },
  address: {
    fontSize: 18,
    textAlign: 'center',
    color: '#888',
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },
  addresscontainer: {
    padding: 12,
  },
});

export default CarportInfoView;
