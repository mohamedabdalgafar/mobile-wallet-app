import React, {useRef, useEffect, useState} from 'react';
import {View, StyleSheet, Modal, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {IconButton} from 'react-native-paper';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {AppData} from '../constants';

const SearchMaoModal = ({
  visabelGoogleMapSearch,
  setVisabelGoogleMapSearch,
  onPressLocaction,
}) => {
  return (
    <Modal
      visible={visabelGoogleMapSearch}
      transparent={true}
      onRequestClose={() => {
        setVisabelGoogleMapSearch(false);
      }}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.4)',
          padding: 10,
        }}>
        <TouchableOpacity
          onPress={() => {
            setVisabelGoogleMapSearch(false);
          }}
          style={{...StyleSheet.absoluteFill}}></TouchableOpacity>
        <GooglePlacesAutocomplete
          enablePoweredByContainer={true}
          debounce={400}
          fetchDetails={true}
          placeholder={'البحث عن موقعك'}
          renderRightButton={() => (
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                setVisabelGoogleMapSearch(false);
              }}>
              <Ionicons
                name="arrow-forward-outline"
                size={30}
                style={{alignSelf: 'center', marginHorizontal: 10}}
              />
            </TouchableOpacity>
          )}
          styles={{
            container: {
              marginTop: 2,

              //   minHeight: RFValue(100),
              //   alignSelf: 'center',
              // backgroundColor: COLORS.gray3,
            },
          }}
          onPress={(data, details = null) => {
            let loc = {
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
              latitudeDelta: 0.002,
              longitudeDelta: 0.002,
            };
            onPressLocaction(loc);
          }}
          query={{
            key: AppData.GOOGLE_MAPS_API,
            language: 'ar',
          }}
        />
      </View>
    </Modal>
  );
};

export default SearchMaoModal;
