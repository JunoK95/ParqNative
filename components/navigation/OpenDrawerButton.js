import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {DrawerActions} from 'react-navigation-drawer';
import {Icon} from 'react-native-elements';
import {withNavigation} from 'react-navigation';

const OpenDrawerButton = props => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => props.navigation.dispatch(DrawerActions.openDrawer())}>
        <Icon name={'menu'} color={'#000'} size={30} />
      </TouchableOpacity>
    </View>
  );
};

export default withNavigation(OpenDrawerButton);
