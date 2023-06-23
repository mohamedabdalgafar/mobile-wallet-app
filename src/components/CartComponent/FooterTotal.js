import React, {useEffect, useState} from 'react';
import {Text, View, Platform, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {RFValue} from 'react-native-responsive-fontsize';
import {TextButton, LineDivider} from './index';
import {FONTS, SIZES, COLORS} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

// import DropDownPicker from 'react-native-dropdown-picker';
import {useDispatch, useSelector} from 'react-redux';
import ShowAddresses from '../ShowAddresses';
import {
  changeToPrime,
  loadPlacePrime,
} from '../../Redux/actions/Locationctions';
import {POST} from '../../Helpers/ApiHelper';
const FooterTotal = ({total, onPress, onPressAddLocation, disable}) => {
  const dispatch = useDispatch();
  const {connected, uData} = useSelector(state => state.UserDataReducer);
  const LocationsReducer = useSelector(state => state.LocationsReducer);
  const [showSelectLoc, setShowSelectLoc] = useState(false);
  function getPrimePlace() {
    let places = LocationsReducer.storedLoactions.filter(
      item => item.address_primary == '1',
    )[0];
    let isObj = typeof places === 'object';
    let type = '',
      name = '';
    if (isObj) {
      type = places.address_title == 'home' ? 'المنزل' : 'العمل';
      name = places.address_description;
    }

    return {
      type,
      name,
      place: places,
    };
  }

  return (
    <View>
      {/* Shadow */}
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        colors={[COLORS.transparent, COLORS.lightGray1]}
        style={{
          position: 'absolute',
          top: -15,
          left: 0,
          right: 0,
          height: Platform.OS === 'ios' ? 200 : 50,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        }}
      />
      {/* Order Details */}
      <View
        style={{
          padding: SIZES.padding,
          paddingTop: 11,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: COLORS.white,
        }}>
        {/* Subtotal */}
        {/* <View
          style={{
            flexDirection: 'row',
          }}>
          <Text
            style={{
              flex: 1,
              fontSize: SIZES.body3,
              fontFamily: FONTS.fontFamily,
              color: COLORS.black,
            }}>
            المبلغ
          </Text>
          <Text
            style={{
              fontSize: SIZES.h3,
              fontFamily: FONTS.fontFamily,
              color: COLORS.black,
            }}>
            {subTotal.toFixed(2)} جنية
          </Text>
        </View> */}
        {/* Shipping Fee */}
        <View
          style={{
            // flexDirection: 'row',
            marginTop: SIZES.base,
            // marginBottom: SIZES.padding,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                ...FONTS.h3,
                color: COLORS.black,
              }}>
              التوصيل إلى
            </Text>
            <TouchableOpacity
              onPress={() => {
                if (LocationsReducer?.storedLoactions.length > 0) {
                  setShowSelectLoc(true);
                } else {
                  onPressAddLocation();
                }
              }}>
              <Text style={{...FONTS.h3, color: COLORS.primary}}>
                {LocationsReducer?.storedLoactions.length > 0
                  ? 'تغيير'
                  : 'أضف عنوان'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {LocationsReducer?.storedLoactions.length > 0 &&
          (getPrimePlace().type != '' ? (
            <>
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
                    {getPrimePlace().type}
                  </Text>
                  <Text
                    style={{
                      fontFamily: FONTS.fontFamily,
                    }}>
                    {getPrimePlace().name}
                  </Text>
                </View>
              </View>
            </>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setShowSelectLoc(true);
              }}>
              <Text
                style={{
                  ...FONTS.h3,
                  color: COLORS.primary,
                }}>
                برجاء تحديد عنوان رئيسى
              </Text>
            </TouchableOpacity>
          ))}
        {/* Line */}
        <LineDivider />
        {/* Total */}
        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.base,
          }}>
          <Text
            style={{
              flex: 1,
              fontSize: SIZES.h2,
              fontFamily: FONTS.fontFamily,
              color: COLORS.black,
            }}>
            المبلغ الكلى:
          </Text>

          <Text
            style={{
              fontSize: SIZES.h2,
              fontFamily: FONTS.fontFamily,
              color: COLORS.black,
            }}>
            {total.toFixed(2)} جنية
          </Text>
        </View>
        {/* Order */}
        <TextButton
          disabled={disable}
          buttonContainerStyle={{
            height: RFValue(40),
            marginTop: SIZES.padding,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.primary,
          }}
          label={'إتمام الشراء'}
          onPress={() => {
            onPress(getPrimePlace());
          }}
        />
      </View>
      <ShowAddresses
        showModal={showSelectLoc}
        cancel={() => {
          setShowSelectLoc(false);
        }}
        onPressAddLocation={() => {
          setShowSelectLoc(false);
          onPressAddLocation();
        }}
        makePrime={async item => {
          if (connected) {
            let data_to_send = {
              address_id: item.address_id,
              address_user_id: uData.user_id,
              address_primary: '1',
            };
            dispatch(
              await loadPlacePrime(
                LocationsReducer.storedLoactions,
                item.address_id,
                true,
              ),
            );
            let res = await POST(
              'user_info/address/change_address_primary.php',
              data_to_send,
            );
            if (res != null) {
              setShowSelectLoc(false);
              dispatch(
                await changeToPrime(
                  LocationsReducer.storedLoactions,
                  item.address_id,
                ),
              );
            } else {
              dispatch(
                await loadPlacePrime(
                  LocationsReducer.storedLoactions,
                  item.address_id,
                  false,
                ),
              );
            }
          }
        }}
      />
    </View>
  );
};

export default FooterTotal;
