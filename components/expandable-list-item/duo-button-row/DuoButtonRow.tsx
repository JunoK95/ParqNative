import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import TouchableNativeReplacement from '../../layout/TouchableNativeReplacement';

interface DuoButtonRowProps {
  leftText: string;
  leftPress: () => void;
  rightText: string;
  rightPress: () => void;
}

const DuoButtonRow: React.FC<DuoButtonRowProps> = ({
  leftText,
  leftPress,
  rightText,
  rightPress,
}) => {
  return (
    <View style={styles.row}>
      <View style={styles.halfColumn}>
        <TouchableNativeReplacement color={'gray'} onPress={leftPress}>
          <View style={styles.buttonContainer}>
            <View style={styles.centered}>
              <Text style={styles.leftText}>{leftText}</Text>
            </View>
          </View>
        </TouchableNativeReplacement>
      </View>
      <View style={styles.halfColumn}>
        <TouchableNativeReplacement color={'red'} onPress={rightPress}>
          <View style={styles.buttonContainer}>
            <View style={styles.centered}>
              <Text style={styles.rightText}>{rightText}</Text>
            </View>
          </View>
        </TouchableNativeReplacement>
      </View>
    </View>
  );
};

export default DuoButtonRow;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  halfColumn: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  buttonContainer: {
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  centered: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 15,
    color: '#888',
    textAlign: 'center',
  },
  rightText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 15,
    color: 'red',
    textAlign: 'center',
  },
});
