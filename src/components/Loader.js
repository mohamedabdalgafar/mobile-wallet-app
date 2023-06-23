import React from 'react';
import {View, ActivityIndicator, Modal, Text} from 'react-native';
import {COLORS, FONTS} from '../constants';

const Loader = ({visible}) => {
  return (
    <Modal visible={visible} transparent>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(52, 52, 52,0.4)',
        }}>
        <ActivityIndicator size={25} color={'white'} />

        <Text
          style={{
            color: 'white',
            fontFamily: FONTS.fontFamily,
            fontSize: 20,
            marginTop: 20,
          }}>
          انتظر ....
        </Text>
      </View>
    </Modal>
  );
};

export default Loader;
