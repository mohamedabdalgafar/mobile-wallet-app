

import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { COLORS, FONTS, SIZES, icons } from '../../constants';

import { Header, IconButton } from '../../components/CartComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import axios from 'axios';
const MY_cards = props => {

    const [carddata, setcarddata] = React.useState({});
    const [num, setnum] = React.useState('');
    const [loading, setloading] = React.useState(false);

    const [loadingcards, setloadingcards] = React.useState(false);



    const [cards, setcards] = React.useState([]);

    React.useEffect(() => {

        getcards()


    }, []);



    async function addcard() {
        setloading(true)
        let userdata = await AsyncStorage.getItem("userdata")
        userdata = JSON.parse(userdata)
        let data = {
            cvc: carddata.values.cvc,
            expiry: carddata.values.expiry,
            number: carddata.values.number,
            owner_id: userdata.user_id

        }
        // console.log(JSON.stringify(data))
        axios.post('https://walletapp2023.000webhostapp.com/Ewallet/insert_cards.php', data).then(res => {
            console.log(res.data)
            let data = res.data.message + ""
            if (res.data.status == 'error') {
                Alert.alert('E-Wallet', +data)
            } else if (res.data.status == 'success') {
                Alert.alert('E-Wallet', "تم تسجيل البيانات بنجاح")

                setTimeout(() => {
                    props.navigation.navigate("ConfirmationCard", {
                        card_id: data
                    })
                }, 1000);



            } else {
                Alert.alert('E-Wallet', data)

            }
            setloading(false)

        });

    }


    async function getcards() {
        setloadingcards(true)
        let userdata = await AsyncStorage.getItem("userdata")
        userdata = JSON.parse(userdata)
        let data = {

            user_id: userdata.user_id

        }
        // console.log(JSON.stringify(data))
        axios.post('https://walletapp2023.000webhostapp.com/Ewallet/select_my_cards.php', data).then(res => {
            // console.log(res.data)
            let data = res.data.message
            if (res.data.status == 'error') {
                Alert.alert('E-Wallet', data)

            } else if (res.data.status == 'success') {

                setcards(data)


            } else {
                Alert.alert('E-Wallet', data)

            }
            setloadingcards(false)

        });

    }
    return (
        <View
            style={{
                flex: 1,
                // backgroundColor: COLORS.white,
            }}>
            <Header
                title={'0000000'}
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


 

               
                <Text style={{
                    color: "#9F9FA0",
                    fontSize: 18, fontFamily: FONTS.fontFamily,
                    textAlign: 'right',
                    marginRight: 20,
                    marginBottom: -10,
                }}>
                    {'My Cards'}
                </Text>
                {loadingcards ? (
                    <View
                        style={{
                            marginTop: 50
                        }}
                    >
                        <ActivityIndicator
                            size={30}
                        />
                    </View>
                ) : (
                    <>
                    {cards.length == 0 ?(
                         <View
                         style={{
                             flex: 1,
                             justifyContent: "center",
                             alignItems: "center"
                         }}
                     >
                         <Text
                             style={{
                                 textAlign: 'center',
                                //  color: COLORS.black,
                                 ...FONTS.h2,
                                 color: "#9F9FA0",
                                 marginTop:20
                             }}>
                             لم يتم اضافة كروت حتي الان
                         </Text>
                     </View>
                    ):(

                        <>
                       
                        {
                            cards.map(item => (
                                <TouchableOpacity
                                    onPress={() => {
                                        props.navigation.navigate("ConfirmationCard", {
                                            card_id: item.card_id
                                        })
                                    }}
                                    animation="fadeIn"
                                    delay={50}
                                    useNativeDriver
                                    style={{

                                        width: '90%',
                                        borderRadius: SIZES.radius,
                                        paddingLeft: SIZES.padding,
                                        paddingRight: SIZES.padding,

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
                                        justifyContent: 'space-between',
                                        alignItems: "center",
                                        alignSelf: "center",
                                        flexDirection: "row"
                                        // marginLeft:10
                                    }}
                                >
                                    <Text style={{
                                        color: "#9F9FA0",
                                        fontSize: 15, fontFamily: FONTS.fontFamily,
                                        textAlign: "center"
                                    }}>
                                        {item.card_number.slice(0, 3)}
                                        <Text style={{
                                            color: "#9F9FA0",
                                            fontSize: 15, fontFamily: FONTS.fontFamily,
                                            textAlign: "center"
                                        }}>
                                            {'************'}
                                        </Text>
                                        <Text style={{
                                            color: "#9F9FA0",
                                            fontSize: 15, fontFamily: FONTS.fontFamily,
                                            textAlign: "center"
                                        }}>
                                            {item.card_number.slice(15, 18)}

                                        </Text>
                                    </Text>

                                    <Image
                                        source={require("../../assets/images/cards.png")}
                                        style={{
                                            height: 60,
                                            width: 60
                                        }}
                                    />


                                </TouchableOpacity>
                            ))
                        }
                         </>
                        )}
                    </>

                )}



            </ScrollView>



        </View >
    );
};

export default MY_cards;
