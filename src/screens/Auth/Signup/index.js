import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { COLORS, AppData, icons, SIZES } from '../../../constants';
import { AppButton, PhoneNumberInput, PasswordInput } from '../../../components';
import { Header, IconButton } from '../../../components/CartComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from '../styles';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { RadioButton } from 'react-native-paper';
// import FcmToken from './../../../Services/GetFcmToken';
import { POST } from './../../../Helpers/ApiHelper';
import { useDispatch, useSelector } from 'react-redux';
import {
  chnageAlertModal,
  updateUserData,
} from '../../../Redux/actions/UserActions';
const SignUP = props => {
  const dispatch = useDispatch();
  const { connected } = useSelector(state => state.UserDataReducer);

  const [password, setPassword] = React.useState('');
  const [passwordErr, setPasswordErr] = React.useState('');

  const [securePass, setsecurePass] = React.useState(true);

  const [name, setName] = React.useState('');
  const [natId, setnatid] = React.useState('');

  const [nameErr, setNameErr] = React.useState('');
  const [natIdErr, setnatIdErr] = React.useState('');


  const [firstPhone, setFirstPhone] = React.useState(
    props.route.params?.phonenumber,
  );
  const [firstPhoneErr, setFirstPhoneErr] = React.useState('');

  const [secondPhone, setSecondPhone] = React.useState('');
  const [secondPhoneErr, setSecondPhoneErr] = React.useState('');

  const [gender, setGender] = React.useState('Male');

  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [confirmPasswordErr, setConfirmPasswordErr] = React.useState('');

  const [secureConfirmPass, setsecureConfirmPass] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const checkValues = () => {
    if (name.trim().length == '' || name.trim().length < 4 || name * 0 == 0) {
      setNameErr('من فضلك أدخل إسم صحيح');
      return;
    }
    if (natId.trim().length == '' || natId.trim().length != 14 || natId * 0 != 0) {
      setnatIdErr('من فضلك أدخل الرقم القومي صحيح');
      return;
    }




    if (!firstPhone.match(AppData.phoneRegExp)) {
      setFirstPhoneErr('من فضلك أدخل  رقم هاتف صحيح');
      return;
    }


    if (connected) sendRequest();
  };

  const sendRequest = async () => {
 

    let data_to_send = {
      user_name: name,
      user_national_id: natId,
      user_first_phone: firstPhone,
      // user_fcm_token: fcm,
    };

    setLoading(true);
    let res = await POST('auth/contenie_sign.php', data_to_send);
 
    if (res * 0 == 0) {
      setName('');
      setPassword('');
      setConfirmPassword('');
      setFirstPhone('');
      setSecondPhone('');

      var newObj = {
        user_national_id: data_to_send.user_national_id,
        user_id: res,
        user_name: data_to_send.user_name,
        user_first_phone: data_to_send.user_first_phone,
      };
      dispatch(await updateUserData(newObj));
      // let modalData = {
      //   show: true,
      //   message: 'تم أنشاء الحساب بنجاح ✅',
      //   res: 'succ',
      // };
      // dispatch(chnageAlertModal(modalData));
    }
      await AsyncStorage.setItem("auth" , "log")
     await AsyncStorage.setItem("userdata", JSON.stringify(newObj))
    
    props.navigation.navigate("MyWallet")
    setLoading(false);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <Header
        title={'إنشاء حساب جديد'}
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
        <Text style={styles.pageWelcomeLable}>إنشاء حساب جديد</Text>

        <Text style={styles.subTitle}>من فضلك قم بإدخال البيانات المطلوبة</Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={[styles.phoneNumberLable, { marginLeft: 10 }]}>الإسم</Text>

          <PhoneNumberInput
            value={name}
            onChangeText={value => {
              setName(value);
              setNameErr('');
            }}
            placeholder={'من فضلك قم بإدخال إسمك'}
          />

          <Text style={[styles.NatId, { marginLeft: 10 }]}>الرقم القومي</Text>

          <PhoneNumberInput
            value={natId}
            onChangeText={value => {
              setnatid(value);
              setnatIdErr('');
            }}
            placeholder={'من فضلك قم بإدخال الرقم القومي'}
          />
          <Text style={styles.erroMessage}>{natIdErr}</Text>





          <Text
            style={[styles.phoneNumberLable, { marginLeft: 10, marginTop: 0 }]}>
            رقم الهاتف{' '}
          </Text>

          <PhoneNumberInput
            value={firstPhone}
            onChangeText={value => {
              setFirstPhone(value);
              setFirstPhoneErr('');
            }}
            placeholder={'من فضلك قم بإدخال رقم الهاتف'}
            type="phone-pad"
          />

          <Text style={styles.erroMessage}>{firstPhoneErr}</Text>



          <AppButton
            lable={'تأكيد'}
            style={{

              marginBottom: heightPercentageToDP(5),
            }}
            onPress={() => checkValues()}
            loading={loading}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default SignUP;
