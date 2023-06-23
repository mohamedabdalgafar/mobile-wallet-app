

import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput, Modal, ActivityIndicator } from 'react-native';
import { COLORS, FONTS, SIZES, icons } from '../../constants';

import { Header, IconButton } from '../../components/CartComponent';
import SMSVerifyCode from 'react-native-sms-verifycode'



const ConfirmationCode = props => {

    const [inputval, setinputval] = React.useState('');
    const [inputprice, setinputprice] = React.useState('');
    const [errphone, seterrphone] = React.useState('');
    const [errmoney, seterrmoney] = React.useState('');


    const [confirm1, setconfirm1] = React.useState(false);
    const [loadinConfirm1, setloadinConfirm1] = React.useState(false);
    const [loadinConfirm2, setloadinConfirm2] = React.useState(false);

    const [modalVisable, setmodalVisable] = React.useState(false);



    React.useEffect(() => {
        let phone = props.route.params.phone
        let money = props.route.params.money
        setinputval(phone)
        setinputprice(money)

    }, []);









    function checkdata() {

        setloadinConfirm1(true)
        setTimeout(() => {

            setloadinConfirm1(false)
            setmodalVisable(true)


        }, 1000);


    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.white,
                opacity: modalVisable ? .2 : null
            }}>
            <Header
                title={'إستكمال البيانات'}
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

                <View
                    style={{
                        margin: 10
                    }}
                >
                    <Text style={{
                        fontSize: 14,
                        fontFamily: FONTS.fontFamily,
                        color: 'gray',
                        marginTop: 2,
                        marginLeft: 10,
                    }}>
                        ستصلك رسالة بها كود التحقق
                        {'  '}
                        <Text style={[{
                            fontSize: 14,
                            fontFamily: FONTS.fontFamily,
                            color: 'gray',
                            marginTop: 2,
                            marginLeft: 10,
                        }, { color: COLORS.primary }]}>
                            +2{inputval}
                        </Text>
                    </Text>
                </View>




                <View

                    style={{ paddingHorizontal: 20, paddingVertical: 12 }}>
                    <Text
                        style={{
                            fontFamily: 'Janna LT Bold',
                            fontSize: 17,
                            color: "#000",
                            marginLeft: 10

                        }}>
                        {'ادخل الكود المكون من 6 ارقام'}
                    </Text>
                </View>


                <SMSVerifyCode
                    verifyCodeLength={6}
                    containerPaddingVertical={10}
                    containerPaddingHorizontal={50}
                    containerBackgroundColor={'#fff'}
                    onInputCompleted={() => {
                        checkdata()
                    }}
                />




                <Text style={{
                    fontSize: 14,
                    fontFamily: FONTS.fontFamily,
                    marginLeft: 10,
                    alignSelf: 'center',
                    color: 'red',
                    marginTop: 4
                }}>{errphone}</Text>

                <TouchableOpacity
                    onPress={() => {
                        checkdata()

                    }}

                    style={{
                        alignSelf: "center",
                        backgroundColor: '#00cd7b', alignItems: "center",
                        justifyContent: "center", marginTop: 30,
                        borderRadius: 10,
                        width: '60%',
                        padding: 10
                    }}>


                    {loadinConfirm1 ? (
                        <ActivityIndicator
                            size={30}
                            color={"#fff"}
                        />
                    ) : (
                        <Text style={[FONTS.h3, { color: "#000" }]}>
                            تأكيد
                        </Text>
                    )}



                </TouchableOpacity>




            </ScrollView>
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

                                    style={{
                                        paddingHorizontal: 20,
                                        paddingVertical: 12, flexDirection: "row",
                                        flexWrap: 'wrap'
                                    }}>
                                    <Text
                                        style={{
                                            fontFamily: 'Janna LT Bold',
                                            fontSize: 17,
                                            textAlign: 'center',
                                            color: "#000",

                                        }}>
                                        {'تم اضافة مبلغ '}
                                    </Text>
                                    <Text
                                        style={{
                                            fontFamily: 'Janna LT Bold',
                                            fontSize: 17,
                                            textAlign: 'center',
                                            color: "#00cd7b",

                                        }}>
                                        {inputprice}
                                    </Text>
                                    <Text
                                        style={{
                                            fontFamily: 'Janna LT Bold',
                                            fontSize: 17,
                                            textAlign: 'center',
                                            color: "#000",

                                        }}>
                                        {" ج.م الي حسابك"}
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
                                            props.navigation.navigate("MyWallet")

                                        }}>
                                        <Text
                                            style={{
                                                fontFamily: 'Janna LT Bold',
                                                color: '#00cd7b',
                                                fontSize: 20,
                                            }}>
                                            حسناّ
                                        </Text>
                                    </TouchableOpacity>

                                </View>
                            </ScrollView>

                        </View>



                    </View>


                </>

            </Modal>
        </View >
    );
};

export default ConfirmationCode;
