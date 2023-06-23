

import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput, Modal, ActivityIndicator } from 'react-native';
import { COLORS, FONTS, SIZES, icons } from '../../constants';

import { Header, IconButton } from '../../components/CartComponent';
import { color } from 'react-native-reanimated';
import { Checkbox } from 'react-native-paper';


const Ewallet = props => {

    const [inputval, setinputval] = React.useState('');
    const [inputprice, setinputprice] = React.useState('');
    const [errphone, seterrphone] = React.useState('');
    const [errmoney, seterrmoney] = React.useState('');


    const [confirm1, setconfirm1] = React.useState(false);
    const [loadinConfirm1, setloadinConfirm1] = React.useState(false);
    const [loadinConfirm2, setloadinConfirm2] = React.useState(false);

    const [modalVisable, setmodalVisable] = React.useState(false);

    function checkdata() {
        let count = 0
        if (inputval.length == 0 || inputval * 0 != 0 || inputval.length < 11) {
            seterrphone('ادخل رقم الهاتف بشكل صحيح')
            count++
        } else {
            seterrphone('')

        }
        if (inputprice.length == 0 || inputprice * 0 != 0) {
            seterrmoney('ادخل المبلغ بشكل صحيح')
            count++
        } else {
            seterrmoney('')

        }
        if (count == 0) {
            setloadinConfirm1(true)
            setTimeout(() => {
                setinputval('')
                setinputprice('')
                setloadinConfirm1(false)
                props.navigation.navigate("ConfirmationCode", {
                    phone: inputval,
                    money: inputprice
                })

            }, 1000);
        }

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
                            {'أدخل رقم الهاتف'}
                        </Text>
                    </View>
                    <TextInput
                        autoCapitalize="none"
                        placeholder=" رقم الهاتف"
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

                    <Text style={{
                        fontSize: 14,
                        fontFamily: FONTS.fontFamily,
                        marginLeft: 10,
                        alignSelf: 'center',
                        color: 'red',
                        marginTop: 4
                    }}>{errphone}</Text>

                    <View

                        style={{ paddingHorizontal: 20, paddingVertical: 12 }}>
                        <Text
                            style={{
                                fontFamily: 'Janna LT Bold',
                                fontSize: 17,
                                color: "#000",
                                marginLeft: 10

                            }}>
                            {'أدخل المبلغ المطلوب اضافته'}
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
                        value={inputprice}

                        onChangeText={(value) => {

                            setinputprice(value)
                        }}
                    />
                    <Text style={{
                        fontSize: 14,
                        fontFamily: FONTS.fontFamily,
                        marginLeft: 10,
                        alignSelf: 'center',
                        color: 'red',
                        marginTop: 4
                    }}>{errmoney}</Text>
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

                </>









            </ScrollView>

        </View >
    );
};

export default Ewallet;
