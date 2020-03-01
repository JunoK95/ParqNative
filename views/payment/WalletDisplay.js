import React, {useState} from 'react';
import AddBalanceMenu from './AddBalanceMenu';
import {TouchableNativeFeedback, View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const WalletDisplay = props => {
  const {wallet} = props;
  const [menuOpen, setmenu] = useState(false);

  let creditAmount = 0;
  if (wallet) {
    creditAmount = wallet.credit;
  }

  return (
    <React.Fragment>
      {wallet && (
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple('#c2e8ff')}
          onPress={() => console.log(wallet)}>
          <View style={styles.item}>
            <View style={styles.row}>
              <Icon style={styles.itemicon} name={'coins'} size={20} />
              <Text style={styles.itemtext}>{creditAmount + ' coins'}</Text>
            </View>
          </View>
        </TouchableNativeFeedback>
      )}
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple('#c2e8ff')}
        onPress={() => setmenu(true)}>
        <View style={styles.item}>
          <View style={styles.row}>
            <Icon style={styles.itemicon} name={'plus-circle'} size={20} />
            <Text style={styles.itemtext}>{'Add Balance'}</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
      <AddBalanceMenu open={menuOpen} setopen={setmenu} />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  item: {
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  itemtext: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 15,
  },
  itemicon: {
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
  },
  trashicon: {
    position: 'absolute',
    right: 0,
  },
});

export default WalletDisplay;
