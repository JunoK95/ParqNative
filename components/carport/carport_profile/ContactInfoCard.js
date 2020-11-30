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
import {getUserContactInfo} from '../../../api/firestore_index';

const ContactInfoCard = props => {
  const {port} = props;
  const [email, setemail] = useState(null);
  const [phone, setphone] = useState(null);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const {owner_id} = port;
        const response = await getUserContactInfo(owner_id);
        if (response.error) {
          console.error('ERROR FETCHING CONTACT INFO => ', response.error);
        } else {
          setemail(response.data.email);
          setphone(response.data.phone);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchInfo();
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
                  if (phone !== 'NONE') {
                    Linking.openURL(`tel:${phone}`);
                  }
                }}>
                <Text style={styles.rowitemtext}>
                  {phone !== 'NONE' ? phone : 'No Phone Added'}
                </Text>
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
