import React from 'react';
import {GestureResponderEvent, StyleSheet, Text, View} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { convertToDollar } from '../../helpers/helper';
import RoundedCard from '../rounded-card/RoundedCard';

interface PayoutCardProps {
  amount?: number | null,
  title?: string,
  bottomLinkText?: string,
  backgroundColor?: string,
  bank_last4?: string,
  onBottomLinkPress?: (event: GestureResponderEvent) => void,
};

const PayoutCard: React.FC<PayoutCardProps> = 
  ({amount, title, backgroundColor, bottomLinkText, onBottomLinkPress, bank_last4}) => {
    return (
      <RoundedCard 
        backgroundColor={'#11A4FF'} 
        borderColor={'#11A4FF'}>
        <View style={styles.topView}>
          <Text style={styles.titleText}>{title}</Text>
        </View>
        <View style={styles.middleView}>
          <Text style={styles.mainText}>
            {`$${convertToDollar(amount/100)}`}
          </Text>
          <View style={styles.row}>
            <FontAwesome5Icon name={'university'} size={16} color={'white'} />
            <Text style={styles.bankText}> {` ... ${bank_last4}`}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={onBottomLinkPress}>
          <View style={styles.bottomView}>
            <Text style={styles.linkText}>{`${bottomLinkText} `}</Text>
            <FontAwesome5Icon name={'chevron-right'} color={'white'} />
          </View>
        </TouchableOpacity>
      </RoundedCard>
    );
};

export default PayoutCard;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 16,
  },
  bankText: {
    fontFamily: 'Montserrat',
    fontSize: 14,
    color: 'white',
  },
  mainText: {
    fontSize: 44,
    color: 'white',
  },
  linkText: {
    fontFamily: 'Montserrat',
    fontWeight: '600',
  },
  titleText: {
    fontFamily: 'Montserrat',
    fontWeight: '600',
    color: 'white',
  },
  topView: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  middleView: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomView: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderTopColor: 'white',
    borderTopWidth: 2,
    borderRadius: 24,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
