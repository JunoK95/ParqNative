import React, {useContext, useState, useEffect, useCallback} from 'react';
import {
  View,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import HeaderPadding from '../components/layout/HeaderPadding';
import {getOwnedCarports} from '../firebase_func/firestoreFunctions';
import {Icon} from 'react-native-elements';
import CarportCard2 from '../components/carport/CarportCard2';
import {withNavigationFocus} from 'react-navigation';

const CarportListView = props => {
  const context = useContext(AuthContext);
  const {isFocused} = props;
  const [carports, setports] = useState([]);
  const [fetching, setfetch] = useState(true);
  const [loading, setload] = useState(false);
  const {user_id, user_data} = context;

  const fetchData = useCallback(async () => {
    if (user_id) {
      await getOwnedCarports(user_id).then(res => {
        setports(res);
        setfetch(false);
      });
    }
    setfetch(false);
  }, []);

  useEffect(() => {
    setfetch(true);
    if (!user_id || !user_data) {
      setfetch(false);
      return;
    }
    if (user_data) {
      if (user_data.stripe_account_id) {
        console.log(user_data.stripe_account_id);
      }
    }
    fetchData();
  }, [isFocused]);

  const handleRegistrationClick = async () => {
    setload(true);
    props.navigation.navigate('StripeAccountVerification');
    setload(false);
  };

  const carportCardList = carports.map((c, i) => {
    return (
      <CarportCard2
        key={i}
        port={c.data}
        port_id={c.id}
        refreshData={fetchData}
      />
    );
  });

  let stripe_account_id;
  if (user_data) {
    stripe_account_id = user_data.stripe_account_id;
  }

  if (!stripe_account_id) {
    return (
      <View>
        <HeaderPadding to={'Home'} title={'Your Spaces'} />
        <ScrollView contentContainerStyle={styles.scrollcontainer}>
          {!loading ? (
            <TouchableHighlight
              onPress={() => handleRegistrationClick()}
              style={styles.container}
              underlayColor={'#c2e8ff'}>
              <Text style={styles.text}>Register As A Host</Text>
            </TouchableHighlight>
          ) : (
            <ActivityIndicator />
          )}
        </ScrollView>
      </View>
    );
  } else {
    return (
      <View>
        <HeaderPadding
          to={'Home'}
          title={'Your Spaces'}
          right={
            <TouchableOpacity
              onPress={() => props.navigation.navigate('CarportRegister')}>
              <Icon name={'add'} size={30} color={'#000'} />
            </TouchableOpacity>
          }
        />
        {fetching ? (
          <ActivityIndicator />
        ) : (
          <ScrollView contentContainerStyle={styles.scrollcontainer}>
            {carportCardList}
            <TouchableHighlight
              onPress={() => props.navigation.navigate('CarportRegister')}
              style={styles.container}
              underlayColor={'#c2e8ff'}>
              <Text style={styles.text}>Add Listing</Text>
            </TouchableHighlight>
          </ScrollView>
        )}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  scrollcontainer: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 64,
  },
  container: {
    width: Dimensions.get('window').width - 48,
    height: 48,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
  text: {
    fontFamily: 'Montserrat-MediumItalic',
  },
});

export default withNavigationFocus(CarportListView);
