import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS, FONTS} from '../constants';

const InternetConnetionLost = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>لا يوجد إتصال بالإنترنت</Text>
    </View>
  );
};

export default InternetConnetionLost;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    backgroundColor: COLORS.primary,
  },
  text: {
    fontSize: RFValue(16),
    fontFamily: FONTS.fontFamily,
    color: COLORS.white,
  },
});
