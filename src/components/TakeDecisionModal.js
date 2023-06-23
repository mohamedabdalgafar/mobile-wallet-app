import React from 'react';
import {Text, View, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS, FONTS} from '../constants';

const TakeDescisionModal = ({
  visible,
  onRequestClose,
  message,
  onYesButtonPress,
}) => {
  return (
    <Modal visible={visible} transparent onRequestClose={onRequestClose}>
      <View style={styles.conntainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={onRequestClose}
          activeOpacity={1}></TouchableOpacity>

        <View style={styles.contentModal}>
          <Text style={styles.message}>{message}</Text>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.yesButton}
              onPress={onYesButtonPress}>
              <Text style={styles.yesText}>نعم</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.yesButton,
                {
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderColor: COLORS.primary,
                },
              ]}
              onPress={onRequestClose}>
              <Text style={[styles.yesText, {color: 'black'}]}>لا</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default TakeDescisionModal;

const styles = StyleSheet.create({
  conntainer: {
    flex: 1,
    backgroundColor: 'rgba(52, 52, 52,0.4)',
  },
  contentModal: {
    width: '100%',
    position: 'absolute',
    backgroundColor: 'white',
    padding: 20,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    bottom: 0,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    marginTop: 20,
  },
  yesButton: {
    width: 100,
    height: 50,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  yesText: {
    fontFamily: FONTS.fontFamily,
    fontSize: 18,
    color: 'white',
  },

  message: {
    fontFamily: FONTS.fontFamily,
    fontSize: 18,
    color: 'black',
    marginVertical: 30,
  },
  button: {
    width: '100%',
    height: '100%',
  },
});
