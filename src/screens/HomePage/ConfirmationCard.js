

import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput, Modal, ActivityIndicator } from 'react-native';
import { COLORS, FONTS, SIZES, icons } from '../../constants';

import { Header, IconButton } from '../../components/CartComponent';
import { color } from 'react-native-reanimated';
import { chnageAlertModal } from '../../Redux/actions';
import axios from 'axios';
import store from '../../Redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Cardbank = props => {

    const [inputval, setinputval] = React.useState('');
    const [inputprice, setinputprice] = React.useState('');

    const [confirm1, setconfirm1] = React.useState(false);
    const [loadinConfirm1, setloadinConfirm1] = React.useState(false);
    const [loadinConfirm2, setloadinConfirm2] = React.useState(false);

    const [modalVisable, setmodalVisable] = React.useState(false);
    const [loading, setloading] = React.useState(false);


   async function confirm() {
        setloadinConfirm2(true)
        let userdata = await AsyncStorage.getItem("userdata")
        userdata = JSON.parse(userdata)
        let id = props.route.params.card_id
    
        let data = {
            money: inputval,
            card_id: id,
            user_id: userdata.user_id

        }
        // console.log(data)

        // console.log(JSON.stringify(data))
        axios.post('https://walletapp2023.000webhostapp.com/Ewallet/charge_money_by_card.php', data).then(res => {
            let data = res.data.message + ""
            if (res.data.status == 'error') {
                let modalData = { show: true, message: res.data.message, res: 'error' };
                store.dispatch(chnageAlertModal(modalData));

            } else if (res.data.status == 'success') {


                let modalData = { show: true, message: res.data.message, res: 'succ' };
                store.dispatch(chnageAlertModal(modalData));
                setTimeout(() => {
                    props.navigation.navigate("MyWallet")
                }, 1500);



            } else {
                let modalData = { show: true, message: res.data.message, res: 'error' };
                store.dispatch(chnageAlertModal(modalData));


            }
            setloadinConfirm2(false)


        });

    }



    return (
        <View
            style={{
                flex: 1,
                // backgroundColor: COLORS.white,
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




                {confirm1 ? (
                    <>
                        <View

                            style={{ paddingHorizontal: 20, paddingVertical: 12 }}>
                            <Text
                                style={{
                                    fontFamily: 'Janna LT Bold',
                                    fontSize: 17,
                                    color: "#000",
                                    marginLeft: 10

                                }}>
                                {'المبلغ'}
                            </Text>
                        </View>
                        <View
                            style={{
                                width: '90%',
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
                                borderColor: "#ddd",
                                color: '#000'
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: 'Janna LT Bold',
                                    fontSize: 17,
                                    color: COLORS.bag10Bg,
                                    marginLeft: 10,
                                    textAlign: 'left',
                                    padding: 10

                                }}>
                                {inputval}
                            </Text>
                        </View>
                    </>
                ) : (
                    <>
                        <View

                            style={{ paddingHorizontal: 20, paddingVertical: 12 }}>
                            <Text
                                style={{
                                    fontFamily: 'Janna LT Bold',
                                    fontSize: 17,
                                    color: "#000",
                                    marginLeft: 10

                                }}>
                                {'أدخل المبلغ'}
                            </Text>
                        </View>
                        <TextInput
                            autoCapitalize="none"
                            placeholder=" المبلغ"
                            placeholderTextColor={"#ddd"}
                            keyboardType="number-pad"

                            style={{
                                width: '90%',
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
                                borderColor: "#ddd",
                                color: '#000'
                            }}
                            value={inputval}

                            onChangeText={(value) => {

                                setinputval(value)
                            }}
                        />
                        <TouchableOpacity
                            onPress={() => {
                                if (inputval.length != 0) {
                                    setloadinConfirm1(true)
                                    setTimeout(() => {
                                        setconfirm1(true)
                                        setloadinConfirm1(false)

                                    }, 1000);
                                }

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
                                <Text style={[FONTS.h3, { color: "#fff" }]}>
                                    تأكيد
                                </Text>
                            )}



                        </TouchableOpacity>

                    </>

                )}


                {confirm1 ? (
                    <>
                        <View

                            style={{ paddingHorizontal: 20, paddingVertical: 12 }}>
                            <Text
                                style={{
                                    fontFamily: 'Janna LT Bold',
                                    fontSize: 17,
                                    color: "#000",
                                    marginLeft: 10

                                }}>
                                {'أدخل الكود المرسل من البنك'}
                            </Text>
                        </View>
                        <TextInput
                            autoCapitalize="none"
                            placeholder=" الكود"
                            placeholderTextColor={"#ddd"}
                            keyboardType="number-pad"

                            style={{
                                width: '90%',
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
                                borderColor: "#ddd",
                                color: '#000'
                            }}
                            value={inputprice}

                            onChangeText={(value) => {

                                setinputprice(value)
                            }}
                        />
                        <TouchableOpacity
                            onPress={() => {
                                if (inputprice.length != 0) {
                                     
                                    confirm()
                                }

                            }}

                            style={{
                                alignSelf: "center",
                                backgroundColor: '#00cd7b', alignItems: "center",
                                justifyContent: "center", marginTop: 30,
                                borderRadius: 10,
                                width: '60%',
                                padding: 10
                            }}>
                            {loadinConfirm2 ? (
                                <ActivityIndicator
                                    size={30}
                                    color={"#fff"}
                                />
                            ) : (
                                <Text style={[FONTS.h3, { color: "#fff" }]}>
                                    إتمام العملية

                                </Text>
                            )}




                        </TouchableOpacity>
                    </>

                ) : null}







            </ScrollView>
            {/* <Modal
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

                                    style={{ paddingHorizontal: 20, paddingVertical: 12 }}>
                                    <Text
                                        style={{
                                            fontFamily: 'Janna LT Bold',
                                            fontSize: 17,
                                            textAlign: 'center',
                                            color: "#000",

                                        }}>
                                        {'تم اضافة المبلغ الي حسابك'}
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

            </Modal> */}

        </View >
    );
};

export default Cardbank;
