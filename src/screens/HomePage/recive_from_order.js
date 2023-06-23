

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

import store from '../../Redux/store';
import { chnageAlertModal } from '../../Redux/actions';
if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}
const recive_from_order = props => {
    const toggleSwitchadd = () => setIsEnabled(previousState => !previousState);




    const [title, settitle] = React.useState('');

    const [order_code, setorder_code] = React.useState('');


    const [load, setload] = React.useState(false);

    const [sharemodel, setsharemodel] = React.useState('');


    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'دفع مبلغ ' + order_code + " ج.م " + "بواسطة رقم اوردر " + orderid + " تطبيق E-Wallet ",
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
            console.log(result)
            setsharemodel(false)

        } catch (error) {
            Alert.alert(error.message);
        }
    };
    const [orderid, setorderid] = React.useState('');

    const [money, setmoney] = React.useState('');
    const [username, setusername] = React.useState('');

    const [titleorder, settitleorder] = React.useState('');


    async function createorder() {

        setload(true)
        let userdata = await AsyncStorage.getItem("userdata")
        userdata = JSON.parse(userdata)
        let data_send = {
            user_id: userdata.user_id,
            order_code: order_code

        }
        axios.post('https://walletapp2023.000webhostapp.com/Ewallet/get_order_details.php', data_send).then(res => {
            console.log(res.data)

            if (res.data.status == 'success') {
                setmoney(res.data.message.order_money_value)
                setusername(res.data.message.user_full_name)
                settitleorder(res.data.message.order_details)
                setmodalVisable(true)
                // console.log(res.data.message)

            } else {
                let modalData = { show: true, message: res.data.message, res: 'error' };
                store.dispatch(chnageAlertModal(modalData));

            }
            setload(false)

        });

    }

    const [modalVisable, setmodalVisable] = React.useState(false);

    const [loadconfirm, setloadconfirm] = React.useState(false);
    async function confirmpay() {

        setloadconfirm(true)
        let userdata = await AsyncStorage.getItem("userdata")
        userdata = JSON.parse(userdata)
        let data_send = {
            user_id: userdata.user_id,
            order_code: order_code

        }
        axios.post('https://walletapp2023.000webhostapp.com/Ewallet/pay_order.php', data_send).then(res => {
            console.log(res.data)

            if (res.data.status == 'success') {
                setmoney('')
                setusername('')
                settitleorder('')
                setmodalVisable(false)
                
                let modalData = { show: true, message: res.data.message, res: 'succ' };
                store.dispatch(chnageAlertModal(modalData));
                setTimeout(() => {
                       props.navigation.goBack();
                }, 1000);
            } else {
                let modalData = { show: true, message: res.data.message, res: 'error' };
                store.dispatch(chnageAlertModal(modalData));

            }
            setloadconfirm(false)

        });

    }



    return (
        <View
            style={{
                flex: 1
            }}
        >
            <Header
                title={'دفع اوردر'}
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
                    placeholder=" ادخل رقم الدفع
                    
                    "
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
                    value={order_code}

                    onChangeText={(value) => {
                        setorder_code(value)
                    }}
                />

            </View>

            <TouchableOpacity
                onPress={() => {
                    // onShare()
                    if (order_code.length != 0) {
                        createorder()

                    } else {
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
                visible={modalVisable}
                animationType="slide"
                transparent={true}
            >
                <>




                    <View
                        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                        <View
                            style={{
                                width: '90%',
                                padding: 10,
                                backgroundColor: '#fff',
                                elevation: 22,
                                borderRadius: 15,
                            }}>
                            <ScrollView>

                                <View
                                    style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: 10,
                                    }}>
                                    <Text
                                        style={{
                                            fontFamily: 'Janna LT Bold',
                                            color: '#00cd7b',
                                            fontSize: 20,
                                            textAlign: "center"
                                        }}>
                                        {titleorder}
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

                                    style={{ paddingHorizontal: 20, paddingVertical: 12 }}>
                                    <Text
                                        style={{
                                            fontFamily: 'Janna LT Bold',
                                            fontSize: 17,
                                            textAlign: 'center',
                                            color: "#000",

                                        }}>
                                        {' هل تريد دفع مبلغ ' + money +
                                            " ج.م من حسابك واضافتها في حساب  " +
                                            username}
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
                                            // setmodalVisable(false)
                                            confirmpay()



                                        }}>
                                        {loadconfirm ?
                                            (
                                                <ActivityIndicator
                                                    color={"#00cd7b"}
                                                    size={22}
                                                />
                                            ) : (
                                                <Text
                                                    style={{
                                                        fontFamily: 'Janna LT Bold',
                                                        color: '#00cd7b',
                                                        fontSize: 20,
                                                    }}>
                                                    تأكيد
                                                </Text>
                                            )}


                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{
                                            alignItems: 'center', justifyContent: 'center'
                                        }}
                                        onPress={() => {
                                            setmodalVisable(false)

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
                            </ScrollView>

                        </View>



                    </View>


                </>

            </Modal>
        </View>
    );
};


export default recive_from_order;



