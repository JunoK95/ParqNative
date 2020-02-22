import React, {useEffect, useState} from 'react';
import {getWallet} from '../../firebase_func/walletFunctions';
import {ListItem} from 'react-native-elements';
import AddBalanceMenu from './AddBalanceMenu';

const WalletDisplay = props => {
  const {user_id} = props;
  const [menuOpen, setmenu] = useState(false);
  const [wallet, setwallet] = useState(null);

  useEffect(() => {
    async function fetchWallet() {
      const data = await getWallet(user_id).then(res => {
        return res;
      });
      setwallet(data);
    }

    fetchWallet();
  }, [user_id]);

  let creditAmount = 0;
  if (wallet) {
    creditAmount = wallet.credit;
  }

  return (
    <React.Fragment>
      {wallet && (
        <ListItem
          title={creditAmount + ' coins'}
          leftIcon={{name: 'toll', color: '#000'}}
          onPress={() => console.log(wallet)}
        />
      )}
      <ListItem
        title={'Add Balance'}
        leftIcon={{name: 'add', color: '#000'}}
        onPress={() => setmenu(true)}
      />
      <AddBalanceMenu open={menuOpen} setopen={setmenu} />
    </React.Fragment>
  );
};

export default WalletDisplay;
