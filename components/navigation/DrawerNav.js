import React from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {withNavigation} from 'react-navigation';
import {ListItem} from 'react-native-elements';
import {useContext} from 'react';
import {AuthContext} from '../../context/AuthContext';

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

  if (!context.user_data) {
    return <View style={styles.drawer} />;
  }
  return (
    <View style={styles.drawer}>
      <ScrollView style={styles.scroll}>
        <View style={styles.card}>
          <ListItem
            containerStyle={styles.profileContainer}
            titleStyle={styles.profileText}
            title={
              context.user_data.display_name
                ? context.user_data.display_name
                : 'No Name'
            }
            subtitle={'coins '}
            onPress={() => navigateTo('UserProfile')}
            leftIcon={{name: 'person-pin', color: '#000'}}
          />
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
    paddingTop: 24,
    paddingBottom: 24,
    backgroundColor: '#11a4ff',
    borderWidth: 0,
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
