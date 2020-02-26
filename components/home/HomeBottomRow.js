import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {DrawerActions} from 'react-navigation-drawer';
import {withNavigation} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';

const HomeBottomRow = props => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.item1}
        onPress={() => props.navigation.dispatch(DrawerActions.openDrawer())}>
        <Icon name={'bars'} size={20} color={'white'} />
        <Text style={styles.menutext}> MENU</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.item2}
        onPress={() => props.navigation.navigate('Search')}>
        <Icon name={'compass'} size={20} color={'white'} />
        <Text style={styles.menutext}> SEARCH</Text>
      </TouchableOpacity>
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
