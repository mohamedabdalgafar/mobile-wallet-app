
import * as React from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  BackHandler,
  Alert,
} from 'react-native';

const Main = props => {
  const [val, setval] = React.useState('');
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#ddd',
      }}>
      <TextInput
        value={val}
        onChangeText={val => {
          setval(val);
        }}
        style={{
          borderWidth: 1,
          marginTop: 50,
          width: '90%',
          alignSelf: 'center',
        }}
      />
      <TouchableOpacity
        onPress={() => {
          // Alert.alert(val);
          props.navigation.navigate("ConfirmationCard")
        }}
        style={{
          width: '50%',
          height: 40,
          backgroundColor: 'red',
          alignSelf: 'center',
          marginTop: 20,
        }}></TouchableOpacity>
    </View>
  );
};

export default Main;
