import React from 'react';
import {StyleSheet, View, Text, GestureResponderEvent} from 'react-native';

interface DataFormat {
  title: string,
  onPress?: (event: GestureResponderEvent) => void,
  subtitle?: string, 
}

interface TitledListProps {
  title: string,
  data?: Array<DataFormat>,
  children?: React.ReactNode,
};

const TitledList: React.FC<TitledListProps> = ({title, children}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
};

export default TitledList;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 32,
  },
  title: {
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    fontSize: 26,
    paddingHorizontal: 16,
    color: '#555',
  }
});
