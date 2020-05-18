import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import TouchableNativeReplacement from './TouchableNativeReplacement';

const ParagraphBlock = props => {
  const {title, subtitle, text, collapsible, titleIcon} = props;

  if (collapsible) {
    return (
      <TouchableNativeReplacement>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </TouchableNativeReplacement>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.col}>
            <FontAwesome5Icon name={titleIcon} />
          </View>
          <Text style={styles.title}>{title}</Text>
        </View>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        <View style={styles.textContainer}>
          <Text style={styles.text}>{text}</Text>
        </View>
      </View>
    );
  }
};

export default ParagraphBlock;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  row: {
    flexDirection: 'row',
  },
  col: {
    paddingHorizontal: 12,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    paddingRight: 32,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 17,
  },
  textContainer: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
    paddingHorizontal: 32,
    paddingVertical: 8,
  },
});
