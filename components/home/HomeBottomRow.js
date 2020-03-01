import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableNativeFeedback,
} from 'react-native';
import {DrawerActions} from 'react-navigation-drawer';
import {withNavigation} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';

const HomeBottomRow = props => {
  return (
    <View style={styles.container}>
      <TouchableNativeFeedback
        onPress={() => props.navigation.dispatch(DrawerActions.openDrawer())}>
        <View style={styles.item1}>
          <Icon name={'bars'} size={20} color={'white'} />
          <Text style={styles.menutext}> MENU</Text>
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback
        onPress={() => props.navigation.navigate('SearchNavigator')}>
        <View style={styles.item2}>
          <Icon name={'compass'} size={20} color={'white'} />
          <Text style={styles.menutext}> SEARCH</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    width: Dimensions.get('window').width,
    height: 64,
  },
  item1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#11a4ff',
    flex: 1,
    elevation: 4,
    borderRightWidth: 1,
    borderRightColor: '#117bbd',
    borderTopColor: '#117bbd',
    borderTopLeftRadius: 20,
  },
  item2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#11a4ff',
    flex: 1,
    elevation: 4,
    borderColor: '#bfe7ff',
    borderTopRightRadius: 20,
  },
  menutext: {
    color: '#fff',
    textAlignVertical: 'center',
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default withNavigation(HomeBottomRow);
