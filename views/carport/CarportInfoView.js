import React from 'react';
import {View} from 'react-native';
import HeaderPadding from '../../components/layout/HeaderPadding';
import {ListItem} from 'react-native-elements';

const CarportInfoView = props => {
  const {port} = props.navigation.state.params;

  return (
    <View>
      <HeaderPadding to={'Nearby'} />
      <ListItem title={port.location.address} subtitle={'address'} />
      <ListItem title={port.available_spaces} subtitle={'spaces available'} />
      <ListItem title={port.description} subtitle={'description'} />
      <ListItem title={port.schedule.start} subtitle={'start time'} />
      <ListItem title={port.schedule.end} subtitle={'end time'} />
      <ListItem title={port.schedule.allday.toString()} subtitle={'24h'} />
    </View>
  );
};

export default CarportInfoView;
