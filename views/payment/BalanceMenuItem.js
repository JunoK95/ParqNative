import React from 'react';
import {Picker} from 'react-native';

const BalanceMenuItem = props => {
  const {cost, item_name} = props;

  return <Picker.Item label={item_name} value={cost} />;
};

export default BalanceMenuItem;
