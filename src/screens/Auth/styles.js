import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { COLORS, FONTS } from '../../constants';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: 'white',
    flex: 1,
  },
  pageWelcomeLable: {
    fontSize: RFValue(22),
    fontFamily: FONTS.fontFamily,
    color: COLORS.black,
    marginVertical: 20,
    marginLeft: 10,
  },
  phoneNumberLable: {
    fontSize: RFValue(14),
    fontFamily: FONTS.fontFamily,
    color: COLORS.black,
    marginTop: heightPercentageToDP(5),
    marginLeft: 10,
  },
  NatId: {
    fontSize: RFValue(14),
    fontFamily: FONTS.fontFamily,
    color: COLORS.black,
    marginTop: heightPercentageToDP(2),
    marginLeft: 10,
  },
  subTitle: {
    fontSize: RFValue(14),
    fontFamily: FONTS.fontFamily,
    color: 'gray',
    marginTop: heightPercentageToDP(2),
    marginLeft: 10,
  },
  WelcomeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // marginLeft: 10
  },
  appLogo: {
    width: widthPercentageToDP(50),
    height: heightPercentageToDP(30),
    marginRight: 40
  },
  welcomeText: {
    fontSize: RFValue(18),
    fontFamily: FONTS.fontFamily,
    // fontSize:FONTS.body2
  },
  erroMessage: {
    fontSize: RFValue(14),
    fontFamily: FONTS.fontFamily,
    marginLeft: 10,
    alignSelf: 'center',
    color: 'red',
    marginTop: 4,
  },
  radioButtonContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-around',
  },
  maleRadioConatiner: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: 10,
  },
});

export default styles;
