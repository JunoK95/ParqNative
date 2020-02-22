import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';

const ModalHeaderPadding = props => {
  const {setaddress} = props;
  return (
    <View style={styles.headerpadding}>
      <View style={styles.left}>
        <TouchableOpacity onPress={() => setaddress(null)}>
          <Icon name={'arrow-back'} color={'#000'} size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerpadding: {
    height: 56,
    top: 0,
    zIndex: 5,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    backgroundColor: '#11a4ff',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});

export default ModalHeaderPadding;
