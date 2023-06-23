import React from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import { COLORS, AppData, icons, SIZES } from '../../../constants';
import { AppButton, PhoneNumberInput } from '../../../components';
import { Header, IconButton } from '../../../components/CartComponent';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles';
import { POST } from './../../../Helpers/ApiHelper';
import { useSelector } from 'react-redux';
const PhoneNumberEntry = props => {
  const [phonenumber, setPhoneNumber] = React.useState('');
  const [phonenumberErr, setphonenumberErr] = React.useState('');
  const { connected } = useSelector(state => state.UserDataReducer);
  const [loading, setLoading] = React.useState(false);

  const checkPhoneNumber = async () => {
    if (!phonenumber.match(AppData.phoneRegExp)) {
      setphonenumberErr('من فضلك أدخل رقم هاتف صحيح');
      return;
    }
    async function savedata(res) {
      await AsyncStorage.setItem("userdata", JSON.stringify(res))
    }
    if (connected) {
      setLoading(true);
      let data = { user_first_phone: phonenumber };
      let res = await POST('auth/user_sign_phone.php', data);
      console.log(res)
      setLoading(false);
      if (res != 'not_found') {
        savedata(res)
      }
      props.navigation.navigate('ConfirmPhoneNumber', {
        phonenumber,
        comeFrom: 'phoneNumber',
        respnseMessage: res,
      });
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <Header
        title={'تسجيل الدخول من خلال رقم الهاتف'}
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
        <Text style={styles.pageWelcomeLable}>
          مرحبا بك فى {AppData.appName}
        </Text>

        <Text style={styles.subTitle}>التسجيل من خلال رقم الهاتف</Text>

        <Text style={styles.phoneNumberLable}>رقم الهاتف</Text>

        <PhoneNumberInput
          value={phonenumber}
          onChangeText={value => {
            setPhoneNumber(value);
            setphonenumberErr('');
          }}
          placeholder={'مثال : 0101111111'}
          type="phone-pad"
        />
        <Text style={styles.erroMessage}>{phonenumberErr}</Text>

        <AppButton
          lable={'استمرار'}
          onPress={() => checkPhoneNumber()}
          loading={loading}
        />
      </View>
    </View>
  );
};

export default PhoneNumberEntry;
