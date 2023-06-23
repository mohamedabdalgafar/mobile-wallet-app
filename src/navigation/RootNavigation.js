import React, { useEffect } from 'react';
// import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {
  ConfirmNewPassword,
  TypePassword,
  ConfirmPhoneNumber,
  Signup,
  WelcomeScreen,
  PhoneNumberEntry,
} from '../screens/Auth';

import {
  MyWallet,
  Recive, QRCodePage,Pay, Payways,recive_from_order, Cardbank,history_qr,QrPagetoPay,history_ordery,NewOrder,
   ConfirmationCard, Qrscan, Ewallet, ConfirmationCode, Massegecharge, history , Paymentways,Qrsacntorecive , 
   Recived_wayes, MY_cards
} from '../screens/HomePage';
import {View, Text, Button, Linking, Alert} from 'react-native';

import { AlertModal, Loader } from '../components';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateUserData } from '../Redux/actions/UserActions';

 const Stack = createStackNavigator();
const animationOptions = {
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  animationEnabled: true,
};

const RootNavigation = () => {
  const dispatch = useDispatch();
  const { connected, alertModal, showLoaderModal, uData } = useSelector(
    state => state.UserDataReducer,
  );

  
 
  
  useEffect(() => {
 

 
 


    const bootstrapAsync = async () => {
      let uData = JSON.parse(await AsyncStorage.getItem('storedUserData'));
      if (uData != null && Object.keys(uData).length > 0) {
        dispatch(await updateUserData(uData));
      }

      setTimeout(() => {
        // SplashScreen.hide();

      }, 300);
    };

    bootstrapAsync();
  }, []);

  return (
    <>
      <NavigationContainer   >
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            ...animationOptions,
            gestureDirection: 'horizontal-inverted',
          }}>

          <>




            {/* <Stack.Screen name="Code" component={Code} /> */}


            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
            <Stack.Screen
              name="PhoneNumberEntry"
              component={PhoneNumberEntry}
            />
             <Stack.Screen
              name="Recived_wayes"
              component={Recived_wayes}
            />
            <Stack.Screen
              name="ConfirmPhoneNumber"
              component={ConfirmPhoneNumber}
            />
            <Stack.Screen
              name="ConfirmNewPassword"
              component={ConfirmNewPassword}
            />
            <Stack.Screen name="TypePassword" component={TypePassword} />
            <Stack.Screen name="QrPagetoPay" component={QrPagetoPay} />

            <Stack.Screen name="Pay" component={Pay} />

            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="MyWallet" component={MyWallet} />
            <Stack.Screen name="MY_cards" component={MY_cards} />

            {/* <Stack.Screen name="MyWallet" component={MyWallet} /> */}
            <Stack.Screen name="Recive" component={Recive} />
            <Stack.Screen name="history_ordery" component={history_ordery} />
            <Stack.Screen name="history" component={history} />

            <Stack.Screen name="QRCodePage" component={QRCodePage} />
            <Stack.Screen name="Payways" component={Payways} />
            <Stack.Screen name="Cardbank" component={Cardbank} />
            <Stack.Screen name="Qrscan" component={Qrscan} />
            <Stack.Screen name="Ewallet" component={Ewallet} />
            <Stack.Screen name="ConfirmationCode" component={ConfirmationCode} />

            <Stack.Screen name="ConfirmationCard" component={ConfirmationCard} />
            <Stack.Screen name="Massegecharge" component={Massegecharge} />

            <Stack.Screen name="Paymentways" component={Paymentways}/>

            <Stack.Screen name="history_qr" component={history_qr}/>

            <Stack.Screen name="Qrsacntorecive" component={Qrsacntorecive}/>

            <Stack.Screen name="NewOrder" component={NewOrder}/>
            <Stack.Screen name="recive_from_order" component={recive_from_order}/>

            
          </>

        </Stack.Navigator>
      </NavigationContainer>
      <Loader visible={showLoaderModal} />
      <AlertModal
        visableAlertModal={alertModal.show}
        message={alertModal.message}
        res={alertModal.res}
      />
    </>
  );
};

export default RootNavigation;
