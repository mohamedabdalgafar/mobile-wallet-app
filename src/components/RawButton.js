import React from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity, View, Text} from 'react-native';
import {COLORS, FONTS} from '../constants';

const RawButton = ({title, onPress, iconName}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: RFValue(10),
      }}>
      <View>
        <Ionicons name={iconName} size={24} color={COLORS.black} />
      </View>
      <View
        style={{
          flex: 1,
          marginLeft: RFValue(11),
        }}>
        <Text style={{...FONTS.h3, fontSize: 19, color: COLORS.black}}>
          {title}
        </Text>
      </View>
      <View>
        <Ionicons name="md-chevron-back-sharp" size={24} color={COLORS.black} />
      </View>
    </TouchableOpacity>
  );
};
export default RawButton;
