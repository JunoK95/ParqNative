import React from 'react';
import {GestureResponderEvent, StyleSheet} from 'react-native';
import PayoutCard from '../../components/payout-card/PayoutCard';

interface PayoutCardSectionProps {
  account?: any,
  balance?: any,
  onBottomLinkPress?: (event: GestureResponderEvent) => void,
};

const PayoutCardSection: React.FC<PayoutCardSectionProps> = ({account, balance, onBottomLinkPress}) => {
  let bank_last4: string = 'No Bank Connected';
  let amount: number;
  let bottomLinkText: string = 'Connect Bank Account';
  if (account.external_accounts) {
    if (account.external_accounts.data) {
      if (account.external_accounts.data.length > 0) {
        bank_last4 = account.external_accounts.data[0].last4;
      } 
      console.log(account.external_accounts.data);
    }
  }

  if (balance.pending) {
    if (balance.pending.length > 0) {
      amount = balance.pending[0].amount;
    }
  }

  return (
    <PayoutCard
      amount={amount}
      title={'YOUR BALANCE'}
      bank_last4={bank_last4}
      onBottomLinkPress={onBottomLinkPress}
      bottomLinkText={'Go To Payout'}
      backgroundColor={'white'}
    />
  );
};

export default PayoutCardSection;

const styles = StyleSheet.create({});
