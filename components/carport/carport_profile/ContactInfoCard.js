import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
  Linking,
  TouchableOpacity,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Axios from 'axios';

const ContactInfoCard = props => {
  const {port} = props;
  const [email, setemail] = useState(null);
  const [phone, setphone] = useState(null);

  useEffect(() => {
    try {
      const {owner_id} = port;
      Axios({
        method: 'POST',
        url:
          'https://us-central1-parq-dev.cloudfunctions.net/getUserContactInfo',
        data: {
          user_id: owner_id,
        },
      }).then(res => {
        console.log('CONTACT INFO => ', res.data);
        setemail(res.data.email);
        setphone(res.data.phone);
      });
    } catch (error) {
      console.log(error);
    }
    port.owner_id;
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <View style={styles.rowtitle}>
          <Text style={styles.rowitemtitle}>Contact Host</Text>
        </View>
        <View style={styles.rowitem}>
          <View style={styles.itemcolumn}>
            <FontAwesome5Icon name={'envelope'} size={26} />
          </View>
          <View style={styles.itemcolumn}>
            <Text style={styles.rowitemtitle}>E-Mail</Text>
            {email ? (
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(`mailto:${email}`);
                }}>
                <Text style={styles.rowitemtext}>{email}</Text>
              </TouchableOpacity>
            ) : (
              <ActivityIndicator />
            )}
          </View>
        </View>
        <View style={styles.rowitem}>
          <View style={styles.itemcolumn}>
            <FontAwesome5Icon name={'phone'} size={30} />
          </View>
          <View style={styles.itemcolumn}>
            <Text style={styles.rowitemtitle}>Phone</Text>
            {phone ? (
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(`tel:${phone}`);
                }}>
                <Text style={styles.rowitemtext}>{phone}</Text>
              </TouchableOpacity>
            ) : (
              <ActivityIndicator />
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default ContactInfoCard;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 32,
    backgroundColor: '#fff',
    borderRadius: 24,
    marginVertical: 12,
    paddingVertical: 12,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    paddingLeft: 16,
  },
  rowitem: {
    paddingBottom: 12,
    flexDirection: 'row',
  },
  rowtitle: {
    alignItems: 'center',
    paddingBottom: 8,
  },
  rowitemtitle: {
    textAlign: 'left',
    fontFamily: 'Montserrat-SemiBold',
    color: '#444',
    fontSize: 15,
  },
  rowitemtext: {
    textAlign: 'left',
    fontFamily: 'Montserrat-Medium',
    color: '#777',
    fontSize: 15,
  },
  rowitemtitle2: {
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    color: '#444',
    fontSize: 15,
  },
  rowitemtext2: {
    textAlign: 'center',
    fontFamily: 'Montserrat-MediumItalic',
    color: '#777',
    fontSize: 15,
  },
  itemcolumn: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
});
