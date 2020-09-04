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
import HeaderPadding from '../components/header-padding/HeaderPadding';
import {Icon} from 'react-native-elements';
import CarportCard2 from '../components/carport/CarportCard2';
import {withNavigationFocus} from 'react-navigation';
import {getOwnedCarports} from '../firebase_func';
import RoundedButton from '../components/button/RoundedButton';

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
            <View style={styles.container}>
              <RoundedButton
                title={'+ Add Listing'}
                backgroundColor={'#11a4ff'}
                textColor={'white'}
                fontSize={16}
                width={Dimensions.get('window').width - 48}
                onPress={() => props.navigation.navigate('CarportRegister')}
              />
            </View>
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
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
  },
});

export default withNavigationFocus(CarportListView);
