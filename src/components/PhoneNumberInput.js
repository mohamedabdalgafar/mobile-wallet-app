import React from 'react';
import {Text, View, TextInput, StyleSheet} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import {FONTS} from '../constants';

const PhoneNumberInput = ({
  value,
  onChangeText,
  placeholder,
  type,
  style,
  multiLine,
  editable,
}) => {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      style={[styles.input, style]}
      keyboardType={type}
      multiline={multiLine}
      editable={editable}
    />
  );
};

export default PhoneNumberInput;
const styles = StyleSheet.create({
  input: {
    width: widthPercentageToDP('90%'),
    alignSelf: 'center',
    height: heightPercentageToDP(7),
    borderRadius: 5,
    backgroundColor: '#f0eff4',
    padding: 10,
    marginTop: 10,
    fontSize: RFValue(14),
    fontFamily: FONTS.fontFamily,
  },
});
