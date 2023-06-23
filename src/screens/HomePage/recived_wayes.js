

import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView ,BackHandler} from 'react-native';
import { COLORS, FONTS, SIZES, icons } from '../../constants';

import { Header, IconButton } from '../../components/CartComponent';

import * as Animatable from 'react-native-animatable';

const Recive = props => {


    const handleBackPress = React.useCallback(() => {
        // do some action and return true or if you do not
        // want the user to go back, return false instead
        props.navigation.goBack()
    //    return true
      }, []);
    
      React.useEffect(() => {
     
        BackHandler.addEventListener('hardwareBackPress', handleBackPress);
        return () =>
    
          BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    
    
    
      }, [handleBackPress]);
    
        
       
    return (
        <View
            style={{
                flex: 1,
                // backgroundColor: COLORS.white,
            }}>
            <Header
                title={'إستلام'}
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

            <ScrollView>

                {/* <Animatable.View
                    animation="slideInLeft"
                >


                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.navigate("QRCodePage", {
                                type: "all"
                            })

                        }}
                        style={{
                            height: 70, width: "90%", borderRadius: 20, justifyContent: "center"
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

                            marginBottom: 20


                        }}
                    >
                        <Text style={{
                            fontSize: 22, textAlign: "center", color: "#000",
                            fontFamily: FONTS.fontFamily
                        }}>
                            إستلام عام
                        </Text>

                    </TouchableOpacity>
                </Animatable.View>
                <Animatable.View
                    animation="slideInRight"
                >
                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.navigate("QRCodePage", {
                                type: "custom"
                            })

                        }}
                        style={{
                            height: 70, width: "90%", borderRadius: 20, justifyContent: "center"
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

                            marginBottom: 20


                        }}
                    >
                        <Text style={{
                            fontSize: 22, textAlign: "center", color: "#000",
                            fontFamily: FONTS.fontFamily
                        }}>
                            إستلام مبلغ معين
                        </Text>

                    </TouchableOpacity>


                </Animatable.View> */}

                <Animatable.View
                    animation="slideInRight"
                >
                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.navigate("Qrsacntorecive")

                        }}
                        style={{
                            height: 70, width: "90%", borderRadius: 20, justifyContent: "center"
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

                            marginBottom: 20


                        }}
                    >
                        <Text style={{
                            fontSize: 22, textAlign: "center", color: "#000",
                            fontFamily: FONTS.fontFamily
                        }}>
                            مسح QR code للسحب
                        </Text>

                    </TouchableOpacity>

                    <Animatable.View
                    animation="slideInRight"
                >
                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.navigate("Paymentways")

                        }}
                        style={{
                            height: 70, width: "90%", borderRadius: 20, justifyContent: "center"
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

                            marginBottom: 20


                        }}
                    >
                        <Text style={{
                            fontSize: 22, textAlign: "center", color: "#000",
                            fontFamily: FONTS.fontFamily
                        }}>
                            إنشاء امر دفع
                        </Text>

                    </TouchableOpacity>


                </Animatable.View>


                </Animatable.View>
            </ScrollView>

        </View>
    );
};

export default Recive;
