

import React, { useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, BackHandler, Modal, Alert, ActivityIndicator } from 'react-native';
import { COLORS, FONTS, SIZES, icons } from '../../constants';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment'
import axios from 'axios';
import { Header, IconButton } from '../../components/CartComponent';

import * as Animatable from 'react-native-animatable';
import numbro from 'numbro'
const MyWallet = props => {

  React.useEffect(() => {
    const focusHandler = props.navigation.addListener('focus', () => {
      getuserData()
    });
    return focusHandler;
  }, [props.navigation]);

  const [usertrans, setusertrans] = React.useState(
    {}
  )

  const [modal, setmodal] = React.useState(false)

  async function getuserData() {


    let userdata = await AsyncStorage.getItem("userdata")
    userdata = JSON.parse(userdata)
    let data_send = {
      user_id: userdata.user_id,

    }
    axios.post('https://walletapp2023.000webhostapp.com/Ewallet/select_user_data.php', data_send).then(res => {
      // console.log(res.data)
      if (res.data.status == 'success') {
        setusertrans(res.data.message)
      } else {
        Alert.alert("E-Wallet", res.data.message)

      }

    });

  }



  const handleBackPress = React.useCallback(() => {
    return true
  }, []);

  React.useEffect(() => {
    getuserData()
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);

  }, [handleBackPress]);


  async function logout() {
    setmodal(true)
    await AsyncStorage.setItem("userdata", '')
    await AsyncStorage.setItem("auth", '')
    setTimeout(() => {
      setmodal(false)
      BackHandler.exitApp();
    }, 1500);


  }



  return (
    <View
      style={{
        flex: 1,
        // backgroundColor: COLORS.white,
      }}>
      <Header
        title={'محفظتي'}
        containerStyle={{
          height: 50,
          marginHorizontal: SIZES.padding,
          marginTop: 10,
        }}
       
        leftComponent={<View style={{ width: 40 }} />}

        rightComponent={<View style={{ width: 40 }} />}
      />

      <ScrollView>
        <Animatable.View
          animation="flipInX"
        >

          <LinearGradient
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            colors={['#fff', "#4BF55D"]}
            onPress={() => {

            }}
            style={{
              width: "90%", borderRadius: 20, justifyContent: "center"
              , alignSelf: "center", marginTop: 20,
              shadowColor: "#000",

              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,

              elevation: 3,
              backgroundColor: "#fff",

              marginBottom: 20
              ,
              padding: 10


            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around"
              }}
            >
              <View>
                <Text style={{
                  fontSize: 18, textAlign: "center", color: "#000",
                  fontFamily: FONTS.fontFamily
                }}>
                  المدفوعات
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Icon name='caret-down'
                    color={'#f00'}
                    style={{
                      margin: 2
                    }} />
                  <Text style={{
                    fontSize: 18, textAlign: "center", color: '#f00',
                    fontFamily: FONTS.fontFamily
                  }}>


                    {usertrans.money_spent == null ? (

                      <>
                        {numbro(0).format({
                          thousandSeparated: true,
                          mantissa: 2, // number of decimals displayed
                        })}{' ج.م'}
                      </>
                    ) :
                      <>
                        {numbro(usertrans.money_spent).format({
                          thousandSeparated: true,
                          mantissa: 2, // number of decimals displayed
                        })}{' ج.م'}
                      </>
                    }


                  </Text>

                </View>

              </View>

              <View>
                <Text style={{
                  fontSize: 18, textAlign: "center", color: "#000",
                  fontFamily: FONTS.fontFamily
                }}>
                  اجمالي الاستلام
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Icon name='caret-up'
                    color={'#1FA52D'}
                    style={{
                      margin: 2
                    }} />
                  <Text style={{
                    fontSize: 18, textAlign: "center", color: '#1FA52D',
                    fontFamily: FONTS.fontFamily
                  }}>
                    {usertrans.money_collect == null ? (

                      <>
                        {numbro(0).format({
                          thousandSeparated: true,
                          mantissa: 2, // number of decimals displayed
                        })}{' ج.م'}
                      </>
                    ) :
                      <>
                        {numbro(usertrans.money_collect).format({
                          thousandSeparated: true,
                          mantissa: 2, // number of decimals displayed
                        })}{' ج.م'}
                      </>
                    }

                  </Text>

                </View>
              </View>



            </View>

            <View>
              <Text style={{
                fontSize: 18, textAlign: "center", color: "#000",
                fontFamily: FONTS.fontFamily
              }}>
                الرصيد
              </Text>
              <Text style={{
                fontSize: 18, textAlign: "center", color: '#1FA52D',
                fontFamily: FONTS.fontFamily,
                // textDecorationLine: "underline"
              }}>


                {usertrans.my_balance == null ? (

                  <>
                    {numbro(0).format({
                      thousandSeparated: true,
                      mantissa: 2, // number of decimals displayed
                    })}{' ج.م'}
                  </>
                ) :
                  <>
                    {numbro(usertrans.my_balance).format({
                      thousandSeparated: true,
                      mantissa: 2, // number of decimals displayed
                    })}{' ج.م'}
                  </>
                }


              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around"
              }}
            >


              <View>
                <Text style={{
                  fontSize: 18, textAlign: "center", color: "#000",
                  fontFamily: FONTS.fontFamily
                }}>
                  اجمالي الشحن
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Icon name='caret-up'
                    color={'#1FA52D'}
                    style={{
                      margin: 2
                    }} />
                  <Text style={{
                    fontSize: 18, textAlign: "center", color: '#1FA52D',
                    fontFamily: FONTS.fontFamily
                  }}>
                    {usertrans.money_recharge == null ? (

                      <>
                        {numbro(0).format({
                          thousandSeparated: true,
                          mantissa: 2, // number of decimals displayed
                        })}{' ج.م'}
                      </>
                    ) :
                      <>
                        {numbro(usertrans.money_recharge).format({
                          thousandSeparated: true,
                          mantissa: 2, // number of decimals displayed
                        })}{' ج.م'}
                      </>
                    }

                  </Text>

                </View>
              </View>

              <View>
                <Text style={{
                  fontSize: 18, textAlign: "center", color: "#000",
                  fontFamily: FONTS.fontFamily
                }}>
                  اجمالي السحب
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Icon name='caret-down'
                    color={'#f00'}
                    style={{
                      margin: 2
                    }} />
                  <Text style={{
                    fontSize: 18, textAlign: "center", color: '#f00',
                    fontFamily: FONTS.fontFamily
                  }}>


                    {usertrans.money_withdraw == null ? (

                      <>
                        {numbro(0).format({
                          thousandSeparated: true,
                          mantissa: 2, // number of decimals displayed
                        })}{' ج.م'}
                      </>
                    ) :
                      <>
                        {numbro(usertrans.money_withdraw).format({
                          thousandSeparated: true,
                          mantissa: 2, // number of decimals displayed
                        })}{' ج.م'}
                      </>
                    }


                  </Text>

                </View>

              </View>

            </View>
          </LinearGradient>
        </Animatable.View>





        <Animatable.View
          animation="slideInUp"
        >

          <TouchableOpacity
            onPress={() => {
              // props.navigation.navigate("Qrscan")

              props.navigation.navigate("Pay")

            }}
            style={{
              width: "90%", borderRadius: 20
              , alignSelf: "center", marginTop: 5,
              shadowColor: "#000",

              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,

              elevation: 3,
              backgroundColor: "#fff",

              marginBottom: 20,
              flexDirection: "row",
              padding: 10
              , justifyContent: 'space-around'

            }}
          >
            <Text style={{
              fontSize: 22, textAlign: "center", color: "#000",
              fontFamily: FONTS.fontFamily
            }}>
              دفع
            </Text>
            <Image
              resizeMode='center'
              style={{
                height: 50,
                width: 50
              }}
              source={require("../../assets/icons/operation.png")}
            />


          </TouchableOpacity>
        </Animatable.View>
        <Animatable.View
          animation="slideInUp"
        >
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("Recive")
            }}
            style={{
              width: "90%", borderRadius: 20
              , alignSelf: "center", marginTop: 5,
              shadowColor: "#000",

              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,

              elevation: 3,
              backgroundColor: "#fff",

              marginBottom: 20,
              flexDirection: "row",
              padding: 10
              , justifyContent: 'space-around'


            }}
          >
            <Text style={{
              fontSize: 22, textAlign: "center", color: "#000",
              fontFamily: FONTS.fontFamily
            }}>
              إستلام
            </Text>
            {/* smartphone.png */}

            <Image
              resizeMode='center'
              style={{
                height: 50,
                width: 50,
                marginLeft: -20
              }}
              source={require("../../assets/icons/smartphone.png")}
            />

          </TouchableOpacity>

        </Animatable.View>




        <Animatable.View
          animation="slideInUp"
        >
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("Payways")
            }}
            style={{
              width: "90%", borderRadius: 20
              , alignSelf: "center", marginTop: 5,
              shadowColor: "#000",

              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,

              elevation: 3,
              backgroundColor: "#fff",

              marginBottom: 20,
              flexDirection: "row",
              padding: 10
              , justifyContent: 'space-around'


            }}
          >
            <Text style={{
              fontSize: 22, textAlign: "center", color: "#000",
              fontFamily: FONTS.fontFamily
            }}>
              شحن
            </Text>
            {/* smartphone.png */}

            <Image
              resizeMode='center'
              style={{
                height: 50,
                width: 50,
                marginLeft: -20
              }}
              source={require("../../assets/icons/sale.png")}
            />

          </TouchableOpacity>

        </Animatable.View>



        <Animatable.View
          animation="slideInUp"
        >
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("Recived_wayes")
            }}
            style={{
              width: "90%", borderRadius: 20
              , alignSelf: "center", marginTop: 5,
              shadowColor: "#000",

              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,

              elevation: 3,
              backgroundColor: "#fff",

              marginBottom: 20,
              flexDirection: "row",
              padding: 10
              , justifyContent: 'space-around'


            }}
          >
            <Text style={{
              fontSize: 22, textAlign: "center", color: "#000",
              fontFamily: FONTS.fontFamily
            }}>
              سحب
            </Text>
            {/* smartphone.png */}

            <Image
              resizeMode='center'
              style={{
                height: 50,
                width: 50,
                marginLeft: -20
              }}
              source={require("../../assets/icons/sale.png")}
            />

          </TouchableOpacity>

        </Animatable.View>


        <Animatable.View
          animation="slideInUp"
        >

          <TouchableOpacity
            onPress={() => {
              // props.navigation.navigate("Qrscan")

              props.navigation.navigate("history")


            }}
            style={{
              width: "90%", borderRadius: 20
              , alignSelf: "center", marginTop: 5,
              shadowColor: "#000",

              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,

              elevation: 3,
              backgroundColor: "#fff",

              marginBottom: 20,
              flexDirection: "row",
              padding: 10
              , justifyContent: 'space-around'

            }}
          >
            <Text style={{
              fontSize: 22, textAlign: "center", color: "#000",
              fontFamily: FONTS.fontFamily
            }}>
              السجل
            </Text>
            <Image
              resizeMode='center'
              style={{
                height: 50,
                width: 50
              }}
              source={require("../../assets/icons/transaction-history.png")}
            />


          </TouchableOpacity>
        </Animatable.View>







        <Animatable.View
          animation="slideInUp"
        >
          <TouchableOpacity
            onPress={() => {
              logout()
            }}
            style={{
              width: "90%", borderRadius: 20
              , alignSelf: "center", marginTop: 5,
              shadowColor: "#000",

              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,

              elevation: 3,
              backgroundColor: "#f2b3b3",

              marginBottom: 20,
              flexDirection: "row",
              // padding: 10,
              justifyContent: 'space-around',
              alignContent: 'center'

            }}
          >
            <Text style={{
              fontSize: 20, textAlign: "center", color: "#000",
              fontFamily: FONTS.fontFamily
            }}>
              تسجيل الخروج
            </Text>
            {/* smartphone.png */}

            <Image
              resizeMode='center'
              style={{
                height: 30,
                width: 30,
                marginLeft: -20,
                alignContent: "center",
                justifyContent: "center",
                alignSelf: "center"

              }}
              source={require("../../assets/icons/logout.png")}
            />

          </TouchableOpacity>

        </Animatable.View>


        <Modal
          visible={modal}
          onRequestClose={() => {
            setmodalrecive(false)
          }}
          animationType={'slide'}
          transparent={true}>
          <View
            style={{
              flex: 1, alignItems: 'center',
              justifyContent: 'center'
              , backgroundColor: 'rgba(0,0,0,.6)'
            }}>
            <View
              style={{
                width: '60%',
                padding: 20,
                backgroundColor: '#fff',
                elevation: 22,
                borderRadius: 15,

              }}>





              <ActivityIndicator
                size={50}
              />



              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 7,
                }}>

                <Text
                  style={{
                    fontFamily: 'Janna LT Bold',
                    color: '#9F9FA0',
                    fontSize: 20,
                    textAlign: "center"
                  }}>
                  جاري تسجيل الخروج
                </Text>

              </View>
            </View>
          </View>
        </Modal>





      </ScrollView>

    </View>
  );
};

export default MyWallet;
