import React, {useState, useRef} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Vibration,
} from 'react-native';
import LottieView from 'lottie-react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {Button} from 'react-native-paper';
import {Header, IconButton} from '../../components';
import {RNCamera} from 'react-native-camera';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, FONTS, icons, lotties, SIZES} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
import {redChangeAlertModal} from '../../Redux/actions';
import {redChangeNoonRecive} from '../../Redux/actions/UserBehavior';
import * as Animatable from 'react-native-animatable';
import Toast from 'react-native-simple-toast';
const InputsPage = ({val, setVal, title, disable}) => {
  return (
    <>
      <Text
        style={{
          fontFamily: FONTS.fontFamily,
          fontSize: 20,
          marginLeft: 25,
          color: COLORS.white,
        }}>
        {title}
      </Text>
      <View
        style={{
          marginTop: -20,
          width: '90%',
          alignSelf: 'center',
          paddingHorizontal: SIZES.padding,
          marginTop: SIZES.base,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
        }}>
        <TextInput
          value={val}
          placeholder="المبلغ"
          style={{
            flex: 1,
            textAlign: 'right',
            fontFamily: FONTS.fontFamily,
          }}
          placeholderTextColor={COLORS.gray}
          keyboardType="number-pad"
          autoCapitalize="none"
          onChangeText={text => setVal(text)}
        />
      </View>
    </>
  );
};
const NoonReciveScanner = ({navigation}) => {
  const dispatch = useDispatch();
  const {NoonRecive} = useSelector(state => state.UserDataReducer);
  const [isFlash, setIsFlash] = useState(false);

  const scannerRef = useRef();
  const [isScan, setIsScan] = useState(false);
  const [scanResult, setScanResult] = useState(false);
  const [result, setResult] = useState(null);
  const [amount, setAmount] = useState('');
  const [isReactive, setIsReactive] = useState(false);

  function onSuccess(e) {
    const check = e.data;
    let isExist = false;

    for (let i of NoonRecive) {
      if (i.order_id == check) {
        isExist = true;
        Toast.show('هذا الاوردر موجود بالفعل');
      }
    }

    if (!isExist) {
      setResult(check);
      setScanResult(true);
      setIsScan(false);
    } else {
      setIsReactive(true);

      setTimeout(() => {
        setIsReactive(false);
      }, 3500);
    }
  }

  const activeQR = () => {
    setIsScan(true);
    setAmount('');
  };
  const scanAgain = () => {
    setIsScan(true);
    setAmount('');

    setScanResult(false);
  };

  function AddOrder() {
    if (amount.trim().length <= 0) {
      let modalData = {
        show: true,
        message: 'برجاء إدخال المبلغ بشكل صحيح.',
        res: 'error',
      };
      dispatch(redChangeAlertModal(modalData));
      return null;
    }
    if (amount * 0 != 0) {
      let modalData = {
        show: true,
        message: 'برجاء إدخال المبلغ بشكل صحيح',
        res: 'error',
      };
      dispatch(redChangeAlertModal(modalData));
      return null;
    }

    let obj = {
      order_id: result,
      amount_cash: amount.trim(),
      date: new Date(),
    };
    const arrClone = [...NoonRecive, obj];

    dispatch(redChangeNoonRecive(arrClone));
    setResult(null);
    setScanResult(false);
  }

  function renderHeader() {
    return (
      <Header
        title={'Scan QR Code'}
        containerStyle={{
          height: 50,
          marginHorizontal: SIZES.padding,
          marginTop: 25,
        }}
        titleStyle={{
          ...FONTS.h2,
        }}
        leftComponent={
          <IconButton
            icon={icons.back}
            containerStyle={{
              width: 40,
              transform: [{rotate: '180deg'}],
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderRadius: SIZES.radius,
              borderColor: COLORS.black,
            }}
            iconStyle={{
              width: 20,
              height: 20,
              tintColor: COLORS.black,
            }}
            onPress={() => {
              if (isScan) {
                setIsScan(false);
              } else {
                navigation.goBack();
              }
            }}
          />
        }
        rightComponent={
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('NoonReciveScannerResults');
            }}
            style={{
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderRadius: SIZES.radius,
              borderColor: COLORS.primary,
            }}>
            <Text
              style={{
                fontFamily: FONTS.fontFamily,
                color: COLORS.primary,
              }}>
              {NoonRecive.length}
            </Text>
          </TouchableOpacity>
        }
      />
    );
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: COLORS.white,
        // backgroundColor: COLORS.white,
      }}>
      {renderHeader()}

      {!isScan && !scanResult && (
        <Animatable.View animation={'flipInX'} style={styles.cardView}>
          <Ionicons name="camera" size={40} color={COLORS.white} />

          <Text
            numberOfLines={8}
            style={{...styles.descText, color: COLORS.white}}>
            Please move your camera {'\n'} over the QR Code
          </Text>
          <LottieView
            source={lotties.qr_code}
            autoPlay
            loop
            style={{height: RFValue(150), width: '100%'}}
            resizeMode="contain"
          />
          <TouchableOpacity
            onPress={() => {
              activeQR();
            }}
            style={styles.buttonScan}>
            <View style={styles.buttonWrapper}>
              <Text style={{...styles.buttonTextStyle, color: COLORS.white}}>
                Scan QR Code
              </Text>
              <Ionicons name="camera" size={40} color={COLORS.white} />
            </View>
          </TouchableOpacity>
        </Animatable.View>
      )}

      {scanResult && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Animatable.View animation={'flipInY'} style={styles.scanCardView}>
            <Text
              style={{
                ...FONTS.h2,
                color: COLORS.white,
              }}>
              الشحنة رقم : {result}
            </Text>

            <InputsPage val={amount} setVal={setAmount} title={'أدخل المبلغ'} />
            <Button
              onPress={() => {
                AddOrder();
              }}
              mode="contained"
              color={COLORS.white}
              style={{
                width: '90%',
                alignSelf: 'center',
                marginTop: 15,
              }}
              labelStyle={{
                ...FONTS.h3,
              }}>
              إضافة
            </Button>

            <TouchableOpacity
              onPress={() => {
                scanAgain();
              }}
              style={{
                ...styles.buttonScan,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={styles.buttonWrapper}>
                <Text style={{...styles.buttonTextStyle, color: COLORS.white}}>
                  Click to scan again
                </Text>
                <Ionicons name="camera" size={40} color={COLORS.white} />
              </View>
            </TouchableOpacity>
          </Animatable.View>
        </ScrollView>
      )}

      {isScan && (
        <Animatable.View
          animation={'slideInUp'}
          useNativeDriver
          style={{
            flex: 1,
          }}>
          <QRCodeScanner
            reactivate={true}
            showMarker={true}
            markerStyle={{
              borderRadius: 20,
              borderColor: COLORS.primary,
            }}
            flashMode={
              isFlash
                ? RNCamera.Constants.FlashMode.torch
                : RNCamera.Constants.FlashMode.off
            }
            ref={scannerRef}
            reactivateTimeout={isReactive ? 3500 : 0}
            onRead={e => {
              onSuccess(e);
            }}
            topContent={
              <Text style={styles.centerText}>
                Please move your camera {'\n'} over the QR Code
              </Text>
            }
            bottomContent={
              <TouchableOpacity
                onPress={() => {
                  setIsFlash(!isFlash);
                }}
                style={{
                  backgroundColor: COLORS.primary,
                  width: 100,
                  height: 100,
                  borderRadius: 120 / 2,
                  alignItems: 'center',
                  justifyContent: 'center',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}>
                <MaterialCommunityIcons
                  name={isFlash ? 'flash' : 'flash-off'}
                  size={40}
                  color={COLORS.white}
                />
              </TouchableOpacity>
            }
          />
        </Animatable.View>
      )}
    </View>
  );
};

export default NoonReciveScanner;

const styles = StyleSheet.create({
  cardView: {
    width: SIZES.width - 32,
    height: SIZES.height - 350,
    alignSelf: 'center',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 10,
    padding: 25,
    marginLeft: 5,
    marginRight: 5,
    marginTop: '10%',
    backgroundColor: COLORS.secondary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  scanCardView: {
    width: '90%',
    minHeight: SIZES.height / 2,
    alignSelf: 'center',

    borderRadius: 10,
    padding: 25,

    backgroundColor: COLORS.secondary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginBottom: 40,
  },
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonScan: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: COLORS.white,
    paddingTop: 5,
    paddingRight: 25,
    paddingBottom: 5,
    paddingLeft: 25,
    marginTop: 20,
  },

  descText: {
    padding: 16,
    textAlign: 'center',
    fontSize: 16,
  },

  centerText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    padding: 32,
    color: 'white',
  },

  bottomContent: {
    width: SIZES.width,
    height: 120,
  },

  buttonTextStyle: {
    color: 'black',
    fontWeight: 'bold',
  },
});
