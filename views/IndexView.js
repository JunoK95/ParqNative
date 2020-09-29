import React, {useContext, useCallback} from 'react';
import {Text, View} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import HeaderPadding from '../components/header-padding/HeaderPadding';
import CustomListItem from '../components/layout/CustomListItem';
import {withNavigation} from 'react-navigation';

const indexItems = [
  {
    title: 'Referral Entry',
    to: 'Referral',
  },
  {
    title: 'Code Entry',
    to: 'Phone',
  },
  {
    title: 'SandBox',
    to: 'StripeIdentityVerification',
  },
  {
    title: 'Parked Vehicles',
    to: 'ParkedVehicles',
    params: 'id',
  },
];

const IndexView = ({navigation}) => {
  const context = useContext(AuthContext);

  const navigateTo = useCallback(
    view => {
      navigation.navigate(view);
    },
    [navigation],
  );

  const indexList = indexItems.map((item, i) => {
    return (
      <CustomListItem
        key={i}
        title={item.title}
        handlePress={() => navigateTo(item.to)}
      />
    );
  });

  return (
    <View>
      <HeaderPadding to={'Home'} />
      <Text>{context.user_data ? context.user_data.email : ''}</Text>
      {indexList}
    </View>
  );
};

export default withNavigation(IndexView);
