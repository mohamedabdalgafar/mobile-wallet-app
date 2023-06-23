import React, { useRef, useEffect } from 'react';
import { View, Text, Image, Alert } from 'react-native';
import { COLORS, icons, SIZES } from '../../../constants';
import { AppButton, PhoneNumberInput } from '../../../components';
import { Header, IconButton } from '../../../components/CartComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from '../styles';
import { heightPercentageToDP } from 'react-native-responsive-screen';
const ConfirmPhoneNumber = props => {
  const { phonenumber, comeFrom, respnseMessage } = props.route.params;
  const [enteredCode, setEnteredCode] = React.useState('');
  const [countDown, setCountDoun] = React.useState(5);
  const countDownRef = useRef(null);

  useEffect(() => {
    _renderCountDown();
    console.log(respnseMessage)
  }, []);
  async function log() {
    await AsyncStorage.setItem("auth", "log")

  }
  const _renderCountDown = () => {
    let interval = setInterval(() => {
      setCountDoun(prevTimer => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          return prevTimer;
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <Header
        title={'أدخل رقم التحقق'}
        containerStyle={{
          height: 50,
          marginHorizontal: SIZES.padding,
          marginTop: 25,
        }}
        leftComponent={
          <IconButton
            icon={icons.back}
            containerStyle={{
              width: 40,
              transform: [{ rotate: '180deg' }],
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderRadius: SIZES.radius,
              borderColor: COLORS.gray2,
            }}
            iconStyle={{
              width: 20,
              height: 20,
              tintColor: COLORS.gray2,
            }}
            onPress={() => props.navigation.goBack()}
          />
        }
        rightComponent={<View style={{ width: 40 }} />}
      />

      <View style={styles.container}>
        <Text style={styles.pageWelcomeLable}>أدخل كود التحقق</Text>

        <Text style={styles.subTitle}>
          ستصلك رسالة بها كود التحقق
          {'  '}
          <Text style={[styles.subTitle, { color: COLORS.primary }]}>
            +2{phonenumber}
          </Text>
        </Text>

        <Text style={[styles.phoneNumberLable, { marginLeft: 10 }]}>
          كود التحقق{' '}
        </Text>

        <PhoneNumberInput
          value={enteredCode}
          onChangeText={value => setEnteredCode(value)}
          placeholder={'من فضلك أدخل كود التحقق'}
          type="number-pad"
        />

        <AppButton
          lable={'استمرار'}
          style={{ marginTop: heightPercentageToDP(5) }}
          onPress={() => {
            clearInterval(countDownRef.current);
            setCountDoun(0);
            if (comeFrom != 'TypePassword') {
              if (respnseMessage == 'not_found')
                props.navigation.navigate('Signup', { phonenumber });
              else props.navigation.navigate("MyWallet")
              log()
            } else {
              props.navigation.navigate("MyWallet");
              log()
            }
          }}
        />

        {countDown == 0 ? (
          <Text
            onPress={() => alert('send code')}
            style={[
              styles.subTitle,
              {
                alignSelf: 'center',
                marginTop: heightPercentageToDP(4),
              },
            ]}>
            إعاده إرسال الكود
          </Text>
        ) : (
          <Text
            style={[
              styles.subTitle,
              {
                alignSelf: 'center',
                marginTop: heightPercentageToDP(4),
              },
            ]}>
            إنتظر ( {countDown} ) ثوان
          </Text>
        )}
      </View>
    </View>
  );
};

export default ConfirmPhoneNumber;
