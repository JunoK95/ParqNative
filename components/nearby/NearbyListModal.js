import React, {useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
} from 'react-native';
import NearbyList from './NearbyList';
import Icon from 'react-native-vector-icons/FontAwesome5';
import TouchableNativeReplacement from '../layout/TouchableNativeReplacement';

const NearbyListModal = props => {
  const {open, setlistmode, currentlocation, carports} = props;

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={open}
      onRequestClose={() => setlistmode(false)}>
      <View style={styles.header}>
        <Text style={styles.headertext}>Select Your Parking</Text>
      </View>
      <NearbyList
        carports={carports}
        currentlocation={currentlocation}
        setopen={setlistmode}
      />
      <TouchableNativeReplacement onPress={() => setlistmode(false)}>
        <View style={styles.listHeader}>
          <Icon name={'map'} size={18} />
          <Text style={styles.listTitle}> Map </Text>
        </View>
      </TouchableNativeReplacement>
    </Modal>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 56,
    backgroundColor: '#11a4ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headertext: {
    fontWeight: '600',
    color: '#fff',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
  },
  container: {
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
  },
  listHeader: {
    height: 44,
    backgroundColor: '#ffc630',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    fontFamily: 'Montserrat-Medium',
  },
});

export default NearbyListModal;
