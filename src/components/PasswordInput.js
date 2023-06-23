import React from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {FONTS} from '../constants';
const PasswordInput = ({
  value,
  onChangeText,
  placeholder,
  type,
  securePass,
  onSecurePassChange,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={styles.input}
        secureTextEntry={securePass}
      />

      <View style={styles.eyeIcon}>
        <TouchableOpacity onPress={onSecurePassChange}>
          <Ionicons name={securePass ? 'eye-off' : 'eye'} size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PasswordInput;
const styles = StyleSheet.create({
  input: {
    flex: 6,
    backgroundColor: '#f0eff4',
    padding: 10,
    fontSize: RFValue(14),
    fontFamily: FONTS.fontFamily,
    borderRadius: 10,
  },
  container: {
    width: widthPercentageToDP('90%'),
    alignSelf: 'center',
    height: heightPercentageToDP(7),
    marginTop: 10,
    flexDirection: 'row',
    backgroundColor: '#f0eff4',
    borderRadius: 10,
  },
  eyeIcon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
