import React from 'react';
import {View, TouchableOpacity, Image, Text} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS, FONTS, icons, SIZES} from '../../constants';
const CartQuantityButton = ({containerStyle, iconStyle, quantity, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightOrange2,
        ...containerStyle,
      }}
      onPress={onPress}>
      <Image
        source={icons.shopping_cart}
        style={{
          width: RFValue(24),
          height: RFValue(24),
          tintColor: COLORS.black,
          ...iconStyle,
        }}
      />
      <View
        style={{
          position: 'absolute',
          top: 5,
          right: 5,
          height: 15,
          width: 15,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.primary,
        }}>
        <Text
          numberOfLines={1}
          style={{
            color: COLORS.white,
            // ...FONTS.body5,
            // lineHeight: 0,
            fontSize: 10,
          }}>
          {quantity}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CartQuantityButton;
