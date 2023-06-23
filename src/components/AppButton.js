import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as WP,
  heightPercentageToDP as HP,
} from 'react-native-responsive-screen';
import {COLORS, FONTS} from '../constants';
import {RFValue} from 'react-native-responsive-fontsize';
const AppButton = ({lable, onPress, style, loading}) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      disabled={loading}>
      {loading ? (
        <ActivityIndicator color={'white'} size={25} />
      ) : (
        <Text style={styles.appButtonText}>{lable}</Text>
      )}
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  button: {
    width: WP('90%'),
    height: HP(7),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    marginTop: 20,
  },
  appButtonText: {
    color: 'white',
    fontSize: RFValue(15),
    fontFamily: FONTS.fontFamily,
  },
});
