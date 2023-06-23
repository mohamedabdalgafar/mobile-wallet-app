

import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, BackHandler, Alert, ActivityIndicator } from 'react-native';
import { COLORS, FONTS, SIZES, icons } from '../../constants';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment'
import LottieView from 'lottie-react-native';

import { Header, IconButton } from '../../components/CartComponent';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';
import numbro from 'numbro'
const history = props => {

    const handleBackPress = React.useCallback(() => {
        // do some action and return true or if you do not
        // want the user to go back, return false instead
        props.navigation.goBack()
        //    return true
    }, []);

    React.useEffect(() => {
        gethistory()
        BackHandler.addEventListener('hardwareBackPress', handleBackPress);
        return () =>

            BackHandler.removeEventListener('hardwareBackPress', handleBackPress);



    }, [handleBackPress]);



    const [data, setdata] = React.useState([

    ])
    const [loading, setloading] = React.useState(false)

    async function gethistory(data) {
        setloading(true)
        let userdata = await AsyncStorage.getItem("userdata")
        userdata = JSON.parse(userdata)
        let data_send = {
            user_id: userdata.user_id,

        }
        axios.post('https://walletapp2023.000webhostapp.com/Ewallet/select_my_transactions.php', data_send).then(res => {
            // console.log(res.data.message)
            if (res.data.status == 'success') {
                setdata(res.data.message)
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
                // backgroundColor: COLORS.white,
            }}>
            <Header
                title={'السجل'}
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
                        onPress={() => props.navigation.goBack()}
                    />
                }
                // leftComponent={<View style={{ width: 40 }} />}

                rightComponent={<View style={{ width: 40 }} />}
            />
            {loading ? (

                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <ActivityIndicator
                        size={40}
                    />
                    <Text style={{
                        fontFamily: FONTS.fontFamily, fontSize: 16, color: '#000',
                        marginTop: 20
                    }} >
                        جاري التحميل ...
                    </Text>
                </View>

            ) : (
                <>

                    {
                        data.length == 0 ? (
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                            >
                                <LottieView
                                    source={require('../../assets/lotties/empty.json')}
                                    autoPlay
                                    loop
                                    style={{ height: 250, width: '100%' }}
                                    resizeMode="contain"
                                />
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        color: COLORS.black,
                                        ...FONTS.h2,
                                    }}>
                                    لا يوجد تعاملات حتي الان
                                </Text>
                            </View>
                        ) : (
                            <ScrollView>


                                {

                                    data.map((item, index) => (

                                        <Animatable.View
                                            // animation="flipInX"
                                            key={item}
                                            animation={"fadeInUpBig"}
                                            delay={index * 100}
                                            useNativeDriver
                                        >

                                            <LinearGradient
                                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                                colors={['#fff', "#ddd"]}
                                                onPress={() => {

                                                }}
                                                style={{
                                                    width: "90%", borderRadius: 20
                                                    , alignSelf: "center",
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
                                                        justifyContent: "space-between"
                                                    }}
                                                >
                                                    <Text style={{
                                                        fontSize: 18, textAlign: "center", color: "#000",
                                                        fontFamily: FONTS.fontFamily
                                                    }}>
                                                        {item.title}

                                                    </Text>
                                                    <View
                                                        style={{
                                                            flexDirection: "row",
                                                            justifyContent: "center",
                                                            alignItems: "center"
                                                        }}
                                                    >
                                                        <Icon name={item.trans_value < 0 ? "caret-down" : 'caret-up'}
                                                            color={item.trans_value < 0 ? '#f00' : '#1FA52D'}
                                                            style={{
                                                                margin: 2
                                                            }} />
                                                        <Text style={{
                                                            fontSize: 18, textAlign: "center", color: item.trans_value < 0 ? '#f00' : '#1FA52D',
                                                            fontFamily: FONTS.fontFamily
                                                        }}>
                                                            {numbro(item.trans_value < 0 ? item.trans_value * -1 : item.trans_value).format({
                                                                thousandSeparated: true,
                                                                mantissa: 2, // number of decimals displayed
                                                            })}{' ج.م'}
                                                        </Text>

                                                    </View>

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
                                                        تاريخ العملية
                                                    </Text>
                                                    <Text
                                                        style={{
                                                            fontFamily: 'Janna LT Bold', color: "#9F9FA0",

                                                        }}
                                                    >
                                                        {moment(item.trans_date).format('LL')}

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
                                                        وقت العملية
                                                    </Text>
                                                    <Text
                                                        style={{
                                                            fontFamily: 'Janna LT Bold', color: "#9F9FA0",

                                                        }}
                                                    >
                                                        {moment(item.trans_date).format('LT')}

                                                    </Text>
                                                </View>
                                            </LinearGradient>
                                        </Animatable.View>
                                    ))}


                            </ScrollView >
                        )
                    }

                </>
            )}
        </View >
    );
};

export default history;
