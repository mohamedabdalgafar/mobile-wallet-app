import React from 'react';
import { View, Text, Image } from 'react-native';
import { COLORS, icons, SIZES } from '../../../constants';
import { AppButton, PasswordInput } from '../../../components';

import styles from '../styles';
import { Header, IconButton } from '../../../components/CartComponent';

import { heightPercentageToDP } from 'react-native-responsive-screen';
import { POST } from './../../../Helpers/ApiHelper';
// import FcmToken from './../../../Services/GetFcmToken';
import { useDispatch, useSelector } from 'react-redux';
import {
  chnageAlertModal,
  updateUserData,
} from '../../../Redux/actions/UserActions';
import { StackActions } from '@react-navigation/native';
const TypePassword = props => {
  const dispatch = useDispatch();
  const { phonenumber } = props.route.params;
  const [password, setPassword] = React.useState('');
  const [passErr, setPassErr] = React.useState('');
  const [securePass, setsecurePass] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const { connected } = useSelector(state => state.UserDataReducer);

  const checkPass = async () => {
    if (password.trim().length == 0) {
      setPassErr('من فضلك أدخل كلمة مرور صحيحة');
      return;
    }
    props.navigation.navigate("MyWallet")
    // if (connected) {
    //   // let fcm = await FcmToken();

    //   let data_to_send = {
    //     user_first_phone: phonenumber,
    //     user_password: password,
    //     // user_token: fcm,
    //   };

    //   setLoading(true);
    //   let res = await POST('auth/check_password.php', data_to_send);

    //   //  the res will be user data object

    //   if (res != null) {
    //     dispatch(await updateUserData(res));
    //     // let modalData = {
    //     //   show: true,
    //     //   message: 'تم تسجيل الدخول✅',
    //     //   res: 'succ',
    //     // };
    //     // dispatch(chnageAlertModal(modalData));
    //   }
    //   setLoading(false);
    // }

  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <Header
        title={'بالفعل لديك حساب'}
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
        <Text style={styles.pageWelcomeLable}>بالفعل لديك حساب</Text>

        <Text style={styles.subTitle}>أدخل كلمة المرور</Text>

        <Text style={styles.phoneNumberLable}>كلمه المرور</Text>

        <PasswordInput
          value={password}
          onChangeText={value => {
            setPassErr('');
            setPassword(value);
          }}
          placeholder={'من فضلك أدخل كلمة المرور'}
          securePass={securePass}
          onSecurePassChange={() => setsecurePass(!securePass)}
        />
        <Text style={styles.erroMessage}>{passErr}</Text>

        <AppButton
          loading={loading}
          lable={'تسجيل الدخول'}
          onPress={() => checkPass()}
        />
        <Text
          onPress={() => {
            props.navigation.navigate('ConfirmPhoneNumber', {
              phonenumber,
              comeFrom: 'TypePassword',
            });
          }}
          style={[
            styles.subTitle,
            { alignSelf: 'center', marginTop: heightPercentageToDP(4) },
          ]}>
          هل نسيت كلمة المرور؟
        </Text>
      </View>
    </View>
  );
};

export default TypePassword;
