import React from 'react';
import {TouchableOpacity} from 'react-native';
import {COLORS, SIZES} from '../../constants';
import Feather from 'react-native-vector-icons/Feather';
const SearchButton = ({containerStyle, iconStyle, quantity, onPress}) => {
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
      <Feather name="search" size={22} color={COLORS.black} />
    </TouchableOpacity>
  );
};

export default SearchButton;
