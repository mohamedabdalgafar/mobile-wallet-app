

import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS, FONTS, SIZES, icons } from '../../constants';

import { Header, IconButton } from '../../components/CartComponent';


const Massegecharge = props => {


    return (
        <View
            style={{
                flex: 1,
                // backgroundColor: COLORS.white,
            }}>
            <Header
                title={'شحن من اقرب كشك'}
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
                    fontSize: 22, textAlign: "center", color: "#000",
                    fontFamily: FONTS.fontFamily,
                    width: "95%"
                }}>
                    طريقة الدفع: الرجاء التوجه إلى أقرب فرع أمان أو مصارى أو ممكن أو سداد واسأل عن ”مدفوعات E-Wallet“ و أخبرهم بالرقم االمرجعي
                </Text>


                <Text style={{
                    fontSize: 22, textAlign: "center", color: "#00cd7b",
                    fontFamily: FONTS.fontFamily,
                    width: "95%",
                    marginTop: 20,
                    textDecorationLine: "underline"
                }}>
                    2122454
                </Text>
            </ScrollView>

        </View >
    );
};

export default Massegecharge;
