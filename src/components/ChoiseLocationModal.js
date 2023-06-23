import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import {IconButton, Divider} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS, FONTS, SIZES} from '../constants';
import * as Animatable from 'react-native-animatable';
import {useDispatch, useSelector} from 'react-redux';
import {changeToPrime} from '../Redux/actions/Locationctions';

const ChoiseLocationModal = ({
  showChoiseLoc,
  setShowChoiseLoc,
  navigateOption,
}) => {
  const LocationsReducer = useSelector(state => state.LocationsReducer);
  const dispatch = useDispatch();

  return (
    <Modal
      visible={showChoiseLoc}
      onRequestClose={() => {
        setShowChoiseLoc(false);
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
            setShowChoiseLoc(false);
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
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                ...FONTS.h2,
                color: COLORS.black,
              }}>
              التوصيل إلى
            </Text>
            <IconButton
              // size={40}
              icon={() => (
                <Ionicons
                  name="md-close-sharp"
                  size={28}
                  color={COLORS.black}
                />
              )}
              onPress={() => {
                setShowChoiseLoc(false);
              }}
            />
          </View>

          {/* <TouchableOpacity
            onPress={getCurrentLocation}
            style={{
              flexDirection: 'row',
              alignItems: 'center',

              marginVertical: RFValue(10),
            }}>
            <Feather name="navigation" size={24} />

            <Text
              style={{
                ...FONTS.body3,
                fontSize: SIZES.body3 + 3,
                flex: 1,
                marginLeft: RFValue(11),
              }}>
              موقعى الحالى
            </Text>
          </TouchableOpacity> */}
          <Divider />

          {LocationsReducer?.storedLoactions.map((item, index) => (
            <TouchableOpacity
              key={`**-${index}`}
              onPress={async () => {
                dispatch(
                  await changeToPrime(LocationsReducer.storedLoactions, index),
                );
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 4,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 10,
                  }}>
                  <Ionicons
                    name="location-outline"
                    size={24}
                    color={COLORS.black}
                  />
                </View>
                <View>
                  <Text
                    style={{
                      ...FONTS.h3,
                      color: COLORS.black,
                    }}>
                    {item.address_title == 'home' ? 'المنزل' : 'العمل'}
                  </Text>
                  <Text
                    style={{
                      fontFamily: FONTS.fontFamily,
                    }}>
                    {item.address_description}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {item.address_primary == '1' ? (
                  <Ionicons
                    name="checkmark-circle"
                    size={24}
                    color={COLORS.primary}
                  />
                ) : (
                  <Ionicons
                    name="ios-ellipse-outline"
                    size={24}
                    color={COLORS.primary}
                  />
                )}
              </View>
            </TouchableOpacity>
          ))}

          <Divider />
          <TouchableOpacity
            onPress={navigateOption}
            style={{
              flexDirection: 'row',
              alignItems: 'center',

              marginVertical: RFValue(10),
            }}>
            <Feather name="plus" color={COLORS.primary} size={24} />

            <Text
              style={{
                ...FONTS.body3,
                fontSize: SIZES.body3 + 3,
                flex: 1,
                marginLeft: RFValue(11),
                color: COLORS.primary,
              }}>
              إضافة عنوان جديد
            </Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    </Modal>
  );
};

export default ChoiseLocationModal;
