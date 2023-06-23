import React from 'react';
import {View, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import {IconButton, Divider, Button} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS, FONTS, SIZES} from '../constants';
import * as Animatable from 'react-native-animatable';

const LogoutModal = ({cancel, confirm, showModal}) => {
  return (
    <Modal
      visible={showModal}
      onRequestClose={() => {
        cancel();
      }}
      transparent={true}
      animationType="fade">
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.6)',
          justifyContent: 'flex-end',
        }}>
        <TouchableOpacity
          onPress={() => {
            cancel();
          }}
          style={{...StyleSheet.absoluteFillObject}}></TouchableOpacity>

        <Animatable.View
          duration={500}
          animation={'fadeInUpBig'}
          style={{
            backgroundColor: COLORS.white,
            paddingVertical: RFValue(5),
            paddingHorizontal: RFValue(15),

            width: '100%',
            borderTopLeftRadius: RFValue(15),
            borderTopRightRadius: RFValue(15),
          }}>
          <IconButton
            style={{
              alignSelf: 'flex-end',
            }}
            // size={40}
            icon={() => (
              <Ionicons name="md-close-sharp" size={28} color={COLORS.black} />
            )}
            onPress={() => {
              cancel();
            }}
          />

          <View
            style={{
              alignItems: 'center',

              marginVertical: RFValue(10),
            }}>
            <MaterialIcons name="error" size={40} color={COLORS.red} />

            <Text
              style={{
                ...FONTS.h3,
                // fontSize: SIZES.body3 + 3,
                // flex: 1,
                marginVertical: RFValue(11),
              }}>
              هل أنت متأكد من أنك تريد تسجيل الخروج؟
            </Text>
          </View>

          <Button
            mode="contained"
            color={COLORS.primary}
            labelStyle={{
              ...FONTS.h3,
              color: COLORS.white,
            }}
            onPress={() => {
              confirm();
            }}>
            تسجيل الخروج
          </Button>
        </Animatable.View>
      </View>
    </Modal>
  );
};

export default LogoutModal;
