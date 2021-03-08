import React from 'react';
import {StyleSheet, View} from 'react-native';

interface RoundedCardProps {
  children: React.ReactNode,
  backgroundColor?: string,
  borderColor?: string,
}

const RoundedCard: React.FC<RoundedCardProps> = ({children, backgroundColor, borderColor}) => {
  return (
    <View style={{...styles.container, backgroundColor, borderColor}}>
      {children}
    </View>
  );
};

export default RoundedCard;

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: '#CCC',
    borderRadius: 24,
  }
});
