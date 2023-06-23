

import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    PermissionsAndroid,
    Animated,
    Platform,
    TextInput, Switch,
    ScrollView, Alert,
    TouchableOpacity, UIManager, LayoutAnimation, Share,
    FlatList, Image, Dimensions, StatusBar, PanResponder, Modal, ActivityIndicator
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import QRCode from 'react-native-qrcode-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Header, IconButton } from '../../components/CartComponent';

import { COLORS, images, icons, SIZES, FONTS, constants, Icons } from '../../constants';
import axios from "axios";


if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}
const NewOrder = props => {
    const toggleSwitchadd = () => setIsEnabled(previousState => !previousState);




    const [title, settitle] = React.useState('');

    const [moneyVal, setmoneyVal] = React.useState('');


    const [load, setload] = React.useState(false);

    const [sharemodel, setsharemodel] = React.useState('');


    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'دفع مبلغ ' + moneyVal + " ج.م " + "بواسطة رقم اوردر " + orderid + " تطبيق E-Wallet ",
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
            // console.log(result)
            setsharemodel(false)
            setmoneyVal('')
            settitle('')

        } catch (error) {
            Alert.alert(error.message);
        }
    };
    const [orderid, setorderid] = React.useState('');

    async function createorder() {

        setload(true)
        let userdata = await AsyncStorage.getItem("userdata")
        userdata = JSON.parse(userdata)
        let data_send = {
            user_id: userdata.user_id,
            order_details: title,
            money: moneyVal

        }
        axios.post('https://walletapp2023.000webhostapp.com/Ewallet/create_order.php', data_send).then(res => {
            // console.log(data_send)

            if (res.data.status == 'success') {
                // console.log(res.data.message)
                setorderid(res.data.message)
                setsharemodel(true)
               
            } else {
                Alert.alert("E-Wallet", res.data.message)

            }
            setload(false)

        });

    }



    return (
        <View
            style={{
                flex: 1
            }}
        >
            <Header
                title={'إنشاء اوردر'}
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





            <View
                style={{
                    marginTop: 30
                }}
            >


                <TextInput
                    autoCapitalize="none"
                    placeholder=" اسم اوردر الدفع"
                    placeholderTextColor={"#ddd"}
                    keyboardType="email-address"

                    style={{
                        width: '80%',
                        paddingRight: 15,
                        backgroundColor: '#FFF',
                        marginLeft: 3,

                        textAlign: 'right',
                        fontFamily: FONTS.fontFamily,
                        fontSize: 17,
                        color: "#000",
                        borderRadius: 10,
                        borderWidth: 2,
                        alignSelf: 'center',
                        marginBottom: 10,
                        borderColor: "#ddd"
                    }}
                    value={title}

                    onChangeText={(value) => {
                        settitle(value)
                    }}
                />

                <TextInput
                    autoCapitalize="none"
                    placeholder=" ادخل المبلغ المطلوب دفعه"
                    placeholderTextColor={"#ddd"}
                    keyboardType="email-address"

                    style={{
                        width: '80%',
                        paddingRight: 15,
                        backgroundColor: '#FFF',
                        marginLeft: 3,

                        textAlign: 'right',
                        fontFamily: FONTS.fontFamily,
                        fontSize: 17,
                        color: "#000",
                        borderRadius: 10,
                        borderWidth: 2,
                        alignSelf: 'center',
                        marginBottom: 10,
                        borderColor: "#ddd"
                    }}
                    value={moneyVal}

                    onChangeText={(value) => {
                        setmoneyVal(value)
                    }}
                />

            </View>

            <TouchableOpacity
                onPress={() => {
                    // onShare()
                    if(title.length != 0 && moneyVal.length != 0 ){
                        createorder()

                    }else{
                Alert.alert("E-Wallet", "invalid data")

                    }
                }}
                style={{
                    width: '90%',
                    height: 45,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 5,
                    backgroundColor: '#4BF55D',
                    borderWidth: .5,
                    borderColor: "#ddd",
                    marginTop: 20,
                    alignSelf: "center"

                }}>
                {load ? (
                    <ActivityIndicator
                        size={30}
                        color='#fff'

                    />
                ) : (
                    <Text
                        style={{
                            fontSize: 20,
                            color: '#fff',
                            fontFamily: 'Janna LT Bold',

                        }}>
                        إنشاء
                    </Text>
                )}


            </TouchableOpacity>


            <Modal
                visible={sharemodel}
                onRequestClose={() => {
                    setsharemodel(false)
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
                                {'مشاركة'}
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


                            }}
                        >

                            <Text style={{
                                color: "#9F9FA0",
                                fontSize: 18,
                                fontFamily: FONTS.fontFamily,
                                textAlign: "center"
                            }}>
                                {'دفع مبلغ ' + moneyVal + " ج.م " + "بواسطة رقم اوردر " + orderid + " تطبيق E-Wallet "}

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
                                alignItems: 'center',
                                justifyContent: "space-around",
                                marginTop: 7,
                                flexDirection: "row"
                            }}>
                            <TouchableOpacity
                                style={{
                                    alignItems: 'center', justifyContent: 'center'
                                }}
                                onPress={() => {
                                    onShare()
                                }}>
                                <Text
                                    style={{
                                        fontFamily: 'Janna LT Bold',
                                        color: '#00cd7b',
                                        fontSize: 20,
                                    }}>
                                    مشاركة
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    alignItems: 'center', justifyContent: 'center'
                                }}
                                onPress={() => {
                                    setsharemodel(false)

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


export default NewOrder;



