import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {withNavigation} from 'react-navigation';

const BackToButton = props => {
  return (
    <TouchableOpacity onPress={() => props.navigation.navigate(props.to)}>
      <Icon name={'arrow-back'} color={'#000'} size={30} />
    </TouchableOpacity>
  );
};

export default withNavigation(BackToButton);
