import React from 'react';
import {View, Text, Image} from 'react-native';
import {COLORS, AppData, icons, SIZES} from '../../../constants';
import {AppButton, PasswordInput} from '../../../components';
import {Header, IconButton} from '../../../components/CartComponent';
import styles from '../styles';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {POST} from './../../../Helpers/ApiHelper';
import {useDispatch} from 'react-redux';
import {chnageAlertModal} from '../../../Redux/actions';
import {useSelector} from 'react-redux';
const ConfirmPassword = props => {
  const dispatch = useDispatch();
  const {connected} = useSelector(state => state.UserDataReducer);
  const {phonenumber} = props.route.params;
  const [password, setPassword] = React.useState('');
  const [passwordErr, setPasswordErr] = React.useState('');
  const [securePass, setsecurePass] = React.useState(true);

  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [confirmPasswordErr, setConfirmPasswordErr] = React.useState('');
  const [secureConfirmPass, setsecureConfirmPass] = React.useState(true);

  const [loading, seLoading] = React.useState(false);
  const checkValues = async () => {
    if (!AppData.passRegExp.test(password)) {
      setPasswordErr('يجب أن تكون كلمة المرور أكثر من 6 أحرف وأرقام');
      return;
    }

    if (confirmPassword.trim() != password.trim()) {
      setConfirmPasswordErr('كلمة المرور غير متطابقة');
      return;
    }

    if (connected) {
      let data_to_send = {
        user_first_phone: phonenumber,
        user_password: password,
      };

      seLoading(true);
      let res = await POST('auth/update_user_password.php', data_to_send);
      seLoading(false);

      if (res) {
        dispatch(chnageAlertModal({message: res, res: 'succ', show: true}));
        props.navigation.navigation('TypePassword', {phonenumber});
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <Header
        title={'تغيير كلمة المرور'}
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
              transform: [{rotate: '180deg'}],
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
        rightComponent={<View style={{width: 40}} />}
      />

      <View style={styles.container}>
        <Text style={styles.pageWelcomeLable}>تغيير كلمة المرور</Text>

        <Text style={styles.subTitle}>من فضلك أدخل كلمة المرور الجديدة</Text>

        <Text style={[styles.phoneNumberLable, {marginLeft: 10}]}>
          كلمة المرور الجديدة
        </Text>

        <PasswordInput
          value={password}
          onChangeText={value => {
            setPassword(value);
            setPasswordErr('');
          }}
          placeholder={'من فضلك كلمة المرور الجديدة'}
          securePass={securePass}
          onSecurePassChange={() => setsecurePass(!securePass)}
        />

        <Text style={styles.erroMessage}>{passwordErr}</Text>

        <Text style={[styles.phoneNumberLable, {marginLeft: 10, marginTop: 0}]}>
          تأكيد كلمة المرور الجديدة
        </Text>

        <PasswordInput
          value={confirmPassword}
          onChangeText={value => {
            setConfirmPassword(value);
            setConfirmPasswordErr('');
          }}
          placeholder={'تأكيد كلمة المرور الجديدة'}
          securePass={secureConfirmPass}
          onSecurePassChange={() => setsecureConfirmPass(!secureConfirmPass)}
        />

        <Text style={styles.erroMessage}>{confirmPasswordErr}</Text>

        <AppButton
          lable={'تأكيد'}
          style={{marginTop: heightPercentageToDP(5)}}
          onPress={() => checkValues()}
          loading={loading}
        />
      </View>
    </View>
  );
};

export default ConfirmPassword;
