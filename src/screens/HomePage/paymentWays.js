


import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, BackHandler, Modal, Alert } from 'react-native';
import { COLORS, FONTS, SIZES, icons } from '../../constants';

import { Header, IconButton } from '../../components/CartComponent';

import * as Animatable from 'react-native-animatable';

const Paymentways = props => {


    const [page, setPage] = React.useState("");

    const [modalrecive, setmodalrecive] = React.useState(false);




    return (
        <View
            style={{
                flex: 1,
                // backgroundColor: COLORS.white,
            }}>
            <Header
                title={'اوامر الدفع'}
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

                <Animatable.View
                    animation="slideInLeft"
                >


                    {/* <TouchableOpacity
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

                    </TouchableOpacity> */}
                </Animatable.View>
                <Animatable.View
                    animation="slideInRight"
                >
                    <TouchableOpacity
                        onPress={() => {

                            setPage('1')
                            setmodalrecive(true)

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
                            إستلام مبلغ من خلال QR
                        </Text>

                    </TouchableOpacity>


                </Animatable.View>
                <Animatable.View
                    animation="slideInRight"
                >
                    <TouchableOpacity
                        onPress={() => {
                            // Alert.alert("wallet", "work then")
                            setPage('2')
                            setmodalrecive(true)

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
                            إستلام مبلغ من خلال اوردر
                        </Text>

                    </TouchableOpacity>


                </Animatable.View>
              
            </ScrollView>
            <Modal
                visible={modalrecive}
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
                            width: '90%',
                            padding: 10,
                            backgroundColor: '#fff',
                            elevation: 22,
                            borderRadius: 15,
                        }}>
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: 10,
                            }}>
                            <Text
                                style={{
                                    fontFamily: 'Janna LT Bold',
                                    color: "#000",
                                    fontSize: 22,
                                }}>
                                {'إستلام من خلال..'}
                            </Text>
                        </View>
                        <View
                            style={{
                                alignSelf: 'center',
                                width: '90%',
                                borderWidth: 1.5,
                                borderColor: '#ddd',
                            }}
                        />


                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-around"
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    if (page == 1) {
                                        props.navigation.navigate("history_qr", {
                                            type: "custom"
                                        })
                                    } else if (page == 2) {
                                         
                                        props.navigation.navigate("history_ordery", {
                                            type: "custom"
                                        })
                                    }
                                    else if (page == 3) {
                                        Alert.alert("page 3")

                                    }
                                    setmodalrecive(false)


                                }}
                                animation="fadeIn"
                                delay={50}
                                useNativeDriver
                                style={{

                                    width: '40%',
                                    borderRadius: SIZES.radius,
                                    // alignSelf: 'center',
                                    paddingLeft: SIZES.padding,
                                    paddingRight: SIZES.padding,
                                    // padding: 4,



                                    backgroundColor: COLORS.white,
                                    marginVertical: SIZES.base,
                                    shadowColor: '#000',
                                    shadowOffset: {
                                        width: 0,
                                        height: 2,
                                    },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 3.84,

                                    elevation: 5,
                                    marginTop: 10,
                                    justifyContent: 'center',
                                    alignItems: "center"
                                    // marginLeft:10
                                }}
                            >

                                <Text style={{
                                    color: "#9F9FA0",
                                    fontSize: 18, fontFamily: FONTS.fontFamily,
                                    textAlign: "center"
                                }}>
                                    {'السجل'}
                                </Text>



                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    if (page == 1) {
                                        props.navigation.navigate("QRCodePage", {
                                            type: "custom"
                                        })
                                    } else if (page == 2) {
                                        props.navigation.navigate("NewOrder", {
                                            type: "custom"
                                        })
                                        
                                    }
                                    else if (page == 3) {
                                        Alert.alert("page 3")

                                    }
                                    setmodalrecive(false)

                                }}
                                animation="fadeIn"
                                delay={50}
                                useNativeDriver
                                style={{

                                    width: '40%',
                                    borderRadius: SIZES.radius,
                                    // alignSelf: 'center',
                                    paddingLeft: SIZES.padding,
                                    paddingRight: SIZES.padding,
                                    // padding: 4,



                                    backgroundColor: COLORS.white,
                                    marginVertical: SIZES.base,
                                    shadowColor: '#000',
                                    shadowOffset: {
                                        width: 0,
                                        height: 2,
                                    },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 3.84,

                                    elevation: 5,
                                    marginTop: 10,
                                    justifyContent: 'center',
                                    alignItems: "center"
                                    // marginLeft:10
                                }}
                            >

                                <Text style={{
                                    color: "#9F9FA0",
                                    fontSize: 18,
                                    fontFamily: FONTS.fontFamily,
                                    textAlign: "center"
                                }}>
                                    {'إنشاء جديد'}
                                </Text>



                            </TouchableOpacity>
                        </View>


                        <View
                            style={{
                                alignSelf: 'center',
                                width: '90%',
                                borderWidth: 1.5,
                                borderColor: '#ddd',
                            }}
                        />

                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: 7,
                            }}>
                            <TouchableOpacity
                                style={{ alignItems: 'center', justifyContent: 'center' }}
                                onPress={() => {
                                    setmodalrecive(false)

                                }}>
                                <Text
                                    style={{
                                        fontFamily: 'Janna LT Bold',
                                        color: '#f00',
                                        fontSize: 20,
                                    }}>
                                    إلغاء
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default Paymentways;
