import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from '../styles';
import { AppData, images } from '../../../constants';
import { AppButton } from '../../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
const WelcomeScreen = ({ navigation }) => {

  React.useEffect(() => {

    getdata()
  }, []);

  async function getdata() {
    var data = await AsyncStorage.getItem("auth")
 
    setTimeout(() => {
      if (data == "log") {
        navigation.navigate('MyWallet')
      } else {
        navigation.navigate('PhoneNumberEntry')
      }

    }, 1500);

  }




  return (
    <View style={styles.WelcomeContainer}>
      <Image
        style={styles.appLogo}
        source={images.transLogo}
        resizeMode="contain"
      />

      <Text style={styles.welcomeText}> مرحبا بك في E-Wallet</Text>

      {/* <AppButton
        lable={'التسجيل من خلال رقم الهاتف'}
        onPress={() => navigation.navigate('PhoneNumberEntry')}
      /> */}
    </View>
  );
};

export default WelcomeScreen;
