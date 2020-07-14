import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {AuthContext} from '../../context/AuthContext';
import CustomPickerItem from '../../components/picker/CustomPickerItem';

const NewPaymentPicker = ({title, setselected, setopenGen}) => {
  const context = useContext(AuthContext);
  const [fetch, setfetch] = useState(false);
  const [select, setselect] = useState(null);
  const [cards, setcards] = useState(null);
  // const [wallet, setwallet] = useState(null);
  const [modalopen, setmodalopen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setfetch(true);
      if (!context.user_data) {
        setfetch(false);
        return;
      } else if (!context.user_data.stripe_customer_id) {
        await context.functions.assignStripeCustomerId();
        setfetch(false);
      } else {
        const payments = await context.functions
          .getAllPaymentMethods()
          .then(res => {
            return res;
          });
        if (payments.cards.length > 0) {
          setcards(payments.cards);
          setselect(payments.cards[0]);
          setselected(payments.cards[0]);
          // setwallet(payments.wallet);
        }
        // else {
        //   setwallet(payments.wallet);
        //   setselect(payments.wallet);
        //   setselected(payments.wallet);
        // }
        setfetch(false);
      }
    }
    fetchData();
  }, [context.functions, context.user_data, setselect, setselected, modalopen]);

  let pickerItems = [];
  if (!fetch && cards) {
    pickerItems = cards.map((c, i) => {
      return (
        <CustomPickerItem
          key={i}
          title={'... ' + c.last4}
          icon={'credit-card'}
          handlePress={() => {
            setselect(c);
            setselected(c);
            setmodalopen(false);
            console.log(c);
          }}
        />
      );
    });
  } else if (fetch) {
    pickerItems = (
      <View style={styles.item}>
        <ActivityIndicator />
      </View>
    );
  }

  let selectText = {
    text: 'Select Payment Method',
    icon: 'credit-card',
  };

  if (select) {
    switch (select.object) {
      case 'wallet':
        selectText = {
          text: `${select.credit} coins`,
          icon: 'coins',
        };
        break;
      case 'card':
        selectText = {
          text: `... ${select.last4}`,
          icon: 'credit-card',
        };
        break;
      default:
        break;
    }
  }

  return (
    <React.Fragment>
      <TouchableOpacity onPress={() => setmodalopen(true)}>
        <View style={styles.item}>
          <View style={styles.itemleft}>
            <FontAwesome5Icon name={selectText.icon} size={24} />
          </View>
          <View style={styles.itemright}>
            <Text style={styles.itemtext}>{selectText.text}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        style={styles.modal}
        visible={modalopen}
        onRequestClose={() => setmodalopen(false)}>
        <TouchableWithoutFeedback onPress={() => setmodalopen(false)}>
          <View style={styles.bg}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.pickercontainer}>
                <View style={styles.pickerheader}>
                  <Text style={styles.pickertitle}>
                    {title ? title : 'Select'}
                  </Text>
                </View>
                <ScrollView>
                  {/* {wallet && (
                    <CustomPickerItem
                      title={wallet.credit + ' coins'}
                      subtitle={'1 coin = $0.01'}
                      icon={'coins'}
                      handlePress={() => {
                        setselect(wallet);
                        setselected(wallet);
                        setmodalopen(false);
                        console.log(wallet);
                      }}
                    />
                  )} */}
                  {pickerItems}
                  <CustomPickerItem
                    title={'Add Payment Card'}
                    icon={'plus'}
                    handlePress={() => {
                      setmodalopen(false);
                      setopenGen(true);
                    }}
                  />
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </React.Fragment>
  );
};

export default withNavigation(NewPaymentPicker);

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  bg: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  pickercontainer: {
    backgroundColor: '#fff',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    height: Dimensions.get('window').height * 0.4,
    opacity: 1,
  },
  pickerheader: {
    justifyContent: 'center',
    paddingVertical: 12,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: '#ffc630',
    alignItems: 'center',
  },
  pickertitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
  },
  item: {
    flexDirection: 'row',
    paddingVertical: 16,
  },
  itemleft: {
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  itemleft2: {
    paddingRight: 20,
    justifyContent: 'center',
  },
  itemright: {
    justifyContent: 'center',
  },
  itemtext: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 15,
    paddingRight: 72,
  },
});
