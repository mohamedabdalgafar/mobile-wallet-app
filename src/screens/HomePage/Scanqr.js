

import React from 'react';
import { View, Text, Image, Modal, TouchableOpacity, ScrollView, 
    Alert, TextInput, ActivityIndicator } from 'react-native';
import { COLORS, FONTS, SIZES, icons } from '../../constants';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import Lottie from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { POST } from './../../Helpers/ApiHelper';
import { Header, IconButton } from '../../components/CartComponent';
import QRCodeScanner from 'react-native-qrcode-scanner';
import axios from 'axios';
import store from '../../Redux/store';
import { chnageAlertModal } from '../../Redux/actions';

// const [markerColor, setmarkerColor] = React.useState('#ddd');
// const Qrscan = props => {

export default class Qrscan extends React.Component {

    constructor() {
        super()
        this.state = {
            borderColor: "#ddd",
            qrdata: '0',

            inputval: "",
            loading: false,
            page_type: '',
            valuePay: false,
            money: 0,
            recipient: '',
            confirmmoney: true,
            modalVisable: false,

            load_confirm: false
        }
    }

    handleScanCheck(data) {
        this.setState({ borderColor: "#0f0", qrdata: data, modalvisable: true })

        this.checkqr(data)


    }



    async checkqr(data) {
        this.setState({ loading: true })
        let userdata = await AsyncStorage.getItem("userdata")
        userdata = JSON.parse(userdata)
        let data_send = {
            qr_code: data,
            user_id: userdata.user_id
        }
        axios.post('https://walletapp2023.000webhostapp.com/Ewallet/scan_qr.php', data_send).then(res => {
            console.log(res.data)
            if (res.data.status == 'success') {
                if (res.data.message.qr_type == 'receive') {
                    if (res.data.message.qr_money_limit_value != "not_set") {
                        this.setState({
                            recipient: res.data.message.user_full_name,
                            money: res.data.message.qr_money_limit_value,
                            inputval: res.data.message.qr_money_limit_value,
                            modalVisable: true
                        })

                    } else {

                        this.setState({ valuePay: true })

                    }

                } else if (res.data.message.qr_type == 'pay') {
                    Alert.alert("pay ", 'pay')
                }


            } else if (res.data.status == "faild") {
                let modalData = { show: true, message: res.data.message, res: 'error' };
                store.dispatch(chnageAlertModal(modalData));
            } else {
                let modalData = { show: true, message: res.data.message, res: 'error' };
                store.dispatch(chnageAlertModal(modalData));

            }
            this.setState({ loading: false })

            // setloading(false)
        });

    }

    async paygeneral(data) {
        let userdata = await AsyncStorage.getItem("userdata")
        userdata = JSON.parse(userdata)
        let data_send = {
            user_id: userdata.user_id,
            qr_code: data
        }
        axios.post('https://walletapp2023.000webhostapp.com/Ewallet/pay_money_for_custom_qr.php', data_send).then(res => {
            if (res.data.status == 'success') {
                let modalData = { show: true, message: res.data.message, res: 'succ' };
                store.dispatch(chnageAlertModal(modalData));
                setTimeout(() => {
                    this.props.navigation.goBack()
                }, 1000);
            } else {
                let modalData = { show: true, message: res.data.message, res: 'error' };
                store.dispatch(chnageAlertModal(modalData));
            }

        });


    }





    async paycustom(data) {
        this.setState({ load_confirm: true })
        let userdata = await AsyncStorage.getItem("userdata")
        userdata = JSON.parse(userdata)
        let data_send = {
            user_id: userdata.user_id,
            qr_code: data,
            money: this.state.inputval
        }
        // Alert.alert(JSON.stringify(data_send))   

        // pay_custom_money_scan
        axios.post('https://walletapp2023.000webhostapp.com/Ewallet/scan_to_pay.php', data_send).then(res => {
            // console.log(res.data)
            // console.log(data_send)


            if (res.data.status == 'success') {
                let modalData = { show: true, message: res.data.message, res: 'succ' };
                store.dispatch(chnageAlertModal(modalData));
                setTimeout(() => {
                    this.props.navigation.goBack()
                }, 1000);
            } else {
                let modalData = { show: true, message: res.data.message, res: 'error' };
                store.dispatch(chnageAlertModal(modalData));
            }

            this.setState({ load_confirm: false, modalVisable: false })


        });




    }













    render() {


        return (
            <View
                style={{
                    flex: 1,
                    // backgroundColor: COLORS.white,
                }}>
                <Header
                    title={'اسكان الباركود'}
                    containerStyle={{
                        height: 50,
                        marginHorizontal: SIZES.padding,
                        marginTop: 10,
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
                            onPress={() => this.props.navigation.goBack()}
                        />
                    }

                    rightComponent={<View style={{ width: 40 }} />}
                />
                {this.state.confirmmoney ? (
                    <ScrollView>
                        <View
                            style={{
                                flex: 1
                            }}
                        >
                            <QRCodeScanner
                                showMarker={true}
                                reactivate={this.state.valuePay}
                                markerStyle={{ borderColor: this.state.borderColor }}
                                onRead={(e) => {
                                    this.handleScanCheck(parseInt(e.data))


                                }}
                            // flashMode={RNCamera.Constants.FlashMode.torch}


                            />

                        </View>







                    </ScrollView>
                ) : (
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
                )}




                <Modal
                    visible={this.state.modalVisable}
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
                                            {' هل تريد دفع مبلغ ' + this.state.money + " ج.م من حسابك واضافتها في حساب  " + this.state.recipient}
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
                                                this.setState({ modalvisable: false })
                                                this.paycustom(this.state.qrdata)


                                            }}>
                                            {this.state.load_confirm ? (
                                                <ActivityIndicator
                                                    size={25}
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
                                                this.setState({ modalvisable: false })
                                                this.props.navigation.goBack()
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
                <Modal
                    visible={this.state.valuePay}
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
                                        value={this.state.inputval}

                                        onChangeText={(value) => {
                                            this.setState({ inputval: value })
                                        }}
                                    />

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
                                                this.setState({ valuePay: false, confirmmoney: true })

                                                this.paycustom(this.state.qrdata)


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

                                    </View>
                                </ScrollView>

                            </View>



                        </View>


                    </>

                </Modal>

                <Modal
                    visible={this.state.loading}
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

                                        style={{ paddingHorizontal: 20, paddingVertical: 12 }}>
                                        <ActivityIndicator
                                            size={40}
                                        />
                                        <Text
                                            style={{
                                                fontFamily: 'Janna LT Bold',
                                                fontSize: 17,
                                                textAlign: 'center',
                                                color: "#000",
                                                marginTop: 10

                                            }}>
                                            {" جاري الدفع ...."}
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


                                </ScrollView>

                            </View>



                        </View>


                    </>

                </Modal>

            </View>
        );
    };
}

// export default Qrscan;
