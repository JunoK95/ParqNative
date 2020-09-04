import React from 'react';
import {StyleSheet, ScrollView, View, Text, Image} from 'react-native';
import {withNavigation} from 'react-navigation';
import {ListItem} from 'react-native-elements';
import {useContext} from 'react';
import {AuthContext} from '../../context/AuthContext';
import logo from '../../resources/images/parq_dino64x64.png';
import {isIphoneX} from '../../helpers/is-iphoneX';

function DrawerNav(props) {
  const context = useContext(AuthContext);

  const navigateTo = screen => {
    props.navigation.navigate(screen);
  };

  const signOut = async () => {
    await context.functions.signOutUser();
    props.navigation.navigate('Landing');
  };

  const navItems = [
    {
      title: 'Find Parking',
      icon: 'local-parking',
      to: 'Search',
    },
    {
      title: 'Your Vehicles',
      icon: 'drive-eta',
      to: 'VehicleList',
    },
    {
      title: 'Host Parking',
      icon: 'business',
      to: 'CarportList',
    },
    {
      title: 'Your Reservations',
      icon: 'receipt',
      to: 'ReservationList',
    },
    {
      title: 'Wallet',
      icon: 'account-balance-wallet',
      to: 'Payment',
    },
    {
      title: 'Help',
      icon: 'help-outline',
      to: 'Help',
    },
  ];

  const navLinks = navItems.map((item, i) => {
    return (
      <ListItem
        key={i}
        containerStyle={styles.linkContainer}
        underlayColor={'#11a4ff'}
        titleStyle={styles.linkText}
        title={item.title}
        leftIcon={{name: item.icon, color: '#000'}}
        onPress={() => navigateTo(item.to)}
      />
    );
  });

  if (process.env.NODE_ENV === 'development') {
    navLinks.push(
      <ListItem
        key={'index'}
        containerStyle={styles.linkContainer}
        underlayColor={'#11a4ff'}
        titleStyle={styles.linkText}
        title={'Index'}
        leftIcon={{name: 'list', color: '#000'}}
        onPress={() => navigateTo('Index')}
      />,
    );
  }

  return (
    <View style={styles.drawer}>
      <ScrollView style={styles.scroll}>
        <View style={isIphoneX() ? styles.cardX : styles.card}>
          <View style={styles.textcol}>
            <Image source={logo} />
          </View>
          <View style={styles.textcol2}>
            <Text style={styles.brandname}> parq</Text>
            <Text style={styles.subbrandname}> the parking app</Text>
          </View>
        </View>
        {navLinks}
      </ScrollView>
      <View style={styles.bottom}>
        <ListItem
          title={'Sign Out'}
          containerStyle={styles.signOutContainer}
          titleStyle={styles.signOutText}
          onPress={() => signOut()}
          rightIcon={{name: 'keyboard-return', color: '#000'}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottom: {
    justifyContent: 'flex-end',
  },
  drawer: {
    backgroundColor: '#11a4ff',
    flex: 1,
  },
  scroll: {
    backgroundColor: '#fff',
  },
  card: {
    paddingVertical: 24,
    paddingLeft: 16,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    backgroundColor: '#11a4ff',
    borderWidth: 0,
  },
  cardX: {
    paddingVertical: 24,
    paddingTop: 48,
    paddingLeft: 16,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    backgroundColor: '#11a4ff',
    borderWidth: 0,
  },
  textcol: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  textcol2: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingBottom: 24,
    paddingLeft: 12,
  },
  brandname: {
    color: '#fff',
    fontFamily: 'Muli-Black',
    fontSize: 48,
    textAlign: 'left',
  },
  subbrandname: {
    color: '#111',
    fontSize: 13,
    paddingLeft: 10,
    paddingTop: 4,
    textAlign: 'left',
    lineHeight: 14,
    fontFamily: 'Montserrat-SemiBoldItalic',
  },
  profileContainer: {
    backgroundColor: '#11a4ff',
  },
  profileText: {
    color: '#000',
    fontFamily: 'Montserrat-SemiBold',
    fontWeight: '600',
    fontSize: 18,
  },
  linkContainer: {
    backgroundColor: '#fff',
  },
  linkText: {
    color: '#000',
    fontFamily: 'Montserrat-SemiBold',
    fontWeight: '600',
  },
  signOutContainer: {
    backgroundColor: '#ffc630',
  },
  signOutText: {
    color: '#000',
    fontFamily: 'Montserrat-SemiBold',
    fontWeight: '600',
  },
});

export default withNavigation(DrawerNav);
