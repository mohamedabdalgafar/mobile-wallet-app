import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import { COLORS, images, FONTS } from '../constants';
// import ImagePicker from 'react-native-image-crop-picker';

const { width, height } = Dimensions.get('window');
const CustomImageSelection = props => {
  // const chooseFromGallery = () => {
  //   ImagePicker.openPicker({
  //     width: 300,
  //     height: 600,
  //     cropping: true,
  //     includeBase64: true,
  //   }).then(image => {
  //     props.onImageSelected(image);
  //   });
  // };
  // const openCamera = () => {
  //   ImagePicker.openCamera({
  //     width: 300,
  //     height: 600,
  //     cropping: true,
  //     includeBase64: true,
  //   }).then(image => {
  //     props.onImageSelected(image);
  //   });
  // };

  return (
    <Modal visible={props.showModal} onRequestClose={props.onClose} transparent>
      <View style={styles.modalConatiner}>
        <TouchableWithoutFeedback
          onPress={props.onClose}
          style={styles.withoutFeedBack}>
          <View style={{ flex: 1 }}></View>
        </TouchableWithoutFeedback>

        <View style={styles.modalBtnsContainer}>
          <TouchableOpacity
            style={styles.chooseModalBtn}
            onPress={() => chooseFromGallery()}>
            <Text style={styles.chooseText}>الاستوديو</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.chooseModalBtn}
            onPress={() => openCamera()}>
            <Text style={styles.chooseText}>الكاميرا</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomImageSelection;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    // height: 200,
    alignSelf: 'center',
    // alignItems: "center",
    // justifyContent: "center",
    borderStyle: 'dashed',
    borderWidth: 1,
    borderRadius: 1,
    borderColor: COLORS.secondary,
    marginVertical: 10,
  },
  addImage: {
    width: 100,
    height: 100,
  },
  chooseBtn: {
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: COLORS.secondaryOne,
  },
  modalConatiner: {
    flex: 1,
    backgroundColor: 'rgba(52, 52, 52,0.4)',
  },
  modalBtnsContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 10,
    // height:200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: 'white',
  },
  chooseModalBtn: {
    width: '95%',
    alignSelf: 'center',
    height: 50,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginVertical: 10,
  },
  emptyImageView: {
    width: '95%',
    height: 200,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
  },
  withoutFeedBack: {
    width: width,
    height: height,
  },
  chooseText: {
    ...FONTS.h3,
    fontFamily: FONTS.fontFamily,
    fontWeight: '500',
    color: 'white',
  },
});
