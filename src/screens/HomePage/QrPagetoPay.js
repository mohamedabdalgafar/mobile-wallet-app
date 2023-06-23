

import React, { useEffect } from 'react';
import {
    View, Text, Image, TouchableOpacity, ScrollView, TextInput, StyleSheet,
    Modal,
    Alert,
} from 'react-native';
import { COLORS, FONTS, SIZES, icons } from '../../constants';
import Lottie from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Header, IconButton } from '../../components/CartComponent';
import QRCode from 'react-native-qrcode-svg';
import { create } from 'react-test-renderer';
import CountDown from 'react-native-countdown-component';
import CheckBox from '@react-native-community/checkbox';

import axios from 'axios';


const QrPagetoPay = props => {
    const [modalVisable, setmodalVisable] = React.useState(false);
    const [inputval, setinputval] = React.useState('');
    const [loading, setloading] = React.useState(false);
    const [qrval, setqrval] = React.useState('1');

    const [qr_pass, setqr_pass] = React.useState('1');

    const [nomoneyselected, setnomoneyselected] = React.useState(false);

    const [toggleCheckBox, setToggleCheckBox] = React.useState(false)

    const [page_type, setpage_type] = React.useState('');
    useEffect(() => {
        setmodalVisable(true)

        setloading(true)



    }, [])

    async function createqr() {
        let data = await AsyncStorage.getItem("userdata")
        data = JSON.parse(data)
        let data_send = {
            user_id: data.user_id,
            monay: inputval,
            type: 'pay',
            one_time: toggleCheckBox ? "1" : "0"


        }
        axios.post('https://walletapp2023.000webhostapp.com/Ewallet/create_qr_code.php', data_send).then(res => {
            // console.log(data_send)
            console.log(res.data)

            if (res.data.status == 'success') {
                setqrval(res.data.message.qr_val + '')
                setqr_pass(res.data.message.qr_pass +'')
            } else if (res.data.status == "error") {
                Alert.alert("E-Wallet", res.data.message)
            } else {
                Alert.alert("E-Wallet", res.data.message)

            }
            setloading(false)
        });

    }








    return (
        <View
            style={{
                flex: 1,

            }}>
            <Header
                title={'دفع'}
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

            {loading ? (
                <View
                    style={{
                        flex: 1, justifyContent: "center", alignItems: "center"
                    }}
                >
                    <Lottie
                        source={require("../../assets/lotties/qrload.json")}
                        autoPlay
                        loop
                        style={{ height: 180, width: '100%' }}
                        resizeMode="contain"
                    />
                </View>

            ) : (
                <>
                    <View
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: -50
                        }}
                    >



                        <QRCode
                            value={qrval}
                            size={200}
                        // logoSize={30}
                        // logoBackgroundColor='transparent'

                        />
                        <Text
                            style={{
                                fontSize: 22, textAlign: "center", color: "#000",
                                fontFamily: FONTS.fontFamily,
                                marginTop: 10
                            }}
                        >
                            Scan Me
                        </Text>
                        <View
                            style={{
                                width: '80%',
                                // justifyContent: 'space-between',
                                alignItems: "center",
                                alignSelf: "center",
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: FONTS.fontFamily,
                                    // textAlign: "center",
                                    color: "#9F9FA0",
                                    fontSize: 15,

                                }}
                            >
                                {" الرقم السري " + qr_pass }


                            </Text>

                        </View>

                        <View
                            style={{
                                width: '80%',
                                // justifyContent: 'space-between',
                                alignItems: "center",
                                alignSelf: "center",
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: FONTS.fontFamily,
                                    // textAlign: "center",
                                    color: "#9F9FA0",
                                    fontSize: 15,

                                }}
                            >
                                {inputval == 0 ? (
                                    "لم يتم تحديد قيمة الكود"
                                ) : (
                                    <>
                                        {" قيمة الكود " + inputval + " ج.م "}
                                    </>

                                )}


                            </Text>

                        </View>
                        {toggleCheckBox ? (
                            <View
                                style={{
                                    width: '80%',
                                    // justifyContent: 'space-between',
                                    alignItems: "center",
                                    alignSelf: "center",
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: FONTS.fontFamily,
                                        // textAlign: "center",
                                        color: "#9F9FA0",
                                        fontSize: 15,

                                    }}
                                >
                                    {"الرمز صالح للاستخدام اكثر من مرة "}


                                </Text>

                            </View>

                        ) :
                            <View
                                style={{
                                    width: '80%',
                                    // justifyContent: 'space-between',
                                    alignItems: "center",
                                    alignSelf: "center",
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: FONTS.fontFamily,
                                        // textAlign: "center",
                                        color: "#9F9FA0",
                                        fontSize: 15,

                                    }}
                                >
                                    {"الرمز صالح لاستخدام مرة واحدة فقط "}


                                </Text>

                            </View>

                        }
                    </View>

                </>

            )}


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
                                            fontSize: 22,
                                        }}>
                                        {'تنوية'}
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
                                    onPress={() => {

                                    }}
                                    style={{ paddingHorizontal: 20, paddingVertical: 12 }}>
                                    <Text
                                        style={{
                                            fontFamily: 'Janna LT Bold',
                                            fontSize: 17,
                                            textAlign: 'center',
                                            color: "#000",

                                        }}>
                                        {'برجاء ادخال المبلغ'}
                                    </Text>
                                </View>
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
                                    value={inputval}

                                    onChangeText={(value) => {
                                        setinputval(value)
                                    }}
                                />

                           <View
                                    style={{
                                        width: '80%',
                                        // justifyContent: 'space-between',
                                        alignItems: "center",
                                        alignSelf: "center",
                                        flexDirection: "row"


                                    }}
                                >
                                    <Text
                                        style={{
                                            fontFamily: FONTS.fontFamily,
                                            // textAlign: "center",
                                            color: "#9F9FA0",
                                            fontSize: 15,

                                        }}
                                    >
                                        في حالة عدم ادخال اي قيمة تحدد السعر فيمكن استقبال اي مبلغ {"  "}




                                    </Text>


                                </View>  

                                <View
                                    style={{
                                        width: '80%',
                                        justifyContent: 'space-between',
                                        alignItems: "center",
                                        alignSelf: "center",
                                        flexDirection: "row"


                                    }}
                                >
                                    <Text
                                        style={{
                                            fontFamily: FONTS.fontFamily,
                                            // textAlign: "center",
                                            fontSize: 15,
                                            color: "#9F9FA0"

                                        }}
                                    >
                                        *استخدام الرمز لدفع اكثر من مرة


                                    </Text>

                                    <CheckBox
                                        // disabled={false}
                                        value={toggleCheckBox}
                                        onValueChange={(newValue) =>
                                            setToggleCheckBox(newValue)}
                                    />
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
                                         
                                                setmodalVisable(false)
                                                setloading(true)
                                                setTimeout(() => {
    
                                                    setloading(false)
                                                }, 1000);
                                                createqr()
                                            
                                        }}>
                                        <Text
                                            style={{
                                                fontFamily: 'Janna LT Bold',
                                                color: '#00cd7b',
                                                fontSize: 20,
                                            }}>
                                            تأكيد
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{
                                            alignItems: 'center', justifyContent: 'center'
                                        }}
                                        onPress={() => {
                                            setmodalVisable(false)
                                            props.navigation.goBack()
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

export default QrPagetoPay;
