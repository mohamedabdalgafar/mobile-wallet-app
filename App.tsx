import React, { useState, useEffect } from 'react';
import { StatusBar , View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { COLORS } from './src/constants';
import { InternetConnetionLost } from './src/components';
import NetInfo from '@react-native-community/netinfo';
import { RootNavigation } from './src/navigation';
import { changeIternetConnection } from './src/Redux/actions';
import store from './src/Redux/store';

const App = () => {
  const [connected, setConnected] = useState(true);
  useEffect(() => {
    NetInfo.addEventListener(state => {
      setConnected(state.isInternetReachable);
      store.dispatch(changeIternetConnection(state.isInternetReachable));
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={COLORS.primary} />
      <Provider store={store}>
        <RootNavigation />
        {!connected && <InternetConnetionLost />}
      </Provider>
    </SafeAreaView>
    
  );
};
export default App;
