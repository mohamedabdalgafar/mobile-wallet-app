import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native-paper';
import { COLORS, FONTS, icons, SIZES } from '../constants';
import { IconButton } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';
import { StepperInput } from './CartComponent';

const ProductionRaw = ({
  data,
  title,
  onPressWhole,
  onPressShowAll,
  onPressAddToCart,
  onPressFav,
  onPressUpdateQty,
  onPressDeleteFromCart,
}) => {
  return (
    <View
      style={{
        marginVertical: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text
            style={{
              ...FONTS.h2,
              color: COLORS.black,
            }}>
            {title}
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            // console.log(data);
            onPressShowAll();
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              ...FONTS.h5,
            }}>
            عرض الكل
          </Text>
          <Ionicons name="md-chevron-back-sharp" size={24} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => `product-${item.product_id}`}
        renderItem={({ item, index }) => (
          <>
            <TouchableOpacity
              onPress={() => {
                onPressWhole(item);
              }}
              activeOpacity={0.7}
              style={{
                ...styles.productionContainer,
              }}>
              <Image
                source={{ uri: item.product_image }}
                style={{
                  width: RFValue(120),
                  height: RFValue(120),
                  alignSelf: 'center',
                  flex: 1,
                }}
                resizeMode="contain"
              />

              <Text style={{ ...FONTS.h5, flex: 1 }}>{item.product_title}</Text>
              <Text style={{ ...FONTS.h5, flex: 1 }}>
                {item.product_description}
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                {item.product_official_price == item.product_sale_price ? (
                  <Text style={{ ...FONTS.h3, color: COLORS.black, flex: 1 }}>
                    {item.product_sale_price} ج.م
                  </Text>
                ) : (
                  <>
                    <Text style={{ ...FONTS.h3, color: COLORS.black, flex: 1 }}>
                      {item.product_sale_price} ج.م
                    </Text>
                    <Text
                      style={{
                        ...FONTS.h5,
                        flex: 1,
                        textDecorationLine: 'line-through',
                      }}>
                      {item.product_official_price} ج.م
                    </Text>
                  </>
                )}
              </View>

              {item.cart_count > 0 ? (
                <StepperInput
                  containerStyle={{
                    height: RFValue(43),
                    width: '100%',
                    backgroundColor: COLORS.lightGray2,
                    // marginTop: 30,
                  }}
                  value={item.cart_count}
                  onAdd={() => {
                    onPressUpdateQty(item, 'add');
                  }}
                  onMinus={() => {
                    if (item.cart_count > 1) {
                      onPressUpdateQty(item, 'minus');
                    } else {
                      onPressDeleteFromCart(item);
                    }
                  }}
                />
              ) : (
                <Button
                  onPress={() => {
                    onPressAddToCart(item, index);
                  }}
                  mode="contained"
                  style={{
                    elevation: 0,
                  }}
                  labelStyle={{
                    ...FONTS.h4,
                    color: COLORS.white,
                  }}
                  color={COLORS.primary}>
                  أضف للعربة
                </Button>
              )}
            </TouchableOpacity>
            {item.product_discount_percentage != '0' && (
              <View
                style={{
                  ...styles.offerDiscount,
                }}>
                <Text
                  style={{
                    ...FONTS.h5,
                    color: COLORS.white,
                  }}>
                  وفر {item.product_discount_percentage}{' '}
                  {item.product_discount_type == 'percentage' ? '%' : 'ج.م'}
                </Text>
              </View>
            )}
            <IconButton
              size={22}
              icon={item.favorite ? 'heart' : 'heart-outline'}
              color={item.favorite ? COLORS.primary : COLORS.darkGray}
              style={{
                ...styles.saveProduct,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderRadius: SIZES.radius,
                borderColor: COLORS.gray2,
                borderRadius: 100,
                padding: 4,
                backgroundColor: item.favorite ? COLORS.greenAlpha : null,
              }}
              onPress={() => {
                onPressFav(item, index);
              }}
            />
          </>
        )}
      />
    </View>
  );
};

export default ProductionRaw;

const styles = StyleSheet.create({
  productionContainer: {
    borderRadius: 8,
    overflow: 'hidden',
    padding: 10,
    marginHorizontal: RFValue(6),
    borderWidth: 0.5,
    borderColor: COLORS.lightGray1,
    width: RFValue(150),
    minHeight: RFValue(200),
  },
  offerDiscount: {
    position: 'absolute',
    top: 5,
    left: 12,
    backgroundColor: COLORS.red,
    padding: RFValue(4),
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveProduct: {
    position: 'absolute',
    top: 5,
    right: 10,

    alignItems: 'center',
    justifyContent: 'center',
  },
});
