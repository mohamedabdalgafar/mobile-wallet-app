

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
    TouchableOpacity, UIManager, LayoutAnimation,
    FlatList, Image, Dimensions, StatusBar, PanResponder, Modal, ActivityIndicator
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import QRCode from 'react-native-qrcode-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';
import { Header, IconButton } from '../../components/CartComponent';

import { COLORS, images, icons, SIZES, FONTS, constants, Icons } from '../../constants';
import axios from "axios";
import moment from 'moment'
import Icon from 'react-native-vector-icons/FontAwesome5';

const { width, height } = Dimensions.get('window');
const activeColor = 'red';
const inactiveColor = 'lightgrey';
const dotWidth = 20;
const CARD_HEIGHT = 220;
const CARD_WIDTH = SIZES.width * 0.8;
const SPACING_FOR_CARD_INSET = SIZES.width * 0.1 - 10;
const headerHeight = 100;
let scrollValue = 0;
let headerVisible = true;
let focused = false;
if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}
const history_qr = props => {
    const toggleSwitchadd = () => setIsEnabled(previousState => !previousState);

    const [stores, setstores] = React.useState([

    ])

    const [showqr, setshowqr] = React.useState(false);
    const [qrcode, setqrcode] = React.useState("");

    const [loading, setloading] = React.useState(false);

    function toggleSwitch(index) {
        let list1 = [...stores]
        if (list1[index].qr_status == 'expire') {
            list1[index].qr_status = 'valid'
        } else {
            list1[index].qr_status = 'expire'

        }
        setstores(list1)
        update_valid_qr(list1[index].qr_id)
    }

    function update_valid_qr(id) {
        let data = {
            qr_id: id,

        }

        // console.log(data)
        axios.post('https://walletapp2023.000webhostapp.com/Ewallet/set_qr_expired.php', data).then(res => {
            console.log(res.data)
            if (res.data.status == 'failed') {
                Alert.alert('E-Wallet', res.data.message)
            } else if (res.data.status == 'success') {
                let data = res.data.message
                Alert.alert('E-Wallet', data)


            } else {
                Alert.alert('E-Wallet', res.data.message)

            }

        });
    }


    useEffect(() => {
        getdata()

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }, [])

   async function getdata() {
        setloading(true)
        let userdata = await AsyncStorage.getItem("userdata")
        userdata = JSON.parse(userdata)

        let data = {
            user_id: userdata.user_id,
            type: 'receive'
        }

        console.log(data)
        axios.post('https://walletapp2023.000webhostapp.com/Ewallet/select_my_qr_codes.php', data).then(res => {
            // console.log(res.data)
            if (res.data.status == 'failed') {
                Alert.alert('E-Wallet', 'حدث خطأ ما')
            } else if (res.data.status == 'success') {
                let data = res.data.message
                for (let i = 0; i < data.length; i++) {
                    data[i].showdes = false

                }
                setstores(data)

            } else {
                Alert.alert('E-Wallet', 'حدث خطأ ما')

            }
            setloading(false)

        });
    }
    function Openedit(index) {
        let list1 = [...stores]

        if (list1[index].showdes == true) {
            list1[index].showdes = false
        } else {
            for (var i = 0; i < list1.length; i++) {
                list1[i].showdes = false
            }
            list1[index].showdes = true


        }
        setstores(list1)

        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);

    }












    function renderinvoice(item, index) {
        return (
            <>

                <Animatable.View
                    key={item}
                    animation="fadeInUp"
                    delay={index * 100}
                    useNativeDriver

                >

                    <TouchableOpacity



                        style={{

                            width: '95%',
                            borderRadius: SIZES.radius,
                            alignSelf: 'center',
                            padding: 10,



                            backgroundColor: COLORS.white,
                            marginVertical: SIZES.base,
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,

                            // elevation: 50,
                        }}
                        onPress={() => {

                            Openedit(index)
                        }}>


                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: 'space-between',
                                alignItems: "center"
                            }}
                        >

                            <Text
                                style={{
                                    fontFamily: 'Janna LT Bold', color: "#9F9FA0",

                                }}
                            >
                                كود الرمز
                            </Text>
                            <Text
                                style={{
                                    fontFamily: 'Janna LT Bold', color: "#9F9FA0",

                                }}
                            >
                                {item.qr_id}


                            </Text>
                        </View>

                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: 'space-between',
                                alignItems: "center"
                            }}
                        >

                            <Text
                                style={{
                                    fontFamily: 'Janna LT Bold', color: "#9F9FA0",

                                }}
                            >
                                التاريخ
                            </Text>
                            <Text
                                style={{
                                    fontFamily: 'Janna LT Bold', color: "#9F9FA0",

                                }}
                            >
                                {moment(item.created_date).format('LL')}

                            </Text>
                        </View>




                        <TouchableOpacity
                            onPress={() => {
                                setqrcode(item.qr_code)
                                setshowqr(true)
                            }}
                            style={{
                                justifyContent: "center"

                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: 'Janna LT Bold',
                                    color: "#9F9FA0",
                                    fontSize: 15,
                                    textDecorationLine: "underline",
                                    textAlign: "center"

                                }}
                            >
                                عرض ال QR
                            </Text>
                        </TouchableOpacity>







                        {item.showdes ? (
                            <>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: 'space-between',
                                        alignItems: "center"
                                    }}
                                >


                                    <Text
                                        style={{
                                            fontFamily: 'Janna LT Bold',
                                            color: "#9F9FA0",

                                        }}
                                    >
                                        الرمز {' '}


                                    </Text>






                                    <Text
                                        style={{
                                            fontFamily: 'Janna LT Bold', color: "#9F9FA0",

                                        }}
                                    >
                                        {item.qr_code}


                                    </Text>
                                </View>

                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: 'space-between',
                                        alignItems: "center"
                                    }}
                                >


                                    <Text
                                        style={{
                                            fontFamily: 'Janna LT Bold',
                                            color: "#9F9FA0",

                                        }}
                                    >
                                        عدد مرات الاستخدام


                                    </Text>


                                    <Text
                                        style={{
                                            fontFamily: 'Janna LT Bold', color: "#9F9FA0",

                                        }}
                                    >
                                        {item.used_count}


                                    </Text>
                                </View>

                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: 'space-between',
                                        alignItems: "center"
                                    }}
                                >

                                    <Text
                                        style={{
                                            fontFamily: 'Janna LT Bold', color: "#9F9FA0",

                                        }}
                                    >
                                        المبلغ
                                    </Text>
                                    <Text
                                        style={{
                                            fontFamily: 'Janna LT Bold', color: "#9F9FA0",

                                        }}
                                    >
                                        {item.qr_money_limit_value == "not_set" ? (
                                            "لم يتم تحديد السعر"
                                        ) : (
                                            item.qr_money_limit_value
                                        )}

                                    </Text>
                                </View>

                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: 'space-between',
                                        alignItems: "center"
                                    }}
                                >

                                    <Text
                                        style={{
                                            fontFamily: 'Janna LT Bold', color: "#9F9FA0",

                                        }}
                                    >
                                        تاريخ اخر تحديث
                                    </Text>
                                    <Text
                                        style={{
                                            fontFamily: 'Janna LT Bold', color: "#9F9FA0",

                                        }}
                                    >
                                        {moment(item.last_update_date).format('LL')}

                                    </Text>
                                </View>


                            </>
                        ) : null}

                        <View
                            style={{

                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "row"
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: 'Janna LT Bold', color: "#9F9FA0",
                                }}
                            >
                                {'مفعل'}
                            </Text>
                            <Switch
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={item.qr_status == 'valid' ? "#f5dd4b" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={() => {
                                    if (item.qr_status == 'expire') {
                                        Alert.alert("E-Wallet", "لايمكن اعادة التفعيل مرة اخري")
                                    } else {
                                        toggleSwitch(index)

                                    }
                                }}
                                value={item.qr_status == 'valid' ? true : false}
                                style={{
                                    marginHorizontal: 10
                                }}
                            />
                            <Text
                                style={{
                                    fontFamily: 'Janna LT Bold', color: "#9F9FA0",
                                }}
                            >
                                {'مغق'}
                            </Text>

                        </View>



                    </TouchableOpacity>

                </Animatable.View>






            </>
        )
    }
    const animation = useRef(new Animated.Value(1)).current;


    const onScroll = e => {
        if (focused) return;
        const y = e.nativeEvent.contentOffset.y;
        if (y > scrollValue && headerVisible && y > headerHeight / 2) {
            Animated.spring(animation, {
                toValue: 0,
                useNativeDriver: true,
                bounciness: 0,
            }).start();
            headerVisible = false;
        }
        if (y < scrollValue && !headerVisible) {
            Animated.spring(animation, {
                toValue: 1,
                useNativeDriver: true,
                bounciness: 0,
            }).start();
            headerVisible = true;
        }
        scrollValue = y;
    };
    return (
        <View
            style={{
                flex: 1,
                // backgroundColor: COLORS.white,
            }}>
            <StatusBar backgroundColor={'#009bb1'} />

            <Header
                title={'سجل ال QR'}
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
                <View style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center"
                }} >
                    <ActivityIndicator

                        size={25} />
                    <Text style={{ fontFamily: FONTS.fontFamily, fontSize: 16, color: '#000' }} >
                        جاري التحميل ...
                    </Text>
                </View>
            ) : (
                <>
                    {stores.length == 0 ? (
                        <View style={{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center"
                        }} >

                            <Text style={{ fontFamily: FONTS.fontFamily, fontSize: 16, color: '#000' }} >
                                لا يوجد حتي الان
                            </Text>
                        </View>
                    ) : (
                        <>

                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{ paddingTop: 10 }}
                                onScroll={onScroll}>
                                <FlatList
                                    data={stores}
                                    numColumns={1}
                                    renderItem={({ item, index }) => renderinvoice(item, index)} />
                            </ScrollView>
                        </>
                    )}

                </>
            )}
            <Modal
                visible={showqr}
                onRequestClose={() => {
                    setshowqr(false)
                }}
                animationType={'slide'}
            // transparent={true}
            >
                <View
                    style={{
                        flex: 1, alignItems: 'center',
                        justifyContent: 'center'
                        , backgroundColor: 'rgba(0,0,0,.6)'
                    }}>
                    <View
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: -50
                        }}
                    >



                        <QRCode
                            value={qrcode}
                            size={200}
                        // logoSize={30}
                        // logoBackgroundColor='transparent'

                        />
                        <Text
                            style={{
                                fontFamily: 'Janna LT Bold', color: "#9F9FA0",
                                marginTop: 20

                            }}
                        >
                            كود رقم {" "} {qrcode}
                        </Text>

                    </View>
                    <TouchableOpacity

                        onPress={() => {
                            setshowqr(false)
                        }}
                        style={{
                            alignItems: 'center', justifyContent: 'center',
                            backgroundColor: "#00cd7b",
                            width: '80%', marginBottom: 20,
                            padding: 6,
                            borderRadius: 10
                        }}

                    >
                        <Text
                            style={{
                                fontFamily: 'Janna LT Bold',
                                color: '#fff',
                                fontSize: 20,
                            }}>
                            حسناّ
                        </Text>
                    </TouchableOpacity>
                </View>
            </Modal >
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    markerWrap: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
    },
    searchBox: {
        position: 'absolute',
        marginTop: Platform.OS === 'ios' ? 40 : 20,
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        width: '90%',
        alignSelf: 'center',
        borderRadius: 5,
        padding: 10,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    chipsScrollView: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 90 : 80,
        paddingHorizontal: 10,
    },
    chipsIcon: {
        marginRight: 5,
    },
    marker: {
        width: 30,
        height: 30,
    },
    button: {
        alignSelf: 'center',
        marginTop: 5,
    },
    signIn: {
        width: '100%',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
    },
    scrollView: {
        position: 'absolute',
        bottom: RFValue(60),
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    card: {
        elevation: 2,
        backgroundColor: COLORS.white,
        borderRadius: 8,
        marginHorizontal: 10,
        shadowColor: '#000',
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffcardImageset: { x: 2, y: -2 },
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: 'hidden',
        marginBottom: 4,
    },
    cardImage: {
        flex: 3,
        width: '100%',
        height: '100%',
        alignSelf: 'center',
    },
    textContent: {
        flex: 2,
        padding: 10,
    }, container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        padding: 50
    },
    txt: {
        fontSize: 25,
        color: '#000'
    },
    barContainer: {
        width: '100%',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    bar: {
        height: 3,
        width: '100%',
        backgroundColor: inactiveColor,
        overflow: 'hidden',
        justifyContent: 'center'
    },
    dot: {
        height: dotWidth,
        width: dotWidth,
        borderRadius: dotWidth / 2,
        backgroundColor: activeColor,
        position: 'absolute',
    },
    activeLine: {
        height: '100%',
        width: '100%',
        backgroundColor: activeColor,
        marginLeft: '-100%'
    }
});

export default history_qr;



